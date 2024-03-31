import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Order} from "../../../services";
import OrdersWrapper from "../../../components/shared/WrapperContent";
import OrdersHeader from "../../../components/orders/title";
import OrdersTab from "../../../components/orders/tabs";
import OrdersContent from "../../../components/orders/content";
import SectionItem from "../../../components/orders/section-item";
import OrdersSectionItemTitle from "../../../components/orders/section-item/components/OrdersSectionItemTitle";
import OrdersSectionItemTable from "../../../components/orders/section-item/components/OrdersSectionItemTable";
import DefaultPagination from "../../../components/shared/DefaultPagination";
import Loading from "../../../components/invoices/Loading";
import OrderSectionItemTableMobile from "../../../components/orders/section-item/components/OrderSectionItemTableMobile";

const ITEMS_LIMIT = 10

const ListsPage = () => {
  const { user } = useSelector(state => state);
  const isExpeditor = user?.type === "Expeditor"
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState( 0);
  const [statusActive, setStatus] = useState(null)
  const [sorting, setSorting] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [currentPage, changePage] = useState(1)

  useEffect(() => {
    if (statusActive) fetchData()
  }, [statusActive, currentPage, sorting])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = {
        status: !statusActive || statusActive.status === 'all' ? '' : statusActive.status,
        page: currentPage,
        limit: ITEMS_LIMIT
      }
      if (sorting) {
          for (const sortingKey in sorting) {
            params["sort"] = sortingKey + "," + sorting[sortingKey]
          }
      } else {
        params["sort"] = "createdAt,desc"
      }

      const data = await getOwnOrders(params)
      setOrders(data.rows || [])
      setOrdersTotal(data.total)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // const getCompanyOrders = async (params = {}) =>
  //   Order.getCompanyOrders(user.id, params)
  //     .then(res => res.data)
  //     .catch(e => e)

  const getOwnOrders = async (params = {}) =>
    Order.getOwnActiveOrders(params)
      .then(res => res.data)
      .catch(e => e)

  return (
    <OrdersWrapper>
      {/* Header */}
      <OrdersHeader displayCreateBtn title="Мои заказы" />

      {/* Tabs */}
      <OrdersTab setStatus={setStatus} />
      { !statusActive && <Loading inBlock />}

      {/* All content */}
      { statusActive && (
        <>
          <OrdersContent>
            {/* First Section */}
            <SectionItem>
              <OrdersSectionItemTitle title={statusActive.statusName} count={statusActive.count} />
              {/* TODO filters */}
              {/*<OrdersSectionItemFilter />*/}
              <OrdersSectionItemTable
                sortColumn={sorting}
                items={orders || []}
                isLoading={isLoading}
                isExpeditor={isExpeditor}
                changeSortColumn={setSorting}
              />
              <OrderSectionItemTableMobile
                sortColumn={sorting}
                items={orders || []}
                isLoading={isLoading}
                isExpeditor={isExpeditor}
              />
              { orders && orders.length ? <DefaultPagination total={ordersTotal} currentPage={currentPage} limit={ITEMS_LIMIT} changePage={changePage} /> : null }
            </SectionItem>
          </OrdersContent>
        </>
      )}
    </OrdersWrapper>
  );
};

export default ListsPage;