import React, {useEffect, useMemo, useState} from 'react';
import cn from "classnames";
import style from "../common.module.scss"
import BalanceSectionItemTableStatus from "./BalanceSectionItemTableStatus";
import Loading from "../../../invoices/Loading";
import {numberToFinanceFormat} from "../../../../utils";
import moment from "moment/moment";

const BalanceSectionItemTable = ({ isLoading = false, items = [], isExpeditor = false, sortColumn = null, changeSortColumn }) => {
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
                key: "price",
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
                name: "Время создания заявки",
                isSortable: true,
                key: "createdAt",
            },
            {
                name: "Время завершения",
                isSortable: true,
                key: "updatedAt",
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
                { items.map(item => (
                    <tr key={'table-sell-' + item.number}>
                        <td>{item.number}</td>
                        <td>{numberToFinanceFormat(item.price || 0)} ₸</td>
                        <td>
                            г. {item.addressFrom}
                            <span className={style.table_col_summary}>
                                {item.shippingDate ? moment(item.shippingDate).format("DD.MM.YYYY") : '-'}

                            </span>
                        </td>
                        <td>
                            г. {item.addressTo}
                            <span className={style.table_col_summary}>
                              {item.unloadingDate ? moment(item.unloadingDate).format("DD.MM.YYYY") : '-'}
                            </span>
                        </td>
                        <td>
                            {item.createdAt ? `${moment(item.createdAt).format("DD.MM.YYYY")} ${moment(item.createdAt).format("HH:mm")}` : ''}
                        </td>
                        <td>
                            {item.updatedAt ? `${moment(item.updatedAt).format("DD.MM.YYYY")} ${moment(item.updatedAt).format("HH:mm")}` : ''}
                        </td>
                        <td>
                            <div className={style.table_col_summary}>
                                <BalanceSectionItemTableStatus status={item.status} />
                            </div>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
            { isLoading
                ? <Loading inBlock />
                : !items.length
                    ? (
                        <div className="text-center mb-4">
                            По данной категории у вас пока нет заказов
                        </div>
                    )
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
export default BalanceSectionItemTable;