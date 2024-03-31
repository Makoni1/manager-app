import React, {useEffect, useState} from 'react';
import style from "./booking.module.scss"
import OrdersHeader from "../../../components/orders/title";
import styleInfoModal from "../../../components/order/info-modal/info-modal.module.scss"
import {Link, useNavigate, useParams} from "react-router-dom";
import Loading from "../../../components/invoices/Loading";
import OrderInfoCard from "../../../components/order/info-modal/OrderInfoCard";
import cn from "classnames";
import OrderBookingCard from "./OrderBookingCard";
import SupportModal from "../../../components/shared/SupportModal";
import {requestErrorDisplay} from '../../../utils';
import {Order} from '../../../services';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

export const QUERY_NAME_AFTER_BOOKING_ORDER = "isAfterBooking"

const OrderBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id
  const { user } = useSelector(state => state);
  const [isBooked, setBookedState] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isSupportModal, setSupportModal] = useState(false);
  const [getOrder, setOrder] = useState(null)
  const [drivers, setDrivers] = useState([])

  const fetchOrderDataById = async () => {
    setLoading(true)
    try {
      const {data} = await Order.getOrderForExpeditor({orderId})
      setBookedState(data.isBooked)
      setOrder(data.order)
      if (data.vehicle && data.driver) {
        getBookData({
          driver: data.driver,
          transport: data.vehicle,
        })
      }
    } catch (e) {
      requestErrorDisplay(e)
    } finally {
      setLoading(false)
    }
  }

  const sendOrderBooking = async () => {
    try {
      const driver = drivers[0] || {}
      const body = {
        // orderId: getOrder.id,
        driverId: driver.id,
        vehicleId: driver.vehicle?.id,
      }
      await Order.sendOrderBook(getOrder.id, body)
      navigate(`/orders/in-progress?${QUERY_NAME_AFTER_BOOKING_ORDER}=true`)
    } catch (e) {
      requestErrorDisplay(e)
    }
  }

  const onDeleteDriver = (driver) => {
    if (isBooked) {
      onCancelBooking()
    } else {
      setDrivers(drivers.filter(d => d.id !== driver.id))
    }
  }

  const onCancelBooking = () => {
    if (isBooked) {
      Order.cancelOrderBook(getOrder.id)
        .then(res => res.data)
        .then(() => {
          navigate('/orders/available')
          toast.info("Бронь отменен.")
        })
        .catch(e => {
          requestErrorDisplay(e)
        })
    } else {
      navigate('/orders/available')
    }
  }

  const getBookData = ({ driver, transport }) => {
    setDrivers([
      // ...drivers, // TODO вернуть, когда доделаем бронирование одинаковых заказов
      {
        ...driver,
        vehicle: transport
      }
    ])
  }

  useEffect(() => {
    fetchOrderDataById()
  }, [orderId])

  if (isLoading || !getOrder) {
    return <Loading inBlock />
  }

  return (
    <div className={style.wrapper}>
      <OrdersHeader title={"Бронирование заказа"} />
      <div className="row">
        <div className="col-4">
          {/*<div className={styleInfoModal.card}>*/}
          {/*  <div>*/}
          {/*    <span style={{marginBottom: '6px', display: "block"}}>Доступно</span>*/}
          {/*    <p className={styleInfoModal.card__titleBigVery}>*/}
          {/*      1*/}
          {/*      <span className={styleInfoModal.card__titleBigVery_count}> / 1</span>*/}
          {/*    </p>*/}
          {/*    <span className={styleInfoModal.card__summary}>одинаковых заказов</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <OrderInfoCard order={getOrder} displayBtnBooking={false} />
          <div className={styleInfoModal.card__mb22}>
            <button
              type={"button"}
              className={cn(styleInfoModal.button, {
                [styleInfoModal.button_disabled]: !drivers.length || isBooked })
              }
              onClick={sendOrderBooking}
            >
              Забронировать заказ
            </button>
            <button
              type={"button"}
              className={cn(styleInfoModal.button, styleInfoModal.button_white)}
              style={{ marginTop: "8px"}}
              onClick={onCancelBooking}
            >
              Отменить бронирование
            </button>
          </div>
          <div className={styleInfoModal.footer}>
            <span onClick={() => setSupportModal(true)}>
                Поддержка
            </span>
            <span onClick={() => setSupportModal(true)}>
                Сообщить об ошибке
            </span>
          </div>
        </div>
        <div className="col-8">
          { drivers.map((driver, index) =>
            <OrderBookingCard
              key={"driver-id-" + driver.id}
              index={index}
              driver={driver}
              userId={user?.id}
              orderId={orderId}
              onDelete={onDeleteDriver}
              isBooked={isBooked}
              getDataSubmit={getBookData}
            />
          )}
          <OrderBookingCard
            key={"driver-create"}
            isHide={drivers.length}
            index={drivers.length}
            userId={user?.id}
            orderId={orderId}
            isBooked={isBooked}
            getDataSubmit={getBookData}
          />
        </div>
        { isSupportModal && <SupportModal onClose={() => setSupportModal(false)} display={isSupportModal} displayHeader={false} /> }
      </div>
    </div>
  );
};

export default OrderBookingPage;