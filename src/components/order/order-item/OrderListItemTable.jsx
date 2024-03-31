import React, {useEffect, useState} from 'react';
import {Order} from '../../../services';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {numberToFinanceFormat} from '../../../utils/index';
import Badge from "react-bootstrap/Badge";
import {useSelector} from 'react-redux';
import moment from "moment";

const OrderListItemTable = ({item, selectOrder, copyOrder, editeOrder, cancalOrder, selectMenu}) => {
    item.statusSave = item.status
    // item.status = item.status == 'published' || item.status == 'booked' || item.status == 'confirmed' ? 'awaiting-loading' : item.status;
    item.status = item.status == 'published' || item.status == 'booked' || item.status == 'confirmed' ?  'awaiting-loading' : item.status == 'waitingforcompletion' ? 'inprocess' : item.status
    // item.status = item.status == 'waitingforcompletion' ? 'completed' : item.status;

    const DRIVER_STATUSES_DATA = {
        "moderation": {title: 'На модерации', url: '/icons/Group 79.svg'},
        "awaitingpayment": {title: 'Ожидает оплаты', url: '/icons/Group 80.svg'},
        "awaiting-loading": {title: 'Ожидает погрузки', url: '/icons/Group 77.svg'},
        "inprocess": {title: 'В пути', url: '/icons/Group 82.svg'},
        "completed": {title: 'Завершен', url: '/icons/Group 83.svg'},
        "canceled": {title: 'Отменён', url: '/icons/Group 84.png'},
    }

    const [selectList, setSelectList] = useState([]);
    const handleOpen = (value) => {
        item.isOpenMenu = value
        selectMenu(item)
    };

    const {user} = useSelector(state => state);
    const handleSelect = (type, item) => {
        const list = JSON.parse(localStorage.getItem('selectList')) ? JSON.parse(localStorage.getItem('selectList')) : []
        if (type === 2) {
            list.push(item.number)
            localStorage.setItem('selectList', JSON.stringify(list))
            setSelectList(list)
        } else if (type === 3) {
            let selectItem = []
            list.map(m => {
                if (m != item.number) {
                    selectItem.push(m)
                }
            })
            localStorage.setItem('selectList', JSON.stringify(selectItem))
            setSelectList(selectItem)
        }
    };

    const handleSelectAll = (type, item) => {

    }

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('selectList')) ? JSON.parse(localStorage.getItem('selectList')) : []
        setSelectList(list && list.length ? list : [])
    }, [item]);


    return (
        <div style={{
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            color: '#10121C',
            borderRadius: '10px',
            padding: '0px 16px'
        }}>
            <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '100%'}}>
                <div style={{
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '6%',
                    fontSize: '13px',
                    fontWeight: '700'
                }}
                     onClick={() => selectOrder(item)}>
                    {item.number}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '10%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{item.cityFromName}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '10%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{item.cityToName}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '12%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{item.createdAtStr}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '12%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{moment(item.shippingDate).format("DD.MM.YYYY")}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '12%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{moment(item.unloadingDate).format("DD.MM.YYYY")}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '12%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>{item.vehicleTypeName}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                     onClick={() => selectOrder(item)}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '700'
                    }}>{numberToFinanceFormat(user.type === "Expeditor" ? item.netPrice : item.price)} ₸
                    </div>
                </div>
                <div style={{width: '18%'}}>
                    <div style={{fontSize: '14px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{padding: '5px 0', width: '80%'}} onClick={() => selectOrder(item)}>
                            <div>{DRIVER_STATUSES_DATA[item.status]?.title}</div>
                            <div style={{marginTop: '-8px'}}><img src={DRIVER_STATUSES_DATA[item.status]?.url} alt=""/>
                            </div>
                        </div>
                        <div style={{padding: '10px 5px', display: 'flex', width: '20%', justifyContent: 'flex-end'}}>
                            {
                                selectList.includes(item.number) ?
                                    <div onClick={() => selectOrder(item)}>
                                        <img src="/icons/Star 1.svg" height="13px"/>
                                    </div>
                                    : null
                            }

                            <div className="dropdown">
                                <div style={{cursor: 'pointer'}}>
                                    {
                                        item.isOpenMenu ?
                                            <div onClick={() => handleOpen(false)}><img src="/icons/Vector (3).svg"
                                                                                        height="13px"/></div>
                                            :
                                            <div onClick={() => handleOpen(true)}><img src="/icons/Vector (4).svg"
                                                                                       height="13px"/></div>
                                    }
                                </div>
                                {item.isOpenMenu  ? 
                                    user.type === "Expeditor" 
                                    ? 
                                    <ul className="menu">
                                    {
                                        selectList.includes(item.number) ?
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(3, item), handleOpen(false)
                                            }}>Убрать из избранного</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(2, item), handleOpen(false)
                                            }}>В избранные</li>
                                    }
                                    </ul>
                                    : 
                                    <ul className="menu">
                                    <li className="menu-item" onClick={() => {
                                        copyOrder(item), handleOpen(false)
                                    }}>Сделать копию
                                    </li>
                                    {
                                        selectList.includes(item.number) ?
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(3, item), handleOpen(false)
                                            }}>Убрать из избранного</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(2, item), handleOpen(false)
                                            }}>В избранные</li>
                                    }
                                    {
                                        item.status == 'completed' ?
                                            <li className="menu-item" style={{opacity: '0.2'}}>Редактировать</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                editeOrder(item), handleOpen(false)
                                            }}>Редактировать</li>
                                    }
                                    {
                                        item.statusSave == 'moderation' || item.statusSave == 'awaitingpayment'  || item.statusSave == 'published'?
                                        <li className="menu-item" onClick={() => {
                                            cancalOrder(item), handleOpen(false)
                                        }}>Отозвать заявку</li>
                                            :
                                        <li className="menu-item" style={{opacity: '0.2'}}>Отозвать заявку</li>
                                    }
                                    </ul>
                                : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderListItemTable;
