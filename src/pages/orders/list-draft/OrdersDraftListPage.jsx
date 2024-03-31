import React, {useEffect, useState} from 'react';
import WrapperOrders from "../../../components/shared/WrapperContent";
import OrdersHeader from "../../../components/orders/title";
import InputSearch from "../../../components/shared/forms/input-search";
import OrdersAvailableCard from "../../../components/orders/available/card";
import {Order} from "../../../services";
import style from "./order-draft-list.module.scss";
import Loading from "../../../components/invoices/Loading";
import DefaultPagination from "../../../components/shared/DefaultPagination";
import OrdersContent from "../../../components/orders/content";
import {requestErrorDisplay} from "../../../utils";
import DeleteIcon from "../../../components/shared/icons/DeleteIcon";
import {useNavigate} from 'react-router-dom';
import EmptyContent from '../../../components/shared/emptyContent';

const ITEMS_LIMIT = 10

const OrdersDraftListPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [loadingId, setLoadingId] = useState(null)
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersTotal, setOrdersTotal] = useState( 0);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  const getOrders = () => {
    setLoading(true)
    Order.getDraftOrders( { page: currentPage, limit: ITEMS_LIMIT, searchText: searchText } )
      .then(res => res.data)
      .then((response) => {
        setOrders(response.rows);
        setOrdersTotal(response.total);
      })
      .catch(error => {
        requestErrorDisplay(error)
      })
      .finally(() => setLoading(false))
  }

  const deleteOrderById = (orderId) => {
    setLoadingId(orderId)
    Order.deleteDraftOrderById(orderId)
      .then(() => {
        setOrders(orders.filter(o => o.id !== orderId))
      })
      .catch(e => {
        requestErrorDisplay(e)
      })
      .finally(() => {
        setLoadingId(null)
      })
  }

  const deleteAllDraft = () => {
    setLoading(true)
    Order.deleteDraftOrders()
      .then(res => res.data)
      .then(() => {
        setOrders([]);
        setOrdersTotal(0);
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
    getOrders();
  }, [currentPage, searchText]);
  return (
    <WrapperOrders>
      {/* Header */}
      <OrdersHeader displayCreateBtn title="Черновики" />

      {/* Search */}
      <div className={style.search}>
        <InputSearch onGetText={onFindOrder} placeholder={"Поиск по городу"} />
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
                    isDraftItem
                    isLoading={order.id === loadingId}
                    // isLoading={true}
                    onDelete={() => deleteOrderById(order.id)}
                    setOrderActive={() => navigate(`/orders/draft/${order.id}/edit`)}
                  />
                )}
              </div>
              )
              : <EmptyContent />
          }


        </div>
        <div className={style.footer}>
          <button className={style.button_deleteAll} type="button" disabled={!orders.length} onClick={deleteAllDraft}>
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
    </WrapperOrders>
  );
};

export default OrdersDraftListPage;