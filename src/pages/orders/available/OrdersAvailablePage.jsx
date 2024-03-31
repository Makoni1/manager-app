import React, {useEffect, useState} from 'react';
import WrapperOrders from "../../../components/shared/WrapperContent";
import OrdersHeader from "../../../components/orders/title";
import OrdersContent from "../../../components/orders/content";
import OrdersAvailableCard from "../../../components/orders/available/card";
import style from "./OrdersAvailable.module.scss"
import DefaultPagination from "../../../components/shared/DefaultPagination";
import OrdersAvailableFilters from "../../../components/orders/available/OrdersAvailableFilters";
import {Order} from "../../../services";
import moment from "moment/moment";
import Loading from "../../../components/invoices/Loading";
import OrderInfoModal from "../../../components/order/info-modal";
import {useSearchParams} from "react-router-dom";
import {QUERY_NAME_AFTER_BOOKING_ORDER} from "../booking/OrderBookingPage";
import ModalConfirm from "../../../components/shared/ModalWindow/Confirm";
import EmptyContent from '../../../components/shared/emptyContent';

const ITEMS_LIMIT = 10

const OrdersAvailablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [orderActive, setOrderActive] = useState(null);
  const [isLoading, setLoading] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersTotal, setOrdersTotal] = useState( 0);

  // FILTERS
  const [countryFrom, setCountryFrom] = useState();
  const [cityFrom, setCityFrom] = useState();
  const [shippingDate, setShippingDate] = useState();
  const [countryTo, setCountryTo] = useState();
  const [cityTo, setCityTo] = useState();
  const [cargoCategory, setCargoCategory] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [minWeight, setMinWeight] = useState();
  const [maxWeight, setMaxWeight] = useState();

  const getOrders = () => {
    setLoading(true)
    Order.getAllOrderList(
      "published",
      countryFrom ? countryFrom.id : '',
      cityFrom ? cityFrom.id : '',
      shippingDate ? moment(shippingDate).format("dd.mm.yyyy") : '',
      countryTo ? countryTo.id : '',
      cityTo ? cityTo.id : '',
      cargoCategory ? cargoCategory : '',
      vehicleType ? vehicleType : '',
      minWeight ? minWeight : 0,
      maxWeight ? maxWeight : 0,
      currentPage,
      ITEMS_LIMIT
    )
      .then(res => res.data)
      .then((response) => {
        console.log('Orders responce', response);
        setOrders(response.rows);
        setOrdersTotal(response.total);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getOrders();
  }, [currentPage]);

  return (
    <WrapperOrders>
      {/* Header */}
      <OrdersHeader displayCreateBtn title="Поиск заказов" />

      {/* TODO */}
      {/*<OrdersAvailableFilters />*/}

      <div className={style.itemsSort}>
        <span>Найдено заказов: {orders.length}</span>
        {/* TODO */}
        {/*<div className={style.dropdown}>*/}
        {/*  <div className={style.dropdown_selected}>*/}
        {/*    <span>Сначала дорогие</span>*/}
        {/*    <ArrowDownIcon />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>

      <OrdersContent>
        <div className={style.content}>
          { isLoading
            ? <Loading inBlock />
            : !orders.length && !isLoading
              ? <EmptyContent />
              : (
                <div className={style.content_scroll}>
                  { orders.map(order => <OrdersAvailableCard
                      key={order.id}
                      order={order}
                      setOrderActive={setOrderActive}
                    />
                  )}
                </div>
              )
          }


        </div>
        <DefaultPagination
          currentPage={currentPage}
          limit={ITEMS_LIMIT}
          total={ordersTotal}
          changePage={setCurrentPage}
        />

        { orderActive && <OrderInfoModal
          orderId={orderActive?.id}
          onClose={() => setOrderActive(null)}
        />}
        { searchParams.get(QUERY_NAME_AFTER_BOOKING_ORDER) === "true" && <ModalConfirm
          onClose={() => setSearchParams({ [QUERY_NAME_AFTER_BOOKING_ORDER]: 0 })}
          title={"Заказ забронирован"}
          summary={"Мы рассмотрим вашу заявку, после чего вы увидите точный адрес и время погрузки. Обычно это занимает не более 10 минут"}
        />
        }
      </OrdersContent>
    </WrapperOrders>
  );
};

export default OrdersAvailablePage;