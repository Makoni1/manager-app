import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { User } from '../../services';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {

    const { code } = useParams();
    console.log(code);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorTitle, setErrorTitle] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const setPassword = () => {
        console.log('send code');
        if(oldPassword && newPassword && confirmPassword) {
            if(newPassword === confirmPassword) {
                setErrorTitle();
                setIsLoading(true);

                const data = {
                    "oldPassword": oldPassword,
                    "newPassword": newPassword,
                    "confirmPassword": confirmPassword
                };

                User.changePassword(data).then((response) => {
                    if(response.status == 200) {
                        console.log('password set success');
                        setIsSuccess(true);
                    }
                    else {
                        console.log('Произошла ошибка, попробуйте позже');
                        alert('Произошла ошибка, попробуйте позже')
                    }
                    setIsLoading(false);
                }).catch(error => {
                    console.log('Произошла ошибка, попробуйте позже');
                    setErrorTitle('Произошла ошибка, попробуйте позже');
                    setIsLoading(false);
                })
            }else {
                setErrorTitle('Пароли должны совпадать')
            }
            
        }else {
            setErrorTitle('Заполните все поля')
        }
    }

    const forgotPassword = () =>{
        localStorage.removeItem('authData')
        navigate('/forgot-password')
        location.reload();
    }

    const renderContent = () => {
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

                            <div style={{ fontSize: '18px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Пароль успешно изменен!</div>
                            <div style={{ fontSize: '15px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>Теперь вы можете войти в систему использую новый пароль</div>
                            
                            <Link to="/profile" style={{ textDecoration: 'none', fontSize: '15px', color: '#A3195B' }}>
                                Назад
                            </Link>
                        </div>
                    );
                }else {
                    return (
                        <>  
                            <div style={{ marginTop: '15px' }}>
                                <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} size="lg" placeholder="Текущий пароль" style={{ fontSize: '16px', padding: '12px 16px' }} />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} size="lg" placeholder="Новый пароль" style={{ fontSize: '16px', padding: '12px 16px' }} />
                            </div>
                            <div style={{ marginTop: '12px' }}>
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
                                    <button onClick={setPassword} style={{ width: '100%', backgroundColor: '#A3195B', borderRadius: '8px', padding: '14px', border: 'none', color: '#ffffff', fontWeight: '500', marginTop: '20px' }}>Подтвердить</button>
                                </div>
                            }
                            <div style={{ textAlign: 'center', fontSize: '13px', marginTop: '10px', color: '#A3ACB6' }}>
                                <a onClick={forgotPassword} style={{textDecoration: 'unset', color: '#A3195B', cursor: 'pointer'}} to="/forgot-password">Забыли пароль?</a>
                            </div>
                        </>
                    );
                }
    }

    return (
        <div style={{ backgroundColor: '#f0f4f7', height: '100vh', width: '100vw', fontFamily: 'Gerbera', position: 'relative' }}>
            {/* <div style={{ position: 'absolute', top: '24px', left: '16px' }}>
                <img src="/icons/logo.svg" height="40px" />
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', width: '380px', borderRadius: '24px', padding: '28px 44px', textAlign: 'center' }}>
                    <div style={{position: 'relative', top: '-15px', right: '-160px', cursor: 'pointer'}}  onClick={()=>{navigate('/profile')}}>
                        <img height={'10px'} src="/icons/close2.svg" alt="" />
                    </div>
                    <div style={{ fontSize: '24px', fontFamily: 'Gerbera-Bold' }}>Сменить пароль</div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordPage;