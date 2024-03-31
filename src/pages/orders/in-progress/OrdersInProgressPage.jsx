  import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Order} from '../../../services';
import {requestErrorDisplay} from '../../../utils';
import WrapperContent from '../../../components/shared/WrapperContent';
import OrdersHeader from '../../../components/orders/title';
import style from './index.module.scss';
import InputSearch from '../../../components/shared/forms/input-search';
import OrdersContent from '../../../components/orders/content';
import Loading from '../../../components/invoices/Loading';
import OrdersAvailableCard from '../../../components/orders/available/card';
import DeleteIcon from '../../../components/shared/icons/DeleteIcon';
import DefaultPagination from '../../../components/shared/DefaultPagination';
import {QUERY_NAME_AFTER_BOOKING_ORDER} from '../booking/OrderBookingPage';
import ModalConfirm from '../../../components/shared/ModalWindow/Confirm';
import {useSearchParams} from 'react-router-dom';
import OrderInfoModal from '../../../components/order/info-modal';
import EmptyContent from '../../../components/shared/emptyContent';

const ITEMS_LIMIT = 10

const OrdersInProgressPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {user} = useSelector(state => state);
  const [orders, setOrders] = useState([]);
  const [orderActive, setOrderActive] = useState(null);
  const [searchText, setSearchText] = useState(null)
  const [isLoading, setLoading] = useState(false)
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersTotal, setOrdersTotal] = useState( 0);

  const getOrders = () => {
    setLoading(true)
    Order.getActiveOrdersByExpeditor(user.id, {
      page: currentPage,
      limit: ITEMS_LIMIT,
      search: searchText
    })
      .then(res => res.data)
      .then((data) => {
        setOrders(data.rows);
        setOrdersTotal(data.total);
      })
      .catch(error => {
        requestErrorDisplay(error)
      })
      .finally(() => setLoading(false))
  }
  const onFindOrder = text => {
    setSearchText(text)
  }
  useEffect(() => {
    if (user?.id) getOrders();
  }, [user, currentPage, searchText]);
  return (
    <WrapperContent>
      {/* Header */}
      <OrdersHeader displayCreateBtn title="Заказы в работе" />
      {/* Search */}
      <div className={style.search}>
        <InputSearch onGetText={onFindOrder} placeholder={"Поиск"} />
      </div>

      {/* Items */}
      <OrdersContent>
        <div className={style.content}>
          { isLoading
            ? <Loading inBlock />
            : orders.length
              ? (
                <div className={style.content_scroll}>
                  { orders.map(order => <OrdersAvailableCard
                      key={order.id}
                      order={order}
                      isOrdersInProgressPage
                      setOrderActive={setOrderActive}
                    />
                  )}
                </div>
                )
              : <EmptyContent />
          }
        </div>
        <div className={style.footer}>
          {/* Need todo */}
          <button className={style.button_deleteAll} type="reset">
            <DeleteIcon />
            <span>Удалить все</span>
          </button>

          <DefaultPagination
            currentPage={currentPage}
            limit={ITEMS_LIMIT}
            total={ordersTotal}
            changePage={setCurrentPage}
          />
        </div>
      </OrdersContent>
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
    </WrapperContent>
  );
};

export default OrdersInProgressPage;