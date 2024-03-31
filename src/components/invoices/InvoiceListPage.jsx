import React, { useEffect, useState } from 'react';
import { setNavbarState } from '../../store/actions/navigationAction';
import InvoiceInfoModal from './InvoiceInfoModal';
import { useDispatch, useSelector } from 'react-redux';
import { Invoice } from '../../services';
import InvoiceListItem from './InvoiceListItem';
import Form from 'react-bootstrap/Form';
import EmptyInvoiceListItem from './EmptyInvoiceListItem';
import Alert from 'react-bootstrap/Alert';

const INVOICE_STATUSES = ['all', 'paid', 'awaitingpayment'];

const INVOICE_STATUS_TITLE = {
    'all': 'Все счета',
    'paid': 'Оплаченные', 
    'awaitingpayment': 'Ожидают оплаты',
}

const InvoiceListPage = () => {

    const emptyArr = [1,2,3];

    const { user } = useSelector(state => state);

    const dispatch = useDispatch();
    const [showInfoModal, setShowInfoModal] = useState(false);
    
    const [status, setStatus] = useState('all');
    const [invoices, setInvoices] = useState();
    const [activeInvoice, setActiveInvoice] = useState();

    useEffect(() => {
        dispatch(setNavbarState({ activeNavId: '2'}));
    }, []);

    useEffect(() => {
        Invoice.getByUser(user.id, status === 'all' ? '' : status, 1).then((response) => {
            console.log('Invoices responce', response.data);
            if(response.status == 200) {
                setInvoices(response.data) 
            }
            else setInvoices([]); 
        }).catch(error => {
            console.log(error);
        })
    }, [user, status]);

    const renderStatus = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ fontSize: '15px', color: '#A3ACB6' }}>Статус счета:</div>
                <div style={{ marginLeft: '16px' }}>
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={e => {setStatus(e.target.value)}}
                        style={{ fontSize: '14px', border: 'none', boxShadow: '0 2px 4px -2px rgb(228, 228, 228)', width: '200px' }}
                    >
                    {INVOICE_STATUSES.map((item, idx) => {
                        return (
                            <option value={item} key={idx}>{INVOICE_STATUS_TITLE[item]}</option>
                        );
                    })}
                    </Form.Control> 
                </div>
            </div>
        );
    }

    const renderList = () => {
        if(invoices) {
            if(invoices.length > 0) {
                const list = invoices.map((item, idx) => {
                    return (
                        <InvoiceListItem item={item} selectInvoice={(item) => setActiveInvoice(item)} key={idx} />
                    );
                });
        
                return list;
            }else {
                return (
                    <div>
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12vh', textAlign: 'center', color: '#A3ACB6' }}>
                            <div>
                                <img src="/icons/no-invoices.svg" height="60px" style={{ opacity: '0.5' }} />
                            </div>
                            <div style={{ marginTop: '24px' }}>По данной категории у вас пока нет счетов</div>
                        </div>
                    </div>
                );
            }
        }else {
            const list = emptyArr.map(item => {
                return <EmptyInvoiceListItem key={item} />
            });

            return list
        }
    };

    return (
        <>
            <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: '26px', fontFamily: 'Gerbera-Medium' }}>Ваши счета</div>
                {/* <div style={{ marginTop: '18px', display: 'flex', paddingBottom: '4px' }}>
                    <div style={{ backgroundColor: 'rgba(163, 25, 91, 0.1)', color: '#A3195B', padding: '6px 12px', fontSize: '13px', fontWeight: '600', borderRadius: '8px' }}>Все счета</div>
                    <div style={{ backgroundColor: '#ffffff', color: '#A3ACB6', padding: '6px 12px', fontSize: '13px', fontWeight: '400', borderRadius: '8px', marginLeft: '14px' }}>Не оплачен</div>
                    <div style={{ backgroundColor: '#ffffff', color: '#A3ACB6', padding: '6px 12px', fontSize: '13px', fontWeight: '400', borderRadius: '8px', marginLeft: '14px' }}>Оплачен</div>
                    <div style={{ backgroundColor: '#ffffff', color: '#A3ACB6', padding: '6px 12px', fontSize: '13px', fontWeight: '400', borderRadius: '8px', marginLeft: '14px' }}>Отменен</div>
                </div> */}
                {renderStatus()}

                {
                    user.state === "Moderation"
                    ?
                    <div style={{ marginTop: '16px' }}>
                        <Alert variant="warning" style={{ borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ height: '40px' }}>
                                    <img src="/icons/moderation.svg" height="40px" />
                                </div>
                                <div style={{ fontSize: '14px', marginLeft: '12px' }}>
                                    <div style={{ fontSize: '16px', fontFamily: 'Gerbera-Bold' }}>Ваш аккаунт находится на модерации!</div>
                                    <div style={{ marginTop: '2px' }}>Это может занять несколько часов. Как только модератор проверит данные Вашей компании Вы сможете создавать заказы</div>
                                </div>
                            </div>
                        </Alert>
                    </div>
                    : null
                }

                <div style={{ marginTop: '24px' }}>{renderList()}</div>
        
            </div>  
            {activeInvoice ? <InvoiceInfoModal item={activeInvoice} onClose={() => setActiveInvoice()} /> : null}
        </>  
    )
}

export default InvoiceListPage;