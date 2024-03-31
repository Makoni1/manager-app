import React, {useEffect, useMemo, useState} from 'react';
import style from "./booking.module.scss"
import CarIcon from "../../../components/shared/icons/CarIcon";
import {Link, useSearchParams} from "react-router-dom";
import EditIcon from "../../../components/shared/icons/EditIcon";
import DeleteIcon from "../../../components/shared/icons/DeleteIcon";
import cn from "classnames";
import {Driver as DriverApi} from "../../../services"
import Driver from "../../../components/orders/driver";
import {requestErrorDisplay} from '../../../utils';
import Loading from '../../../components/invoices/Loading';
import {useNavigate, useLocation} from "react-router-dom";
import {toast} from 'react-toastify';

const OrderBookingCard = ({
                            driver,
                            index,
                            orderId,
                            isHide = false,
                            isBooked = false,
                            userId,
                            getDataSubmit,
                            onDelete,
                          }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [transports, setTransports] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [activeDriver, setActiveDriver] = useState(null);
  const [activeTransport, setActiveTransport] = useState(null);
  // const [isDisplayDriverList, setDisplayDriverList] = useState(searchParams.get("open") ==="1");
  const [isDisplayDriverList, setDisplayDriverList] = useState(!driver ? true : false);

  const withOutDriver = !driver

  useEffect(() => {
    if (isDisplayDriverList) {
      getItems();
    }
  }, [isDisplayDriverList]);

  const toggleOpenDriverList = () => {
    if (!withOutDriver) {
      return
    }
    setDisplayDriverList(true)
    getItems()
  }

  const handleGetDriver = (e) => {
    if (!e.isFree) {
      return
    }
    if (activeDriver?.id === e.id) {
      setActiveDriver(null)
    } else {
      setActiveDriver(e)
    }
  }
  const handleGetTransport = (e) => {
    if (!e.isFree) {
      return
    }
    if (activeTransport?.id === e.id) {
      setActiveTransport(null)
    } else {
      setActiveTransport(e)
    }
  }

  const handleSubmit = () => {
    if (!activeDriver || !activeTransport) {
      return
    }

    getDataSubmit({
      driver: activeDriver,
      transport: activeTransport,
    })
      .then(response => {
        setDisplayDriverList(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }

  const onDeleteDriver = () => {
    if (onDelete) {
      onDelete(driver)
    }
  }
  const onEditDriver = () => {
    if (isBooked) {
      toast.info("Функционал в разработке.")
      return
    }
    setActiveDriver(driver)
    setActiveTransport(driver.vehicle)
    setDisplayDriverList(true)
    getItems()
  }

  const getItems = async () => {
    setLoading(true)
    await DriverApi.getDriversListByExpeditor(userId)
      .then(res => res.data)
      .then(data => {

        setDrivers(data || [])
      })
      .catch(e => {
        requestErrorDisplay(e)
      })

    await DriverApi.getVehicleByExpeditor(userId)
      .then(res => res.data)
      .then(data => {
        setTransports(data || [])
      })
      .catch(e => {
        requestErrorDisplay(e)
      })
    setLoading(false)
  }

  return (
    <div className={cn(style.card, {[style.hide]: isHide})}>
      <div className={cn(style.card__number, {[style.hide]: isDisplayDriverList})}>
        {index + 1}
        <div className={style.card_icon}>
          <CarIcon fill={"#C3C5CA"}/>
        </div>
      </div>
      <div
        className={cn(style.card__content, {
          [style.card__content_isCreate]: withOutDriver,
          [style.hide]: isDisplayDriverList
        })}
        onClick={toggleOpenDriverList}
      >
        {
          driver
            ? (
              <>
                <div>{driver.vehicle.carModel} {driver.vehicle.carNumber}</div>
                <div>{driver.vehicle.vehicleTypeName}</div>
                <div> {driver.name} {driver.surname}</div>
                <div>+{driver.phoneNumber}</div>
              </>
            )
            : (
              <div>Назначить транспорт</div>
            )
        }
      </div>
      <div className={cn(style.card__actions, {
        [style.card__actions_hide]: withOutDriver,
        [style.hide]: isDisplayDriverList
      })}>
        <button
          type={"button"}
          onClick={onEditDriver}
        >
          <EditIcon fill={"#C3C5CA"}/>
        </button>
        <button
          type={"button"}
          onClick={onDeleteDriver}
        >
          <DeleteIcon/>
        </button>
      </div>
      <div className={cn(style.w100, {[style.hide]: !isDisplayDriverList})}>
        {isLoading && <Loading inBlock/>}
        <div
          className={cn(style.card__content, style.drivers, {[style.hide]: isLoading})}
        >
          <div className={style.drivers__title}>Выбрать транспорт</div>
          <div className={style.drivers__items}>
            {transports.map(t => <Driver.DriverTransport
              key={t.id}
              item={t}
              isActive={activeTransport?.id === t.id}
              onClick={() => handleGetTransport(t)}
            />)}
            <Driver.DriverTransport
              isCreate
              onClick={() => navigate(`/cars/create?redirectUrl=${location.pathname}`)}
            />
          </div>
          <hr/>
          <div className={style.drivers__title}>Выбрать водителя</div>
          <div className={style.drivers__items}>
            {drivers.map(d => <Driver.DriverCard
              key={d.id}
              item={d}
              isActive={activeDriver?.id === d.id}
              onClick={() => handleGetDriver(d)}
            />)}
            <Driver.DriverCard
              isCreate
              onClick={() => navigate(`/drivers/create?redirectUrl=${location.pathname}`)}
            />
          </div>
        </div>
        <div className={cn(style.drivers__actions, {[style.hide]: !isLoading})}>
          <button
            type={"button"}
            onClick={() => setDisplayDriverList(false)}
          >
            Назад
          </button>
          <button
            type={"button"}
            disabled={!activeDriver || !activeTransport}
            className={cn({
              [style.drivers__brandColor]: activeDriver && activeTransport
            })}
            onClick={handleSubmit}
          >
            Назначить
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderBookingCard;