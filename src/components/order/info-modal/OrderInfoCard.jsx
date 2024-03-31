import React, {useEffect, useState} from 'react';
import style from "./info-modal.module.scss";
import {numberToFinanceFormat} from "../../../utils";
import cn from "classnames";
import OrdersTransportType from "../../orders/transport-type/OrdersTransportType";
import styleAvailableCard from "../../orders/available/card/OrdersAvailableCard.module.scss";
import WeightIcon from "../../shared/icons/WeightIcon";
import FullScreenIcon from "../../shared/icons/FullScreenIcon";
import {useSelector} from "react-redux";
import {Order} from "../../../services";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const OrderInfoCard = ({ order, displayBtnBooking = true, displayBtnBookingEdit = false }) => {
  const {user} = useSelector(state => state);
  const [cargoInfo, setCargoInfo] = useState(null)

  useEffect(() => {
    if (order) getCargo()
  }, [order])

  const getCargo = () => {
    Order.getCargo(order.cargoId)
      .then(res => res.data)
      .then((response) => {
        setCargoInfo(response)
        console.log("get cargo", response);
      })
      .catch((error) => {
        console.log("get cargo error:", error);
        toast.error("Произошла ошибка, попробуйте позже!")
        toast.error(error)
      });
  }

  return (
    <div className={style.card}>
      <div>
        <div className={style.card__mb22}>
          <div className={style.card__orderNumber}>
            №{order.number}
          </div>
          <div className={style.card__titleBig}>
            {numberToFinanceFormat(user.type === "Expeditor" ? order.netPrice : order.price)}₸
          </div>
          <div className={style.card__summary}>
            {Math.round((user.type === "Expeditor" ? order.netPrice : order.price) / order.distance)}₸/км
          </div>
        </div>
        <div className={cn(style.card__types, style.card__mb22)}>
          {
            cargoInfo && (
              <>
                <OrdersTransportType isTagView type={cargoInfo.vehicleType} text={cargoInfo.vehicleTypeName} style={{height: "40px"}} />
                <span className={styleAvailableCard.tag}>
                  <WeightIcon />
                  {cargoInfo.weight} т
                </span>
                <span className={styleAvailableCard.tag}>
                  <FullScreenIcon />
                  {cargoInfo.volume} м<sup>3</sup>
                </span>
                <span className={styleAvailableCard.tag}>
                  {cargoInfo.categoryName}
                </span>
              </>
            )
          }
        </div>
        <div
          className={cn({
            [style.card__mb22]: displayBtnBooking || displayBtnBookingEdit
          })}
        >
          <div className={cn(style.card__summary, style.card__mb10)}>
            Способ оплаты: <b>Любой</b>
          </div>
          <div className={cn(style.card__summary, style.card__mb10)}>
            Дистанция: <b>{order.distance} км</b>
          </div>
          <div className={style.card__summary}>
            Тип погрузки: <b>{cargoInfo?.loadingTypeName || "Не указан"}</b>
          </div>
        </div>
        { displayBtnBooking && (
          <div>
            <Link to={"/orders/booking/" + order.id} className={style.button}>
              Назначить водителя
            </Link>
          </div>
        )}
        { displayBtnBookingEdit && (
          <div>
            <Link to={"/orders/booking/" + order.id} className={style.button}>
              Редактировать
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInfoCard;