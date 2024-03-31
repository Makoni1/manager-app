import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { configData } from "../../services/api-config";
import {AuthContext} from '../../context/auth.context';
import {Link, useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const navigation = useNavigate()
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorTitle, setErrorTitle] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = () => {
        const payload = {
            username: username ? username.toLowerCase() : username,
            password: password,
        }
        if (payload.username && payload.password) {
            console.log(validateEmail(payload.username))
            if (validateEmail(payload.username)) {
                setErrorTitle();
                setIsLoading(true);
                axios
                    .get(configData.BASE_URL+'api/v1/users/login', {
                        auth: payload,
                        withCredentials: true
                    })
                    .then((response) => {
                        console.log('login responce', response);
                        if (response.status == 200) {
                            response.data.isAuthenticated = true;
                            // auth.login(response.data);
                            auth.login(response.data.accessToken);
                            navigation("/main")
                        }
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        if (error && error.response && error.response.data && error.response.data.errorCode) {
                            setErrorTitle(error.response.data.errorText)
                        } else {
                            setErrorTitle('Введен неверный логин или пароль');
                            // auth.login('7777777777777777');
                        }

                        setIsLoading(false);
                    });
            } else {
                setErrorTitle('Неверный формат Email')
            }

        } else {
            setErrorTitle('Заполните все поля')
        }

    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    };

    return (
        <div style={{
            backgroundColor: '#f0f4f7',
            height: '100vh',
            width: '100vw',
            fontFamily: 'Inter',
            position: 'relative',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <a href="https://biny.co/" target="_blank" style={{position: 'absolute', top: '25px'}}>
                <img alt="logo" src="/icons/logo.svg" height="40px"/>
            </a>
            <div style={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
                width: '360px',
                borderRadius: '24px',
                padding: '38px 44px',
                textAlign: 'center'

            }}>
                <div style={{
                }}>
                    <div style={{fontSize: '24px', fontFamily: 'Inter', fontWeight: 700}}>Вход в систему</div>
                    <div style={{fontSize: '14px', marginTop: '12px'}}>Введите логин и пароль для входа в систему</div>
                    <div style={{marginTop: '24px'}}>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} size="lg"
                                      type="text" placeholder="Email" style={{fontSize: '16px', padding: '12px 16px'}} autoComplete="on"/>
                        <Form.Control onKeyDown={(e) => handleKeyPress(e)} value={password}
                                      onChange={(e) => setPassword(e.target.value)} size="lg" type="password"
                                      placeholder="Пароль"
                                      style={{fontSize: '16px', padding: '12px 16px', marginTop: '16px'}}  autoComplete="on"/>
                    </div>
                    <div style={{textAlign: 'right', fontSize: '13px', marginTop: '10px', color: '#A3ACB6'}}>
                        <Link to="/forgot-password">Забыли пароль?</Link>
                    </div>

                    {errorTitle && <div style={{marginTop: '12px', fontSize: '13px', color: 'red'}}>{errorTitle}</div>}

                    {
                        isLoading
                            ?
                            <div style={{
                                width: '100%',
                                backgroundColor: '#A3195B',
                                borderRadius: '8px',
                                padding: '19px 14px 18px',
                                border: 'none',
                                color: '#ffffff',
                                fontWeight: '500',
                                marginTop: '20px'
                            }}>
                                <div className="loader white" style={{margin: '0 auto'}}></div>
                            </div>
                            :
                            <div>
                                <button onClick={handleLogin} style={{
                                    width: '100%',
                                    backgroundColor: '#A3195B',
                                    borderRadius: '8px',
                                    padding: '14px',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontWeight: '500',
                                    marginTop: '20px'
                                }}>Войти
                                </button>
                            </div>
                    }
                    <Link to="/registration" style={{textDecoration: 'none', color: '#000000'}}>
                        <div style={{
                            fontSize: '16px',
                            marginTop: '8px',
                            padding: '12px',
                            border: '1.6px solid #a4185b',
                            color: '#a4185b',
                            borderRadius: '8px',
                            fontWeight: 500
                        }}>Зарегистрироваться</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
