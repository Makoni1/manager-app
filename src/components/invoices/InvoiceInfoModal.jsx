import React, { useEffect, useState } from 'react';
import { Order } from '../../services';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { numberToFinanceFormat } from '../../utils/index';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { INVOICE_STATUSES_DATA } from '../../mock/index';

const InvoiceInfoModal = ({item, onClose}) => {

    const { user } = useSelector(state => state);

    console.log('user', user);

    const [order, setOrder] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [cityTo, setCityTo] = useState();

    console.log('INVOICE ITEM --->', item);

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
        <div className='modal-overlay'>
            <div style={{ maxWidth: '600px', backgroundColor: '#ffffff', margin: '24px auto', fontSize: '14px', borderRadius: '24px', padding: '20px 24px 24px' }}>
                {/* <div style={{ borderBottom: '2px solid #000000', paddingBottom: '8px' }}>
                    <div style={{ fontFamily: 'Gerbera-Bold', fontSize: '20px' }}>Счет на оплату № 45 от 29.09.2022</div>
                </div> */}
                <div style={{ padding: '0 0 14px', borderBottom: '2px solid #000000', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '18px', fontFamily: 'Gerbera-Bold', backgroundColor: '#ffffff', }}>Счет на оплату № {item.internalNumber} от {moment(item.createdAt).format('DD.MM.YYYY')}</div>
                    <div onClick={onClose} style={{ padding: '4px', cursor: 'pointer', opacity: '0.5' }}>
                        <img src="/icons/close.svg" height="14px" />
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Статус</div>
                    <div style={{ display: 'inline-block', color: '#ffffff', fontSize: '13px', fontFamily: 'Gerbera-Medium', backgroundColor: `${INVOICE_STATUSES_DATA[item.status].color}`, padding: '2px 8px', borderRadius: '6px', marginTop: '4px', textAlign: 'center' }}>{INVOICE_STATUSES_DATA[item.status].title}</div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Поставщик</div>
                    <div>ТОО LAGOM Group / БИН 201140021812</div>
                </div>
                <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Покупатель</div>
                    {
                        user ? <div>{user.name} / БИН {user.businessIdentificationNumber}</div> : <div><Skeleton width={150} /></div>
                    }
                </div>

                <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Договор</div>
                    {
                        order ?
                        <div>Договор - Заказ ID{order.number}</div> : <div><Skeleton width={150} /></div>
                    }
                </div>

                <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Наименование</div>
                    <div>Транспортные услугии</div>
                </div>

                {/* <div style={{ display: 'flex', marginTop: '12px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Количество</div>
                    <div>1 услуга</div>
                </div>

                <div style={{ display: 'flex', marginTop: '12px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Цена</div>
                    <div>700 000,00 тг.</div>
                </div> */}

                <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Сумма</div>
                    {
                        order ?
                        <div>{numberToFinanceFormat(order.price)} тг.</div> : <div><Skeleton width={150} /></div>
                    }
                </div>

                <div style={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <div style={{ width: '120px', marginRight: '16px', color: '#A3ACB6' }}>Детали заказа</div>
                    {
                        order && cityFrom && cityTo ?
                        <div>{cityFrom} - {cityTo} ({numberToFinanceFormat(order.distance)} км)</div> : <div><Skeleton width={150} /></div>
                    }
                    
                </div>
                
                <div style={{ backgroundColor: '#f0f4f7', marginTop: '24px', borderRadius: '16px', padding: '12px 16px 0' }}>
                    <div className="row">
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Бенефициар</div>
                            <div style={{ marginTop: '2px' }}>ТОО LAGOM Group</div>
                        </div>
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>ИИК</div>
                            <div style={{ marginTop: '2px' }}>KZ9696503F0009992270</div>
                        </div>
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Кбе</div>
                            <div style={{ marginTop: '2px' }}>17</div>
                        </div>
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Банк бенефициара</div>
                            <div style={{ marginTop: '2px' }}>АО "Forte Bank""</div>
                        </div>
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>БИК</div>
                            <div style={{ marginTop: '2px' }}>IRTYKZKA</div>
                        </div>
                        <div className="col-4" style={{ paddingBottom: '12px' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Код назначения</div>
                            <div style={{ marginTop: '2px' }}>814</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceInfoModal