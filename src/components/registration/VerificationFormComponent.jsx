import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import OrderInfoConditionsModal from "./OrderInfoConditionsModal";
import './styles.css';
import {File, User} from '../../services';
import {useSelector} from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const VerificationFormComponent = ({updateStep, isRegistrationComplete = false, data, setData}) => {

    const {user} = useSelector(state => state);

    const [companyName, setCompanyName] = useState();
    const [companyBin, setCompanyBin] = useState();
    const [registrationCertificate, setRegistrationCertificate] = useState();
    const [activeMadal, setActiveMadal] = useState(false)
    const [isConditions, setisConditions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorTitle, setErrorTitle] = useState();
    const [orderOfAppointment, setOrderOfAppointment] = useState();

    const setRegistrationCertificateValid = (file) => {
        console.log('F111: ', file)
        setRegistrationCertificate(file)
    }

    const setOrderOfAppointmentValid = (file) => {
        console.log('F222: ', file)
        setOrderOfAppointment(file)
    }


    const onHandleSubmit = (userId) => {
        console.log('files data ==>', registrationCertificate, orderOfAppointment);
        if (companyName, companyBin, registrationCertificate, orderOfAppointment) {
            const formData1 = new FormData();
            formData1.append("file", registrationCertificate);
            formData1.append("type", 0)
            formData1.append("userId", userId)
            const formData3 = new FormData();
            formData3.append("file", orderOfAppointment);
            formData3.append("type", 2);
            formData3.append("userId", userId);
            Promise.all([
                File.add(formData1),
                File.add(formData3),
            ]).then(responses => {
                if (responses && responses.length && responses[0].status == 200 && responses[1].status == 200) {
                    setIsLoading(false);
                    updateStep(3)
                } else {
                    setRegistrationCertificate();
                    setOrderOfAppointment();
                    setErrorTitle('При загрузке файлов произошла ошибка (неверный формат файла или слишком большой размер файла),попробуйте заново загрузить!')
                    setIsLoading(false);
                    updateStep(2);
                }
            }).catch(error => {
                setRegistrationCertificate()
                setOrderOfAppointment()
                setErrorTitle('При загрузке файлов произошла ошибка (неверный формат файла или слишком большой размер файла),попробуйте заново загрузить!')
                updateStep(2)
                setIsLoading(false);
            });
        }
    }

    const miss = () => {
        updateStep(1)
        setData(data)
    }

    const selectConditions = () => {
        if (!isConditions) {
            setisConditions(true);
        } else {
            setisConditions(false);
        }
    };

    const handleRegistration = () => {
        setIsLoading(true);
        data.name = companyName
        data.businessIdentificationNumber = companyBin
        User.register(data)
            .then((response) => {
                if (response.status == 200) {
                    //   updateStep(3);
                    onHandleSubmit(response.data.userId)
                } else {
                    setIsLoading(false);
                    alert("Произошла ошибка, попробуйте позже");
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.status == 409) {
                    setErrorTitle('Телефон или электронной почте уже есть в базе!')
                } else {
                    alert("Произошла ошибка, попробуйте позже");
                }
            });
    };

    const renderButtons = () => {
        if (isRegistrationComplete) {
            return (
                <div>
                    <button onClick={onHandleSubmit} style={{
                        width: '100%',
                        backgroundColor: '#A3195B',
                        borderRadius: '8px',
                        padding: '14px',
                        border: 'none',
                        color: '#ffffff',
                        fontWeight: '500',
                        marginTop: '20px'
                    }}>Завершить регистрацию
                    </button>
                </div>
            );
        } else {
            return (
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button onClick={miss}
                            style={{
                                width: "120px",
                                backgroundColor: "#ffff",
                                color: '#A3195B',
                                marginRight: '20px',
                                borderRadius: "8px",
                                padding: "12px",
                                border: "1px solid #A3195B",
                                fontWeight: "500",
                                marginTop: "20px",
                            }}>&larr; Назад
                    </button>
                    {
                        isLoading ?
                            <div style={{
                                width: "100%",
                                opacity: "0.7",
                                backgroundColor: "#A3195B",
                                borderRadius: "8px",
                                padding: "19px 14px 18px",
                                border: "none",
                                color: "#ffffff",
                                fontWeight: "500",
                                marginTop: "20px",
                            }}>
                                <div className="loader white" style={{margin: "0 auto"}}></div>
                            </div>
                            : companyName && companyBin && registrationCertificate && orderOfAppointment && isConditions
                                ? <button onClick={handleRegistration}
                                          style={{
                                              width: "220px",
                                              backgroundColor: "#A3195B",
                                              borderRadius: "8px",
                                              padding: "12px",
                                              border: "none",
                                              color: "#ffffff",
                                              fontWeight: "500",
                                              marginTop: "20px",
                                          }}>Зарегистрироваться
                                </button> :
                                <button style={{
                                    width: "220px",
                                    backgroundColor: "rgb(137 135 135)",
                                    borderRadius: "8px",
                                    padding: "14px",
                                    border: "none",
                                    color: "#ffffff",
                                    fontWeight: "500",
                                    marginTop: "20px",
                                    cursor: "default",
                                }}>
                                    Зарегистрироваться
                                </button>

                    }
                </div>
            );
        }
    }

    const renderDescription = () => {
        if (isRegistrationComplete) {
            if (user.state === 'Pending') {
                return (
                    <>
                        <div style={{fontSize: '24px', fontFamily: 'Gerbera-Bold'}}>
                            Завершение регистрации
                        </div>
                        <div style={{fontSize: '14px', marginTop: '12px'}}>
                            Вы успешно авторизовались! Для полноценной работы Вам необходимо заполнить данные о компании
                        </div>
                    </>
                );
            } else if (user.state === 'Rejected') {
                return (
                    <>
                        <div style={{fontSize: '24px', fontFamily: 'Gerbera-Bold'}}>
                            Регистрация не пройдена
                        </div>
                        <div style={{fontSize: '14px', marginTop: '12px', textAlign: 'left'}}>
                            К сожалению в ходе модерации, была найдена ошибка в данных вашей компании. Необходимо
                            повторно ввести данные о компании
                        </div>
                        <div style={{marginTop: '12px'}}>
                            <Alert variant="danger" style={{borderRadius: '12px'}}>
                                <div style={{fontSize: '14px', textAlign: 'left'}}>
                                    <div style={{fontSize: '16px', fontFamily: 'Gerbera-Bold'}}>Причина отказа</div>
                                    <div style={{marginTop: '2px'}}>{user ? user.comment : 'Загрузка..'}</div>
                                </div>
                            </Alert>
                        </div>
                    </>
                );
            }

        } else {
            return (
                <>
                    <div style={{fontSize: '24px', fontFamily: 'Gerbera-Bold'}}>
                        Подтверждение компании
                    </div>
                    <div style={{fontSize: '14px', marginTop: '12px'}}>
                        Заполните данные о компании, чтобы получить доступ к созданию заказов
                    </div>
                </>
            );
        }
    }

    return (
        <div style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
            width: '500px',
            borderRadius: '24px',
            padding: '28px 44px',
            textAlign: 'center'
        }}>
            {renderDescription()}
            <div style={{marginTop: '24px'}}>
                <Form.Control value={companyName} onChange={(e) => setCompanyName(e.target.value)} size="lg" type="text"
                              placeholder="Название компании" style={{fontSize: '15px', padding: '12px 16px'}}/>
                <Form.Control value={companyBin} onChange={(e) => setCompanyBin(e.target.value)} size="lg" type="text"
                              placeholder="БИН компании"
                              style={{fontSize: '15px', padding: '12px 16px', marginTop: '16px'}}/>
                <div style={{
                    marginTop: '16px',
                    border: '1px solid #ced4da',
                    borderRadius: '8px',
                    textAlign: 'left',
                    padding: '12px 16px'
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: '1'}}>
                            <div style={{fontSize: '15px'}}>Свидетельство о регистрации</div>
                            <div style={{fontSize: '13px', color: '#A3ACB6'}}>Загрузите фото, скан документа</div>
                        </div>
                        {
                            !registrationCertificate
                                ?
                                <div>
                                    <label className="custom-file-upload">
                                        <input type="file"
                                               onChange={() => setRegistrationCertificateValid(event.target.files[0])}/>
                                        <div style={{
                                            backgroundColor: 'rgba(187, 187, 187, 0.1)',
                                            padding: '6px 12px 12px',
                                            borderRadius: '12px'
                                        }}>
                                            <div style={{height: '20px'}}>
                                                <img src="/icons/upload.svg" height="16px"/>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                :
                                <div>
                                    <label for="upload-photo">
                                        <div style={{
                                            backgroundColor: 'rgba(19, 182, 94, 0.1)',
                                            padding: '6px 12px 12px',
                                            borderRadius: '12px'
                                        }}>
                                            <div style={{height: '20px'}}>
                                                <img src="/icons/tick-success.svg" height="10px"/>
                                            </div>
                                        </div>
                                    </label>
                                    <input type="file" name="photo" id="upload-photo"/>
                                </div>
                        }
                    </div>
                </div>
                {/* <div style={{ marginTop: '16px', border: '1px solid #ced4da', borderRadius: '8px', textAlign: 'left', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>
                        <div style={{ fontSize: '15px' }}>Договор</div>
                        <div style={{ fontSize: '13px', color: '#A3ACB6' }}>Загрузите фото, скан документа</div>
                    </div>
                    {
                        !orderOfAppointment 
                        ?
                        <div>
                            <label class="custom-file-upload">
                                <input type="file" onChange={() => setOrderOfAppointment(event.target.files[0])} />
                                <div style={{ backgroundColor: 'rgba(187, 187, 187, 0.1)', padding: '6px 12px 12px', borderRadius: '12px' }}>                                      
                                    <div style={{ height: '20px' }}>
                                        <img src="/icons/upload.svg" height="16px" />
                                    </div>
                                </div>
                            </label>
                        </div> 
                        :
                        <div>
                            <label for="upload-photo">
                                <div style={{ backgroundColor: 'rgba(19, 182, 94, 0.1)', padding: '6px 12px 12px', borderRadius: '12px' }}>                                      
                                    <div style={{ height: '20px' }}>
                                        <img src="/icons/tick-success.svg" height="10px" />
                                    </div>
                                </div>
                            </label>
                            <input type="file" name="photo" id="upload-photo" />
                        </div>     
                    }
                </div>
            </div> */}
                <div style={{
                    marginTop: '16px',
                    border: '1px solid #ced4da',
                    borderRadius: '8px',
                    textAlign: 'left',
                    padding: '12px 16px'
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: '1'}}>
                            <div style={{fontSize: '15px'}}>Приказ о назначении</div>
                            <div style={{fontSize: '13px', color: '#A3ACB6'}}>Загрузите фото, скан документа</div>
                        </div>
                        {
                            !orderOfAppointment
                                ?
                                <div>
                                    <label className="custom-file-upload">
                                        <input type="file"
                                               onChange={() => setOrderOfAppointmentValid(event.target.files[0])}/>
                                        <div style={{
                                            backgroundColor: 'rgba(187, 187, 187, 0.1)',
                                            padding: '6px 12px 12px',
                                            borderRadius: '12px'
                                        }}>
                                            <div style={{height: '20px'}}>
                                                <img src="/icons/upload.svg" height="16px"/>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                :
                                <div>
                                    <label for="upload-photo">
                                        <div style={{
                                            backgroundColor: 'rgba(19, 182, 94, 0.1)',
                                            padding: '6px 12px 12px',
                                            borderRadius: '12px'
                                        }}>
                                            <div style={{height: '20px'}}>
                                                <img src="/icons/tick-success.svg" height="10px"/>
                                            </div>
                                        </div>
                                    </label>
                                    <input type="file" name="photo" id="upload-photo"/>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div
                style={{
                    textAlign: "left",
                    fontSize: "13px",
                    marginTop: "20px",
                    color: "#A3ACB6",
                    display: "flex",
                }}
            >
                <input
                    type="checkbox"
                    style={{cursor: "pointer", marginRight: "7px"}}
                    onClick={selectConditions}
                />
                <div style={{lineHeight: "14px"}}>
                    Продолжая вы соглашаетесь с
                    <span
                        onClick={() => setActiveMadal(true)}
                        style={{color: "#A3195B", cursor: "pointer", marginLeft: '5px'}}
                    >
              условиями использования
            </span>{" "}
                    сервиса Biny
                </div>
            </div>
            {errorTitle &&
                <div style={{marginTop: "12px", fontSize: "13px", color: "red"}}>
                    {errorTitle}
                </div>
            }
            {renderButtons()}
            {activeMadal && (
                <OrderInfoConditionsModal onClose={() => setActiveMadal(false)}/>
            )}
        </div>

    );
}

export default VerificationFormComponent;
