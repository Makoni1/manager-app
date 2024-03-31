import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Driver } from '../../services';
import InputMask from 'react-input-mask';

const DriverCreatePage = () => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state);
    console.log('USER ====>', user);

    const [surname, setSurname] = useState();
    const [name, setName] = useState();
    const [patronymic, setPatronymic] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();

    const [errorTitle, setErrorTitle] = useState();
    const [creationSuccess, setCreationSuccess] = useState(false);

    const phoneNumberMask = '+79999999999';

    const onCancel = () => {
        navigate('/drivers');
    }

    const onSubmit = () => {
        if(surname && name && patronymic && phoneNumber && email) {
            setErrorTitle();
            console.log('driver creation');

            const data = {
                name,
                surname,
                patronymic,
                phoneNumber: phoneNumber.replace('+', ''),
                email,
                "companyId": user.id
            }

            Driver.createCompanyDriver(data)
            .then(response => {
                console.log('COMPANY DRIVER CREATE', response.data)
                    if(response.status == 200) setCreationSuccess(true);
                else {
                    console.log('Произошла ошибка, попробуйте позже');
                    alert('Произошла ошибка, попробуйте позже')
                }
            })
            .catch(error => {
                console.log(error);
            });

        }else setErrorTitle('Необходимо заполнить все поля');
    }

    const renderForm = () => {
        return (
            <>
                <div style={{ fontSize: '18px', paddingBottom: '16px' }}>Персональные данные</div>
                <Form.Group className="mb-2" >
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Фамилия</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="text" placeholder="Введите фамилию" value={surname} onChange={(event) => setSurname(event.target.value)} style={{ fontSize: '14px' }} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Имя</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="text" placeholder="Введите имя" value={name} onChange={(event) => setName(event.target.value)} style={{ fontSize: '14px' }} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Отчество</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="text" placeholder="Введите отчество" value={patronymic} onChange={(event) => setPatronymic(event.target.value)} style={{ fontSize: '14px' }} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Номер телефона</Form.Label>
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="text" placeholder="Введите номер телефона" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} style={{ fontSize: '14px' }} />
                    </div> */}
                    <InputMask
                        value={phoneNumber}
                        maskChar={null}
                        mask={phoneNumberMask}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        disabled={false}
                    >
                        {(inputProps) => (
                        <Form.Control {...inputProps} type="text" placeholder="Введите телефон" style={{ fontSize: '14px' }} />
                        )}
                    </InputMask>
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Email</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="text" placeholder="Введите email" value={email} onChange={(event) => setEmail(event.target.value)} style={{ fontSize: '14px' }} />
                    </div>
                </Form.Group>
            </>
        );
    }

    const renderControlButtons = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <button onClick={onCancel} style={{ boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', border: 'none', backgroundColor: '#ffffff', padding: '12px 48px', borderRadius: '12px' }}>Отменить</button>
                </div>
                <div>
                    <button onClick={onSubmit} style={{ backgroundColor: '#A3195B', padding: '12px 48px', border: 'none', borderRadius: '12px', color: '#ffffff' }}>Добавить</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px 24px 32px' }}>
            <div style={{ fontSize: '26px', fontFamily: 'Gerbera-Medium' }}>Добавление водителя</div>
            {
                creationSuccess 
                ?
                <div style={{ marginTop: '24px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '38px 44px', textAlign: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', backgroundColor: 'rgba(19, 182, 94, 0.1)', width: '80px', height: '80px', borderRadius: '50%' }}>                                      
                            <div style={{ height: '20px', marginTop: '28px' }}>
                                <img src="/icons/tick-success.svg" height="22px" />
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: '24px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Водитель успешно добавлен!</div>
                    <div style={{ fontSize: '15px', marginTop: '16px', textAlign: 'center', color: '#A3ACB6' }}>Он будет доступен для назначения в заявки после того как пройдет модерацию</div>
                    <div style={{ fontSize: '15px', marginTop: '2px', textAlign: 'center', color: '#A3ACB6' }}>Вы можете отследить статус водиетля в разделе Водители</div>
                    
                    <Link to="/drivers" style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '15px', marginTop: '16px', padding: '8px', color: '#A3195B' }}>Перейти к списку водителей</div>
                    </Link>
                </div>
                :
                <div className='row' style={{ marginTop: '30px' }}>
                    <div className='col-2'></div>
                        <div className='col-8'>
                            <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px', padding: '24px' }}>
                                {renderForm()}
                            </div>
                            {errorTitle ? <div style={{ color: 'red', marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>{errorTitle}</div> : null}
                            <div className='mt-4'>{renderControlButtons()}</div>
                        </div>
                    <div className='col-2'></div>
                </div>  
            }
                     
        </div>    
    );
}

export default DriverCreatePage;