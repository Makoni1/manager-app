import React, {useEffect, useState} from 'react';
import style from "./OrdersAvailableCard.module.scss"
import cn from "classnames";
import {numberToFinanceFormat, requestErrorDisplay} from "../../../../utils";
import moment from "moment";
import {Order} from "../../../../services";
import {useSelector} from "react-redux";
import DeleteIcon from "../../../shared/icons/DeleteIcon";
import EditIcon from "../../../shared/icons/EditIcon";
import {Link} from "react-router-dom";
import Loading from "../../../invoices/Loading";
import Badge from '../../../shared/Badge';
import Driver from '../../driver';
import {ORDER_STATUSES_DATA} from "../../../../mock";

const OrdersAvailableCard = ({
                                order,
                                setOrderActive,
                                isDraftItem = false,
                                isOrdersInProgressPage = false,
                                isLoading,
                                onDelete
}) => {
  const { user } = useSelector(state => state);
  const [cargoInfo, setCargoInfo] = useState(null)
  const [countryFromName, setCountryFromName] = useState(order.countryFromName)
  const [countryToName, setCountryToName] = useState(order.countryToName)
  const [cityFromName, setCityFromName] = useState(order.cityFromName)
  const [cityToName, setCityToName] = useState(order.cityToName)


  useEffect(() => {
    getCargo()

    if (isDraftItem) {
      getDraftValues()
    }
  }, [])

  const onRemove = e => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) onDelete()
  }

  const getDraftValues = () => {
    const requests = [
      {
        item: order.countryIdFrom,
        itemKey: "name",
        setEvent: setCountryFromName,
        apiName: "getCountryById",
      },
      {
        item: order.countryIdTo,
        itemKey: "name",
        setEvent: setCountryToName,
        apiName: "getCountryById"
      },
      {
        item: order.cityIdFrom,
        itemKey: "name",
        setEvent: setCityFromName,
        apiName: "getCityById"
      },
      {
        item: order.cityIdTo,
        itemKey: "name",
        setEvent: setCityToName,
        apiName: "getCityById"
      }
    ]
    requests.forEach(req => {
      if (req.item) {
        Order[req.apiName](req.item)
          .then(res => res.data)
          .then((data) => {
            req.setEvent(data[req.itemKey])
          })
          .catch((error) => {
            console.log(`get [${req.apiName}] error:`, error);
            requestErrorDisplay(error, "Произошла ошибка, попробуйте позже")
          });
      }
    })
  }

  const getCargo = () => {
    if (isDraftItem && !order.cargoId) {
      return
    }
    Order.getCargo(order.cargoId)
      .then(res => res.data)
      .then((response) => {
        setCargoInfo(response)
        console.log("get cargo", response);
      })
      .catch((error) => {
        console.log("get cargo error:", error);
        requestErrorDisplay(error, "Произошла ошибка, попробуйте позже")
      });
  }
  const handleClick = () => {
    setOrderActive(order)
  }

  const setDefaultText = (val, placeholder) => {
    if (isDraftItem && !val) {
      return placeholder
    }
    return val
  }

  const formatDateTime = inputDate => {
    const date = moment(inputDate);
    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    if (date.isSame(today, 'day')) {
      return `Сегодня в ${date.format('HH:mm')}`;
    }
    if (date.isSame(yesterday, 'day')) {
      return `Вчера в ${date.format('HH:mm')}`;
    }
    return date.format('MMMM DD, YYYY');
  }

  return (
    <>
      <div
        className={cn(style.wrapper, {
          [style.wrapper_draft]: isDraftItem,
          [style.wrapper_withLoading]: isLoading
        })}
        onClick={handleClick}
      >

        <div
          className={cn(style.item, style.width_200, {
            [style.row2]: !isDraftItem && !isOrdersInProgressPage,
            [style.width_90]: isOrdersInProgressPage,
          })}
        >
          {
            isDraftItem
              ? (
                <>
                  <div className={cn(style.actions, style.mr16)}>
                    <Link to={`/orders/draft/${order.id}/edit`} className={style.button}>
                      <EditIcon fill={"#C3C5CA"} />
                    </Link>
                    <button type={"button"} className={style.button} onClick={onRemove}>
                      <DeleteIcon fill={"#C3C5CA"} />
                    </button>
                  </div>
                  <span className={cn(style.tag, style.tag__small)}>Черновик</span>
                </>
              )
              : (
                <>
                  <span className={style.textBold}>№{order.number}</span>
                  <span className={cn(style.textGray, { [style.hide]: isOrdersInProgressPage })}>
                    { formatDateTime(order.createdAt) }
                  </span>
                </>
              )
          }
        </div>
        {
          isOrdersInProgressPage && (
            <div className={cn(style.item, style.width_250)}>
              <Badge type={"blue"} text={ORDER_STATUSES_DATA[order.status]?.title || 'Неизвестный статус'} />
            </div>
          )
        }
        <div className={cn(style.item, style.row2, {
          [style.item_address]: !isDraftItem
        })}>
          <div className={style.address}>
            <img src={'/icons/sender.svg'} alt="icon" />
            <span className={style.textBold}>
              {setDefaultText(cityFromName, "Город погрузки не указан")}, {countryFromName}
            </span>
            <span className={style.textGray}>
              { order.shippingDate ? moment(order.shippingDate).format("DD MMMM"): "Дата погрузки не указан" }
            </span>
          </div>
          <div className={style.address}>
            <img src={'/icons/location-color.svg'} alt="icon" />
            <span className={style.textBold}>
              {setDefaultText(cityToName, "Город выгрузки не указан")}, {countryToName}
            </span>
            <span className={style.textGray}>
            { order.unloadingDate ? moment(order.unloadingDate).format("DD MMMM") : "Дата выгрузки не указан" }
          </span>
          </div>
        </div>

        <div className={cn(style.item, style.distance, style.width_100, { [style.row2]: false } )}>
          <span>{numberToFinanceFormat(order.distance)} км</span>
          { false && <span>4 остановки</span>}
        </div>

        <div
          className={cn(style.item, {
            [style.types]: !isOrdersInProgressPage,
            [style.hide]: isOrdersInProgressPage,
          })}
        >
          {
            (cargoInfo || isDraftItem) && (
              <>
                {/*<OrdersTransportType isTagView draft={isDraftItem} type={isDraftItem ? order.vehicleType : cargoInfo?.vehicleType} text={cargoInfo?.vehicleTypeName} />*/}
                {/*<span className={style.tag}>*/}
                {/*  <WeightIcon />*/}
                {/*  {cargoInfo?.weight || order?.weight} { !(cargoInfo?.weight || order?.weight) && isDraftItem ? "Не указан" : "т" }*/}
                {/*</span>*/}
                {/*<span className={style.tag}>*/}
                {/*  <FullScreenIcon />*/}
                {/*  {cargoInfo?.volume || order?.volume}  { !(cargoInfo?.volume || order?.volume) && isDraftItem ? "Не указан" : (<>м<sup>3</sup></>) }*/}
                {/*</span>*/}
                {/*{*/}
                {/*  cargoInfo?.categoryName && (*/}
                {/*    <span className={style.tag}>*/}
                {/*      {cargoInfo?.categoryName}*/}
                {/*    </span>*/}
                {/*  )*/}
                {/*}*/}
              </>
            )
          }
        </div>
        {
          isOrdersInProgressPage && (
            <>
              <div
                className={cn(style.item)}
              >
                <Driver.DriverTransport
                  item={{
                    carModel: order.carModel,
                    carNumber: order.carNumber,
                    vehicleTypeName: cargoInfo?.vehicleTypeName,
                    loadingTypeName: cargoInfo?.loadingTypeName,
                  }}
                  displayStatus={false}
                  withoutBgAndPadding
                />
              </div>
              <div
                className={cn(style.item)}
              >
                <Driver.DriverCard
                  item={{
                    id: order.driverId,
                    surname: order.driverSurname,
                    name: order.driverName,
                    patronymic: order.driverPatronymic,
                    phoneNumber: order.driverPhoneNumber,
                  }}
                  displayStatus={false}
                  withoutBgAndPadding
                />
              </div>
            </>
          )
        }
        {
          !isDraftItem && (
          <div
            className={cn(style.item, style.row2, style.contentRight, style.width_150)}
          >
            <span className={style.textBold}>
              {numberToFinanceFormat(user.type === "Expeditor" ? order.netPrice : order.price)}₸
            </span>
            <span className={style.textGray}>
              {Math.round((user.type === "Expeditor" ? order.netPrice : order.price) / order.distance)}₸/км
            </span>
          </div>
          )
        }
        { isLoading && (
          <div className={style.loading}>
            <Loading inBlock marginBottom={0} />
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersAvailableCard;