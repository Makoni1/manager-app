import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { configData } from "../../services/api-config";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ConfirmEmailPage = () => {

    const { code } = useParams();

    const [loader, setLoader] = useState(false);
    const [errorTitle, setErrorTitle] = useState();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setLoader(true);
        axios
        .get(configData.BASE_URL+`api/v1/users/client/register-email-confirm/${code}`)
        .then((response) => {
            console.log('get email by code response', response);
            if(response.status == 200) {
                setIsSuccess(true)
                setLoader(false);
            }else {
                console.log('Произошла ошибка, попробуйте позже');
                setLoader(false);
                setIsSuccess(false)
            }
        })
        .catch((error) => {
            setIsSuccess(false)
            if(error && error.response && error.response.data && error.response.data.errorText){
                setErrorTitle(error.response.data.errorText)
            }else{
                setErrorTitle('Произошла ошибка, попробуйте позже')
            }
            setLoader(false);
            
        });
        
    }, [])

    const renderContent = () => {
        if(!loader) {
                if(isSuccess) {
                    return (
                        <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '24px', textAlign: 'center' }}>
                            <div>
                                <div style={{ display: 'inline-block', backgroundColor: 'rgba(19, 182, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%' }}>                                      
                                    <div style={{ height: '20px', marginTop: '28px' }}>
                                        <img src="/icons/tick-success.svg" height="22px" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ fontSize: '18px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Почта успешно подтверждена!</div>
                            <div style={{ fontSize: '15px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>Теперь вы можете войти в систему</div>
                            
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Войти в систему</div>
                            </Link>
                        </div>
                    );
                }else {
                    return (
                        <>
                            <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '24px', textAlign: 'center' }}>
                            <div>
                                <div style={{ display: 'inline-block', backgroundColor: 'rgba(19, 182, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%' }}>                                      
                                    <div style={{ height: '20px', marginTop: '28px' }}>
                                        <img src="/icons/error-svgrepo-com.svg" height="22px" />
                                    </div>
                                </div>
                            </div>
                            {errorTitle && <div style={{ marginTop: '12px', fontSize: '13px', color: 'red' }}>{errorTitle}</div>}
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Выйти</div>
                            </Link>
                        </div>
                        </>
                    );
            }
        }else {
            return (
                <div style={{ padding: '64px 24px' }}>
                    <div className='loader brand' style={{ margin: '0 auto' }}></div>
                    <div style={{ marginTop: '12px', fontSize: '14px' }}>Загрузка данных..</div>
                </div>
            );
            
        }
    }

    return (
        <div style={{ backgroundColor: '#f0f4f7', height: '100vh', width: '100vw', fontFamily: 'Gerbera', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '16px' }}>
                <img src="/icons/logo.svg" height="40px" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', width: '380px', borderRadius: '24px', padding: '38px 44px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontFamily: 'Gerbera-Bold' }}>Подтверждение почты</div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;
