import React, { useEffect, useState } from 'react';
import { setNavbarState } from '../../store/actions/navigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Driver } from '../../services';
import Form from 'react-bootstrap/Form';

const DRIVER_STATE_TITLE = {
    "Pending": 'Завершение регистрации',
    "Confirmed": 'Верифицирован',
    "Moderation": 'На модерации'
}

const STATUS_TITLE = {
    'all': 'Все водители',
    'Pending': 'Завершение регистрации', 
    'Moderation': 'На модерации',
    'Confirmed': 'Верифицирован', 
}

const DRIVER_STATUSES = ['all', 'Pending', 'Moderation', 'Confirmed'];

const DriversPage = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state);

    const [status, setStatus] = useState('all');
    const [drivers, setDrivers] = useState();

    useEffect(() => {
        dispatch(setNavbarState({ activeNavId: '3'}));
    }, []);

    useEffect(() => {
        if(user) {
            Driver.getByCompany(user.id, status === 'all' ? '' : status, 1).then((response) => {
                console.log('Company Driver responce', response.data);
                if(response.status == 200) {
                    setDrivers(response.data)
                }
                else setDrivers([]); 
            }).catch(error => {
                console.log(error);
            })
        }
        
    }, [user, status]);

    const renderStatus = () => {
        console.log('STATUS ===>', status);
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ fontSize: '15px', color: '#A3ACB6' }}>Статус заказа:</div>
                <div style={{ marginLeft: '16px' }}>
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={e => {setStatus(e.target.value)}}
                        style={{ fontSize: '14px', border: 'none', boxShadow: '0 2px 4px -2px rgb(228, 228, 228)', width: '220px' }}
                    >
                    {DRIVER_STATUSES.map((item, idx) => {
                        return (
                            <option key={idx} value={item}>{STATUS_TITLE[item]}</option>
                        );
                    })}
                    </Form.Control> 
                </div>
            </div>
        );
    }

    const renderList = () => {
        if(drivers) {
            if(drivers.length > 0) {
                const list = drivers.map((item, idx) => {
                    return (
                        <div key={idx} className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ paddingBottom: '24px' }}>
                            <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '12px 16px 16px', position: 'relative' }}>
                                
                                {/* <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: '#50C878', color: '#ffffff', padding: '0 6px 2px', borderRadius: '8px' }}>
                                        <div>
                                            <img src="/icons/whatsapp-logo.svg" height="16px" />
                                        </div>
                                        <div style={{ fontFamily: 'Gerbera-Medium', fontSize: '13px', marginLeft: '4px' }}>Чат</div>
                                    </div>
                                </div> */}

                                

                                <div style={{ fontSize: '12px', color: `${item.state === 'Confirmed' ? '#A3195B' : '#A3ACB6'}` }}>{DRIVER_STATE_TITLE[item.state]}</div>
                                <div style={{ display: 'flex', marginTop: '18px' }}>
                                    <div>
                                        <img src="/icons/driver-account.svg" width="48px" style={{ opacity: '0.5' }} />
                                    </div>
                                    <div style={{ flex: '1', marginLeft: '16px', marginRight: '16px' }}>
                                        <div style={{ fontFamily: 'Gerbera-Medium' }}>{item.surname} {item.name}</div>
                                        <div style={{ fontSize: '14px', color: '#A3ACB6', marginTop: '2px' }}>{DRIVER_STATE_TITLE[item.state]}</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '16px', display: 'flex', gap: '24px' }}>
                                    <div>
                                        <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Телефон</div>
                                        <div style={{ marginTop: '2px', fontSize: '14px' }}>{item.phoneNumber}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Email</div>
                                        <div style={{ marginTop: '2px', fontSize: '14px' }}>{item.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
                return <div className='row' style={{ marginTop: '20px' }}>{list}</div>
            }else {
                return (
                    <div style={{ marginTop: '16px' }}>
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12vh', textAlign: 'center', color: '#A3ACB6' }}>
                            <div>
                                <img src="/icons/no-orders.svg" height="60px" style={{ opacity: '0.5' }} />
                            </div>
                            <div style={{ marginTop: '24px' }}>Вы пока не добавляли водителей</div>
                        </div>
                    </div>
                );
            }
        }else {
            return (
                <div style={{ marginTop: '16px' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12vh', textAlign: 'center', color: '#A3ACB6' }}>
                            <div style={{ marginTop: '24px' }}>Загрузка..</div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '26px', fontFamily: 'Gerbera-Medium' }}>Водители</div>
                    <div>
                        {
                            user.state === "Moderation" ?
                            <div style={{ backgroundColor: '#A3ACB6', color: '#ffffff', padding: '8px 16px', fontSize: '13px', borderRadius: '8px', marginLeft: '14px' }}>Добавить водителя</div>
                            :
                            <Link to="/driver-create" style={{ textDecoration: 'none' }}>
                                <div style={{ backgroundColor: '#A3195B', color: '#ffffff', padding: '8px 16px', fontSize: '13px', borderRadius: '8px', marginLeft: '14px' }}>Добавить водителя</div>
                            </Link>
                        }
                    </div>
                </div>
                {renderStatus()}
                <div>
                    {renderList()}
                </div>
            </div>    
        </>
    );
}

export default DriversPage