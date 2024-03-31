import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import WrapperBalance from "../../../components/balance/wrapper";
import BalanceContent from "../../../components/balance/content";
import BalanceBillContent from "../../../components/balance/bill/BalanceBillContent";
import SectionItem from "../../../components/orders/section-item";
import DefaultPagination from "../../../components/shared/DefaultPagination";
import BalanceSectionItemTitle from "../../../components/balance/section-item/components/BalanceSectionItemTitle";
import {Invoice} from "../../../services";
import BalanceSectionItemTable from "../../../components/balance/section-item/components/BalanceSectionItemTable";
import BalanceSectionItemTableMobile from "../../../components/balance/section-item/components/BalanceSectionItemTableMobile";
import OrdersHeader from "../../../components/orders/title";


const ITEMS_LIMIT = 3
const BalanceLists = ({}) => {
    const { user } = useSelector(state => state);
    const [sorting, setSorting] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [currentPage, changePage] = useState(1)

    const [accounts, setAccounts] = useState([{}]);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        if (user && user.id) {
            fetchData()
        }
    }, [user, currentPage, sorting]);

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
            }

            const data = await getInvoicesWithPagination(params); // Вызов функции и получение данных
            setAccounts(data.rows); // Установка данных в состояние accounts
            setTotalPages(data.total);

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const getInvoicesWithPagination = async(params = {}) =>
        Invoice.getInvoicesWithPagination(user.id, params)
            .then(res => res.data)
            .catch(e => e)


 return (

  <WrapperBalance>
      <OrdersHeader displayCreateBtn title="Баланс" />
      <BalanceBillContent />
      <BalanceContent>
        <SectionItem>
            <BalanceSectionItemTitle title='История выплат' count={totalPages}/>
            {/*<BalanceSectionItemFilter />*/}
            <BalanceSectionItemTable
                sortColumn={sorting}
                items={Array.isArray(accounts) ? accounts : []}
                isLoading={isLoading}
                changeSortColumn={setSorting}
            />
            <BalanceSectionItemTableMobile
              sortColumn={sorting}
              items={Array.isArray(accounts) ? accounts : []}
              isLoading={isLoading}
              changeSortColumn={setSorting}
            />
            { accounts.length ? <DefaultPagination total={totalPages} currentPage={currentPage} limit={ITEMS_LIMIT} changePage={changePage} /> : null }
        </SectionItem>
      </BalanceContent>
  </WrapperBalance>
 );
};

export default BalanceLists;