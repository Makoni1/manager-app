import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { configData } from "../../services/api-config";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NewPasswordPage = () => {

    const { code } = useParams();
    console.log(code);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [errorTitle, setErrorTitle] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
        .get(configData.BASE_URL+`api/v1/users/get-user-email/${code}`)
        .then((response) => {
            console.log('get email by code response', response);
            if(response.status == 200) {
                setEmail(response.data);
                setLoader(false);
            }else {
                console.log('Произошла ошибка, попробуйте позже');
                setLoader(false);
                setEmailError(true);
            }
        })
        .catch(() => {
            // setLoading(false);
            // setErrorTitle('Введен неверный логин или пароль');
            console.log('Произошла ошибка, попробуйте позже');
            setLoader(false);
            setEmailError(true);
            // setErrorTitle('Произошла ошибка, попробуйте позже');
        });
        
    }, [])

    const setNewPassword = () => {
        console.log('send code');
        if(password && confirmPassword) {
            if(password === confirmPassword) {
                setErrorTitle();
                setIsLoading(true);

                const data = {
                    "email": email,
                    "password": password,
                    "confirmPassword": confirmPassword
                };

                axios
                    .post(configData.BASE_URL+`api/v1/users/reset-password`, data)
                    .then((response) => {
                        console.log('set new password responce', response);
                        if(response.status == 200) {
                            console.log('password set success');
                            setIsSuccess(true);
                        }
                        setIsLoading(false);
                    })
                    .catch(() => {
                        // setLoading(false);
                        // setErrorTitle('Введен неверный логин или пароль');
                        console.log('Произошла ошибка, попробуйте позже');
                        setErrorTitle('Произошла ошибка, попробуйте позже');
                        setIsLoading(false);
                    });
            }else {
                setErrorTitle('Пароли должны совпадать')
            }
            
        }else {
            setErrorTitle('Заполните все поля')
        }
    }

    const renderContent = () => {
        if(!loader) {
            if(!emailError) {
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

                            <div style={{ fontSize: '18px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Пароль успешно сохранен!</div>
                            <div style={{ fontSize: '15px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>Теперь вы можете войти в систему использую новый пароль</div>
                            
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Войти в систему</div>
                            </Link>
                        </div>
                    );
                }else {
                    return (
                        <>
                            <div style={{ fontSize: '14px', marginTop: '12px', color: '#A3ACB6' }}>Придумайте новый пароль для входа в систему</div>
                            <div style={{ marginTop: '24px' }}>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" placeholder="Введите пароль" style={{ fontSize: '16px', padding: '12px 16px' }} />
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="lg" placeholder="Повторите пароль" style={{ fontSize: '16px', padding: '12px 16px' }} />
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
                                    <button onClick={setNewPassword} style={{ width: '100%', backgroundColor: '#A3195B', borderRadius: '8px', padding: '14px', border: 'none', color: '#ffffff', fontWeight: '500', marginTop: '20px' }}>Сохранить пароль</button>
                                </div>
                            }
                        </>
                    );
                }
            }else {
                return (
                    <>
                        <div style={{ padding: '32px 0 24px', color: 'red', fontSize: '14px' }}>Данный email адрес не зарегистрирован</div>
                        <Link to="/registration" style={{ textDecoration: 'none', color: '#000000' }}>
                            <div style={{ fontSize: '13px', marginTop: '8px', padding: '8px' }}>Зарегистрироваться</div>
                        </Link>
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
        <div style={{ backgroundColor: '#f0f4f7', height: '100vh', width: '100vw', fontFamily: 'Inter', fontWeight: 400, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '16px' }}>
                <img src="/icons/logo.svg" height="40px" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', width: '380px', borderRadius: '24px', padding: '38px 44px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: 700 }}>Восстановление пароля</div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default NewPasswordPage;
