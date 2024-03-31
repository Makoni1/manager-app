import React, {useEffect, useState} from 'react';
import WrapperContent from '../../../components/shared/WrapperContent';
import OrdersHeader from '../../../components/orders/title';
import OrdersContent from '../../../components/orders/content';
import SectionItem from '../../../components/orders/section-item';
import OrdersSectionItemTitle from '../../../components/orders/section-item/components/OrdersSectionItemTitle';
import OrdersSectionItemTable from '../../../components/orders/section-item/components/OrdersSectionItemTable';
import OrderSectionItemTableMobile
  from '../../../components/orders/section-item/components/OrderSectionItemTableMobile';
import DefaultPagination from '../../../components/shared/DefaultPagination';
import {useSelector} from 'react-redux';
import {Order} from '../../../services';

const ITEMS_LIMIT = 10

const OrdersHistoryPage = () => {
  const { user } = useSelector(state => state);
  const isExpeditor = user?.type === "Expeditor"
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState( 0);
  const [sorting, setSorting] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [currentPage, changePage] = useState(1)


  useEffect(() => {
    fetchData()
  }, [currentPage, sorting])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = {
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

  const getOwnOrders = async (params = {}) =>
    Order.getOwnHistoryOrders(params)
      .then(res => res.data)
      .catch(e => e)

  return (
    <WrapperContent>
      {/* Header */}
      <OrdersHeader displayCreateBtn title="История заказов" />
      {/* All content */}
      <OrdersContent>
        {/* First Section */}
        <SectionItem>
          <OrdersSectionItemTitle title={"Всего"} count={ordersTotal} />
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
    </WrapperContent>
  );
};

export default OrdersHistoryPage;