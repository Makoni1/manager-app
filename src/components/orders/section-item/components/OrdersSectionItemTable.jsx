import React, {useMemo} from 'react';
import cn from "classnames";
import style from "../common.module.scss"
import OrdersSectionItemTableStatusLine from "./OrdersSectionItemTableStatusLine";
import {numberToFinanceFormat} from "../../../../utils";
import Loading from "../../../invoices/Loading";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru'
import EmptyContent from '../../../shared/emptyContent';


moment.locale("ru")

const OrdersSectionItemTable = ({
  isLoading = false,
  items = [],
  isExpeditor = false,
  sortColumn = null,
  changeSortColumn
}) => {
  const navigate = useNavigate();
  const tableHead = useMemo(() => {
    return [
      {
        name: "Номер заказа",
        isSortable: true,
        key: "number"
      },
      {
        name: "Стоимость",
        isSortable: true,
        key: isExpeditor ? "netPrice" : "price",
      },
      {
        name: "Погрузка",
        isSortable: true,
        key: "addressFrom",
      },
      {
        name: "Выгрузка",
        isSortable: true,
        key: "addressTo",
      },
      {
        name: "Водитель",
        isSortable: true,
        key: "driver",
      },
      {
        name: "Тип транспорта",
        isSortable: false,
      },
      {
        name: "Статус",
        isSortable: false,
      }
    ]
  }, [isExpeditor])

  const onSortColumn = (keyField) => {
    if (!sortColumn) {
      changeSortColumn({ [keyField]: 'asc' })
    } else if (sortColumn[keyField] === 'asc') {
      changeSortColumn({[keyField]: 'desc' })
    } else {
      changeSortColumn(null)
    }
  }

  return (
    <div className={cn(style.table_wrapper, 'table-responsive')}>
      <table className="table">
        <thead>
          <tr>
            { tableHead.map((item, idx) => (
              <th scope="col" key={'head-' + idx}>
                <div className={cn({[style.table_col_sort_wrapper]: item.isSortable})}>
                  {item.name}
                  {item.isSortable && (
                    <span
                      className={style.table_col_sort}
                      onClick={() => onSortColumn(item.key)}
                    >
                      {iconSortUp(sortColumn && sortColumn[item.key])}{iconSortDown(sortColumn && sortColumn[item.key])}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { items.map((item, idx) => (
            <tr key={item.number + idx} onClick={() => navigate('/order/' + item.id)} className="cursor-pointer">
              <td>{item.number}</td>
              <td>{numberToFinanceFormat(isExpeditor ? item.netPrice : item.price)} ₸</td>
              <td>
                {item.countryFromName}, г. {item.cityFromName}
                <span className={style.table_col_summary}>{moment.utc(item.shippingDate).format("DD MMMM YYYY HH:mm")}</span>
              </td>
              <td>
                {item.countryToName}, г. {item.cityToName}
                <span className={style.table_col_summary}>{moment.utc(item.unloadingDate).format("DD MMMM YYYY HH:mm")}</span>
              </td>
              <td>
                {item.carNumber || '-'}
                <span className={style.table_col_summary}>{item.driverSurname} {item.driverName}</span>
              </td>
              <td>
                <button className={style.table_col_button} type="button">
                  {item.vehicleTypeName}
                </button>
              </td>
              <td>
                <div className={style.table_col_summary}>
                  <OrdersSectionItemTableStatusLine status={item.clientStatus} />
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      { isLoading
        ? <Loading inBlock />
        : !items.length
          ? <EmptyContent />
          : null
      }
    </div>
  );
};

const iconSortUp = (val = null) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="4"
    viewBox="0 0 9 4"
    opacity={val === 'desc' ? '1' : val ?  '0' : ''}
    fill={val ? "#C5115E" : '#909195'}
  >
    <path d="M4.5 0L8.39711 3.75H0.602886L4.5 0Z" />
  </svg>
)
const iconSortDown = (val = null) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="4"
    viewBox="0 0 9 4"
    opacity={val === 'asc' ? '1' : val ?  '0' : ''}
    fill={val ? "#C5115E" : '#909195'}
  >
    <path d="M4.5 4L8.39711 0.25H0.602886L4.5 4Z" />
  </svg>
)
export default OrdersSectionItemTable;