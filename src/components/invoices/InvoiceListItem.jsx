import React, { useEffect, useState } from 'react';
import { Order } from '../../services';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { numberToFinanceFormat } from '../../utils/index';
import moment from 'moment';
import { INVOICE_STATUSES_DATA } from '../../mock/index';

const InvoiceListItem = ({item, selectInvoice}) => {

    const [order, setOrder] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [cityTo, setCityTo] = useState();

    useEffect(() => {
        if(item) {
            Order.getOrderById(item.orderId).then((response) => {
                console.log(response.data);
                if(response.status == 200) setOrder(response.data);
            }).catch(error => { console.log(error); });
        }
    }, [item]);

    useEffect(() => {
        if(order) {
            Order.getCityById(order.cityIdFrom).then((response) => {
                if(response.status == 200) { setCityFrom(response.data.name); } else { setCityFrom(''); } 
            }).catch(error => { console.log(error); });

            Order.getCityById(order.cityIdTo).then((response) => {
                if(response.status == 200) { setCityTo(response.data.name); } else { setCityTo(''); } 
            }).catch(error => { console.log(error); });
        }
    }, [order])

    return (
        <div onClick={() => selectInvoice(item)} style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '12px 16px' }}>
            <div className='row'>
                {/* <div className='col-1'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>№ счета</div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}>{order ? order.number : <Skeleton width="30px" />}</div>
                </div> */}
                <div className='col-1'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>№ счета</div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}>{item.internalNumber}</div>
                </div>
                <div className='col-1'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>ID счета</div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}>{item.number}</div>
                </div>
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата создания</div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}>{moment(item.createdAt).format('DD.MM.YYYY')}</div>
                </div>
                <div className='col-4'>
                    {
                        order ? <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Детали заказа ID{order.number}</div> : <div><Skeleton width={80} /></div>
                    }
                    
                    {
                        cityFrom && cityTo && order ?
                        <div style={{ fontSize: '15px', marginTop: '4px' }}>{cityFrom} - {cityTo} ({order.distance} км)</div>
                        :
                        <div style={{ fontSize: '15px', marginTop: '4px' }}><Skeleton width="200px" /></div>
                    }
                </div>    
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Сумма к оплате</div>
                    <div style={{ fontSize: '15px', marginTop: '4px' }}>{order ? numberToFinanceFormat(order.price) + 'тг' : <Skeleton width="100px" />}</div>
                </div>
                <div className='col-2'>
                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Статус</div>
                    <div style={{ display: 'inline-block', color: '#ffffff', fontSize: '11px', fontWeight: '500', backgroundColor: `${INVOICE_STATUSES_DATA[item.status].color}`, padding: '2px 8px', borderRadius: '6px', marginTop: '4px', textAlign: 'center' }}>{INVOICE_STATUSES_DATA[item.status].title}</div>
                </div>
            </div>
        </div>
        
    );
}

export default InvoiceListItem;