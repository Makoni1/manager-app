import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { configData } from "../../services/api-config";
import { Link } from 'react-router-dom';
import {requestErrorDisplay} from '../../utils';
import {toast} from 'react-toastify';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [errorTitle, setErrorTitle] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const sendCode = () => {
        console.log('send code');
        if(email) {
            if(validateEmail(email)) {
                setErrorTitle();
                setIsLoading(true);
                axios
                    .get(configData.BASE_URL+`api/v1/users/forgot-password/${email}`)
                    .then((response) => {
                        console.log('send code responce', response);
                        if(response.status == 200) {
                            console.log('SUCCESS');
                            setIsLoading(false);
                            setIsSuccess(true);
                          toast.success('Вам на почту была отправлена ссылка для восстановления пароля')
                        } else {
                          toast.info('Пользователь не зарегистрирован.')
                            // setErrorTitle('Произошла ошибка, попробуйте позже');
                            setIsLoading(false);
                        }
                        
                    })
                    .catch((e) => {
                        requestErrorDisplay(e)
                        // setErrorTitle('Произошла ошибка, попробуйте позже');
                        setIsLoading(false);
                    });
            }else {
              setErrorTitle('Неверный формат Email')
              toast.info('Неверный формат Email')
            }
            
        }else {
            setErrorTitle('Заполните все поля')
            toast.info('Заполните все поля')
        }
    }

    return (
        <div style={{ backgroundColor: '#f0f4f7', height: '100vh', width: '100vw', fontFamily: 'Inter', fontWeight: 500, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '16px' }}>
                <img src="/icons/logo.svg" height="40px" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', width: '420px', borderRadius: '24px', padding: '38px 44px', textAlign: 'center' }}>
                    {
                        !isSuccess ?
                        <>
                            <div style={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: 700 }}>Забыли пароль?</div>
                            <div style={{ fontSize: '14px', marginTop: '12px', color: '#A3ACB6' }}>Для восстановления пароля необходимо ввести электронную почту, на которую зарегистрирован ваш аккаунт. Далее мы отправим вам на указанный адрес ссылку для восстановления пораля</div>
                            <div style={{ marginTop: '24px' }}>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} size="lg" type="text" placeholder="Email" style={{ fontSize: '16px', padding: '12px 16px' }} />
                            </div>
                            
                            {errorTitle && <div style={{ marginTop: '12px', fontSize: '13px', color: 'red' }}>{errorTitle}</div>}
                            
                            {
                                isLoading 
                                ?
                                <div style={{ width: '100%', backgroundColor: '#A3195B', borderRadius: '8px', padding: '19px 14px 18px', border: 'none', color: '#ffffff', fontWeight: '500', marginTop: '20px' }}>
                                    <div className="loader white" style={{ margin: '0 auto' }}></div>
                                </div>
                                :
                                <div>
                                    <button onClick={sendCode} style={{ width: '100%', backgroundColor: '#A3195B', borderRadius: '8px', padding: '14px', border: 'none', color: '#ffffff', fontWeight: '500', marginTop: '20px' }}>Отправить код</button>
                                </div>
                            }
                        </>
                        :
                        <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '24px', textAlign: 'center' }}>
                            <div>
                                <div style={{ display: 'inline-block', backgroundColor: 'rgba(19, 182, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%' }}>                                      
                                    <div style={{ height: '20px', marginTop: '28px' }}>
                                        <img src="/icons/tick-success.svg" height="22px" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ fontSize: '18px', fontFamily: 'Inter', fontWeight: 700, marginTop: '24px' }}>Ссылка успешно отправлена!</div>
                            <div style={{ fontSize: '15px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>Вам на почту была отправлена ссылка для восстановления пароля</div>
                            
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Вернуться на главную</div>
                            </Link>
                        </div>
                        
                    }
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
