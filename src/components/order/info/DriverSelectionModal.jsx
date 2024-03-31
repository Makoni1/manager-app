import React, { useEffect, useState } from 'react';
import { Driver } from '../../../services';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'

const DriverSelectionModal = ({onClose, orderId}) => {

    console.log(orderId);

    const [drivers, setDrivers] = useState();
    const { user } = useSelector(state => state);

    const [selectedDriver, setSelectedDriver] = useState();

    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        if(user) {
            Driver.getByCompany(user.id, 'Confirmed', 1).then((response) => {
                console.log('Driver selection responce', response.data);
                if(response.status == 200) {
                    setDrivers(response.data)
                }
                else setDrivers([]); 
            }).catch(error => {
                console.log(error);
            })
        }
        
    }, [user]);

    const onSubmit = () => {
        if(selectedDriver) {
            Driver.assignDriver(orderId, selectedDriver.id).then((response) => {
                if(response.status == 200) {
                    setSubmitSuccess(true)
                }
                else {
                    console.log('Произошла ошибка, попробуйте позже');
                    alert('Произошла ошибка, попробуйте позже')
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const renderList = () => {
        console.log(selectedDriver)
        if(drivers) {
            const list = drivers.map((item, index) => {
                return (
                    <div key={index} onClick={() => setSelectedDriver(item)} style={{ borderBottom: '1px solid #eeeeee', backgroundColor: `${selectedDriver && selectedDriver.id === item.id ? 'rgba(163, 25, 91, 0.1)' : 'white'}` }} className='option-item'>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>{item.surname} {item.name} {item.patronymic}</div>
                            <div style={{ fontSize: '14px', color: '#A3ACB6' }}>{item.phoneNumber}</div>
                        </div>
                    </div>
                )
            });

            return list;
        }else {
            return <div style={{ textAlign: 'center', padding: '32px' }}>Загрузка..</div>
        }
    }

    const renderControlButtons = () => {
        return (
            <div style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button onClick={onClose} style={{ boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', border: 'none', backgroundColor: 'rgb(240, 244, 247)', padding: '8px 24px', borderRadius: '12px', fontSize: '14px' }}>Отменить</button>
                    </div>
                    <div>
                        <button onClick={onSubmit} style={{ backgroundColor: '#A3195B', padding: '8px 24px', border: 'none', borderRadius: '12px', color: '#ffffff', fontSize: '14px' }}>Добавить</button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className='modal-overlay'>
            <div style={{ backgroundColor: '#ffffff', maxHeight: 'calc(100vh - 50px)', maxWidth: '500px', margin: '24px auto', borderRadius: '6px' }}>
                <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', justifyContent: 'space-between', borderBottom: '1px solid #eeeeee', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                    <div style={{ fontSize: '16px', backgroundColor: '#ffffff', color: '#A3ACB6' }}>Назначение водителя</div>
                    <div onClick={onClose}>X</div>
                </div>
                {
                    submitSuccess 
                    ?
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <div>
                            <div style={{ display: 'inline-block', backgroundColor: 'rgba(19, 182, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%' }}>                                      
                                <div style={{ height: '20px', marginTop: '28px' }}>
                                    <img src="/icons/tick-success.svg" height="22px" />
                                </div>
                            </div>
                        </div>

                        <div style={{ fontSize: '20px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Водитель успешно забронирован!</div>
                        <div style={{ fontSize: '14px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>В ближайшее время мы рассмотрим вашу заявку и подтвердим заказ</div>
                        <div style={{ fontSize: '14px', marginTop: '2px', textAlign: 'center', color: '#A3ACB6' }}>Статус заказа можно отслеживать в разделе Заказы</div>
                        
                        <Link to="/main" style={{ textDecoration: 'none' }}>
                            <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Перейти к списку заказов</div>
                        </Link>
                    </div>
                    :
                    <>
                        <div style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 103px)', textAlign: 'left' }}>
                            {renderList()}
                        </div>
                        {renderControlButtons()}
                    </>
                }
                
            </div>
        </div>
    );
}

export default DriverSelectionModal;