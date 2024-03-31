import React, {useEffect, useState} from 'react';
import {Order} from '../../services';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {numberToFinanceFormat} from '../../utils/index';
import moment from 'moment';

const AccountListItem = ({item}) => {

    // const INVOICE_STATUSES_DATA = {
    //     'awaitingpayment': {title: 'Не оплачен', color: '#f0be39', url: '/icons/Group 79.svg'},
    //     "paid": {title: 'Оплачен', color: '#5cb85c', url: '/icons/Group 83.svg'},
    // }
    item.orderStatus = item.orderStatus == 'published' || item.orderStatus == 'booked' || item.orderStatus == 'confirmed' ? 'awaiting-loading' : item.orderStatus == 'waitingforcompletion' ? 'inprocess' : item.orderStatus;


    const DRIVER_STATUSES_DATA = {
        "moderation": {title: 'На модерации', url: '/icons/Group 79.svg'},
        "awaitingpayment": {title: 'Ожидает оплаты', url: '/icons/Group 80.svg'},
        "awaiting-loading": {title: 'Ожидает погрузки', url: '/icons/Group 77.svg'},
        "inprocess": {title: 'В пути', url: '/icons/Group 82.svg'},
        "completed": {title: 'Завершен', url: '/icons/Group 83.svg'},
        "canceled": {title: 'Отменён', url: '/icons/Group 84.png'},
    }

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
                    width: '10%',
                    fontSize: '13px',
                    fontWeight: '700'
                }}>
                    <div style={{
                        background: '#F2F3F4',
                        borderRadius: '10px',
                        width: '90px',
                        height: '30px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0px 10px'
                    }}>
                        {item?.orderNumber | '-'}
                    </div>
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                >{item.createdAt ? moment(item.createdAt).format("DD.MM.YYYY") : ''}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                >{item.cityFromName}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                >{item.cityToName}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                >{item.shippingDate ? moment(item.shippingDate).format("DD.MM.YYYY") : '-'}
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
                >{item.unloadingDate ? moment(item.unloadingDate).format("DD.MM.YYYY") : '-'}
                </div>
                <div style={{width: '15%'}}>
                    <div style={{fontSize: '14px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{padding: '5px 0', width: '80%'}}>
                            <div>{DRIVER_STATUSES_DATA[item.orderStatus]?.title}</div>
                            <div style={{marginTop: '-8px'}}><img src={DRIVER_STATUSES_DATA[item.orderStatus]?.url} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '700'
                    }}>
                        {item && item.price ? numberToFinanceFormat(item.price) + ' ₸' : <Skeleton width="100px"/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountListItem;
