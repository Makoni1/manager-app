import React, { useEffect, useState } from 'react';
import { setNavbarState } from '../../store/actions/navigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { File } from '../../services';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.css'
import {numberToFinanceFormat, phoneNumberFormat} from "../../utils";

const ProfilePageComponent = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const navigate = useNavigate();
    // const [registrationCertificate, setRegistrationCertificate] = useState();
    // const [contract, setContract] = useState();
    // const [orderOfAppointment, setOrderOfAppointment] = useState();

    // RegistrationCertificate,
    // Contract,
    // OrderOfAppointment,

    console.log('USER ---->', user)

    useEffect(() => {
        dispatch(setNavbarState({ activeNavId: user.type === "Expeditor" ? '4' : '3'}));
    }, []);

    // useEffect(() => {
    //     File.get('1')
    //     .then(response => {
            
    //         console.log(response);

    //         const file = new Blob([response.data], {
    //             type: response.data.type,
    //           });
          
    //           const fileURL = URL.createObjectURL(file);
    //           window.open(fileURL);

            
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         console.log('Произошла ошибка, попробуйте позже');
    //         alert('Произошла ошибка, попробуйте позже')
    //     });
        
    // }, []);

    const openDocument = (type) => {
        File.get(type)
        .then(response => {
            
            console.log(response);

            const file = new Blob([response.data], {
                type: response.data.type,
              });
          
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL);

            
        })
        .catch(error => {
            console.log(error);
            console.log('Произошла ошибка, попробуйте позже');
            alert('Произошла ошибка, попробуйте позже')
        });
    }

    const changePassword = () =>{
        // localStorage.removeItem('authData')
        navigate('/change-password')
        // location.reload();
    }
    
    return (
        <SkeletonTheme color="#e5ebf2" highlightColor="#f0f4f7">
            <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: '22px' }}>Профиль компании</div>
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
                <div style={{ marginTop: '18px' }}>
                    <div className='row'>
                        <div className='col-9'>
                            <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>
                                            
                                    <div style={{ color: '#A3ACB6', fontSize: '17px', lineHeight: '1.3', fontFamily: 'Gerbera-Medium' }}>Основные данные</div>  
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <div className='row'>
                                        <div className='col-6' style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Название организации</div>
                                                <div style={{ marginTop: '2px' }}>{user.name || <Skeleton width={200} />}</div>
                                            </div>
                                        </div>
                                        <div className='col-6' style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Контактный телефон</div>
                                                <div style={{ marginTop: '2px' }}>{phoneNumberFormat(user.phoneNumber || "") || <Skeleton width={200} />}</div>
                                            </div>
                                        </div>
                                        <div className='col-6' style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>БИН/ИИН</div>
                                                <div style={{ marginTop: '2px' }}>{user.businessIdentificationNumber || <Skeleton width={200} />}</div>
                                            </div>
                                        </div>
                                        <div className='col-6' style={{ paddingBottom: '16px' }}>
                                            <div>
                                                <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Email</div>
                                                <div style={{ marginTop: '2px' }}>{user.email || <Skeleton width={200} />}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '24px', backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>       
                                    <div style={{ color: '#A3ACB6', fontSize: '17px', lineHeight: '1.3', fontFamily: 'Gerbera-Medium' }}>Документы</div>  
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ padding: '12px 0', marginRight: '16px' }}>Свидетельство о регистрации</div>
                                        <div style={{ flex: '1' }}>
                                            <img src="/icons/tick-success.svg" height="10px" />
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <div onClick={() => openDocument('0')} className='document-link'>Посмотреть документ</div>
                                        </div>
                                    </div>
                                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ padding: '12px 0', marginRight: '16px' }}>Договор</div>
                                        <div style={{ flex: '1' }}>
                                            <img src="/icons/tick-success.svg" height="10px" />
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <div onClick={() => openDocument('1')} className='document-link'>Посмотреть документ</div>
                                        </div>
                                    </div> */}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ padding: '12px 0', marginRight: '16px' }}>Приказ о назначении</div>
                                        <div style={{ flex: '1' }}>
                                            <img src="/icons/tick-success.svg" height="10px" />
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <div onClick={() => openDocument('2')} className='document-link'>Посмотреть документ</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>       
                                    <div style={{ color: '#A3ACB6', fontSize: '17px', lineHeight: '1.3', fontFamily: 'Gerbera-Medium' }}>Статус</div>  
                                </div>
                                <div style={{ textAlign: 'center', padding: '24px' }}>
                                    <div style={{ display: 'inline-block' }}>
                                        <div style={{ backgroundColor: '#f0f4f7', padding: '22px', borderRadius: '50%' }}>
                                            <img src="/icons/verification.svg" style={{ opacity: `${user.state === "Moderation" ? '0.25' : '1'}` }} />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '16px' }}>{user.state === "Moderation" ? 'Верификация не пройдена' : 'Верификация пройдена'}</div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '16px', marginTop: '24px'}}>
                                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '12px'  }}>       
                                    <div style={{ color: '#A3ACB6', fontSize: '17px', lineHeight: '1.3', fontFamily: 'Gerbera-Medium' }}>Настройки</div>  
                                </div>
                                <div style={{ padding: '10px 10px' }}>
                                    <a style={{cursor: 'pointer'}} onClick={changePassword}>Сменить пароль</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </SkeletonTheme> 
    )
}

export default ProfilePageComponent;
