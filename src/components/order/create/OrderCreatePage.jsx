import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import InputMask from 'react-input-mask';
import { Order, File } from '../../../services';
import SelectModal from '../../custom/SelectModal';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ORDER_NAVIGATION = [
    { value: 1, title: 'Отправитель' },
    { value: 2, title: 'Получатель' },
    { value: 3, title: 'Габариты' },
    { value: 4, title: 'Стоимость' }
];

const OrderCreatePage = () => {

    const { user } = useSelector(state => state);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('id') ? searchParams.get('id') : null
    const [step, setStep] = useState(1);

    const [countries, setCountries] = useState();
    const [cities, setCities] = useState();
    const [categories, setCategories] = useState();
    const [types, setTypes] = useState();

    const [showCountrySelect, setShowCountrySelect] = useState(false);
    const [showCitySelect, setShowCitySelect] = useState(false);
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [showTypeSelect, setShowTypeSelect] = useState(false);

    const [errorTitle, setErrorTitle] = useState();

    // FORM
    // step 1
    const [pickUpDate, setPickUpDate] = useState();
    const [pickUpStartTime, setPickUpStartTime] = useState();
    const [pickUpEndTime, setPickUpEndTime] = useState();
    const [countryFrom, setCountryFrom] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [addressFrom, setAddressFrom] = useState();
    // step 2
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientPhone, setRecipientPhone] = useState();
    const [deliveryDate, setDeliveryDate] = useState();
    const [deliveryStartTime, setDeliveryStartTime] = useState();
    const [deliveryEndTime, setDeliveryEndTime] = useState();
    const [countryTo, setCountryTo] = useState();
    const [cityTo, setCityTo] = useState();
    const [addressTo, setAddressTo] = useState('');
    // step 3
    const [category, setCategory] = useState();
    const [type, setType] = useState();
    const [weight, setWeight] = useState();
    const [volume, setVolume] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [length, setLength] = useState();
    const [details, setDetails] = useState();
    const [copyCount, setCopyCount] = useState(1);
    // step 4
    const [price, setPrice] = useState();
    const [netPrice, setNetPrice] = useState();
    const [distance, setDistance] = useState();

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [calculationLoading, setCalculationLoading] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [declaredPrice, setDeclaredPrice] = useState();
    const [insurancePrice, setInsurancePrice] = useState();

    const [file, setFile] = useState({});
    const [item, setItem] = useState({});

    const queryInsurance = () => {
        if (insurance) {
            setInsurance(false)
            setDeclaredPrice(null)
            setInsurancePrice(null)
            setFile({})
        } else {
            setInsurance(true)
        }
    }

    const phoneNumberMask = '+79999999999';

    function sortComparer(a, b) {
        return a.name.localeCompare(b.name)
    };

    const getDataForm = (item, categories) => {
        Order.getCountryById(item.countryIdFrom).then((response) => {
            if (response.status == 200) {
                setCountryFrom(response.data);
            } else {
                setCountryFrom('');
            }
        }).catch(error => {
            console.log(error);
        });
        Order.getCountryById(item.countryIdTo).then((response) => {
            if (response.status == 200) {
                setCountryTo(response.data);
            } else {
                setCountryTo('');
            }
        }).catch(error => {
            console.log(error);
        });
        Order.getCityById(item.cityIdFrom).then((response) => {
            if (response.status == 200) {
                setCityFrom(response.data);
            } else {
                setCityFrom('');
            }
        }).catch(error => {
            console.log(error);
        });
        Order.getCityById(item.cityIdTo).then((response) => {
            if (response.status == 200) {
                setCityTo(response.data);
            } else {
                setCityTo('');
            }
        }).catch(error => {
            console.log(error);
        });
        Order.getCargo(item.cargoId).then((response) => {
            console.log('cargo details', response.data)
            if (response.status == 200 && response.data) {
                setVolume(response.data.volume ? response.data.volume.toString() : '')
                setHeight(response.data.height ? response.data.height.toString() : '')
                setLength(response.data.length ? response.data.length.toString() : '')
                setWidth(response.data.width ? response.data.width.toString() : '')
                setCategory({
                    name: response.data.category, value: categories && categories.length ?
                        categories.filter(f => f.name == response.data.category)[0]?.value : ''
                })
                setType({ name: response.data.vehicleTypeName, value: response.data.vehicleType })
                setDetails(response.data.details)
            } else {
                setVolume('')
                setHeight('')
                setLength('')
                setWidth('')
                setCategory('')
                setType('')
                setDetails('')
            }
        }).catch(error => {
            console.log(error);
        });
        Order.getRecipient(item.recipientId)
            .then(response => {
                console.log('RECIPIENT', response.data);
                if (response.status == 200 && response.data) {
                    // setRecipient(response.data);
                    setRecipientName(response.data.name)
                    setRecipientEmail(response.data.email)
                    setRecipientPhone(response.data.phoneNumber)
                } else {
                    // setRecipient({})
                    setRecipientName('')
                    setRecipientEmail('')
                    setRecipientPhone('')
                }
            }).catch(error => {
                console.log(error)
            });
    }

    useEffect(() => {
        Order.getCountries()
            .then(response => {
                console.log('countries', response.data)
                setCountries(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        Order.getCategories()
            .then(response => {
                console.log('categories ---->', response.data)
                setCategories(response.data);
                const dataCategory = response.data
                if (orderId) {
                    Order.getOwnOrders('', 1, 1000, '', '', '', '').then((response) => {
                        console.log('Orders responce', response.data);
                        if (response.status == 200 && response.data && response.data.rows && response.data.rows.length) {
                            setItem(response.data.rows[0])
                            setWeight(response.data.rows[0].shippingHourTo ? response.data.rows[0].shippingHourTo.toString() : '')
                            getDataForm(response.data.rows[0], dataCategory)
                        } else {
                            setItem([])
                            setWeight('')
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });

        Order.getTypes()
            .then(response => {
                console.log('types', response.data)
                setTypes(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        if (orderId) {
            Order.getOrderById(orderId).then((response) => {
                console.log('QQQQQ', response.data);
                if (response.status == 200 && response.data) {
                    setAddressFrom(response.data.addressFrom)
                    setAddressTo(response.data.addressFrom)
                }
            }).catch(error => {
                console.log(error);
            });
        }

    }, []);

    useEffect(() => {
        if (step == 1) {
            if (countryFrom) {
                Order.getCities(countryFrom.id)
                    .then(response => {
                        console.log('cities', response)
                        setCities(response.data.sort(function (a, b) {
                            return a.name.localeCompare(b.name)
                        }));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        } else {
            if (countryTo) {
                Order.getCities(countryTo.id)
                    .then(response => {
                        console.log('cities', response)
                        setCities(response.data.sort(function (a, b) {
                            return a.name.localeCompare(b.name)
                        }));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

    }, [countryFrom, countryTo]);

    const createOrder = () => {

        const data = {
            "userId": user.id,
            "price": price,
            "netPrice": netPrice,
            "distance": distance,
            "countryIdFrom": countryFrom.id,
            "cityIdFrom": cityFrom.id,
            "addressFrom": addressFrom,
            "shippingDate": pickUpDate,
            "shippingHourFrom": pickUpStartTime ? Number(moment(pickUpStartTime).format("HH")) : null,
            "shippingHourTo": pickUpEndTime ? Number(moment(pickUpEndTime).format("HH")) : null,
            "recipientName": recipientName,
            "recipientEmail": recipientEmail,
            "recipientPhoneNumber": recipientPhone,
            "countryIdTo": countryTo.id,
            "cityIdTo": cityTo.id,
            "addressTo": addressTo,
            "unloadingDate": deliveryDate,
            "unloadingHourFrom": deliveryStartTime ? Number(moment(deliveryStartTime).format("HH")) : null,
            "unloadingHourTo": deliveryEndTime ? Number(moment(deliveryEndTime).format("HH")) : null,
            "details": details,
            "weight": weight.replace(',', '.'),
            "volume": volume.replace(',', '.'),
            "length": length,
            "width": width,
            "height": height,
            "category": category.value,
            "vehicleType": type.value,
            "recipientBusinessIdentificationNumber": "111111",
            "isInsurance": insurance,
            "declaredPrice": declaredPrice,
            "insurancePrice": insurancePrice,
            "copyCount": copyCount
        }

        console.log('aaa', data);

        Order.create(data)
            .then(response => {
                console.log('ORDER CREATE', response.data)
                if (response.status == 200) {
                    setRegistrationSuccess(true);
                    if (insurance && file.name) uploadFile(response.data.id)
                } else {
                    console.log('Произошла ошибка, попробуйте позже');
                    alert('Произошла ошибка, попробуйте позже')
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const uploadFile = (orderId) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", 0)
        formData.append("orderId", orderId)
        Promise.all([
            File.addOrderDoc(formData)
        ]).then(responses => {
        })
            .catch(error => {
            });
    }

    const submitCountry = (item) => {
        console.log('country item ->', item);
        if (step == 1) {
            setCountryFrom(item);
            setShowCountrySelect(false);
        } else if (step == 2) {
            setCountryTo(item);
            setShowCountrySelect(false);
        }
    }

    const submitCity = (item) => {
        console.log('city item ->', item);
        if (step == 1) {
            setCityFrom(item);
            setShowCitySelect(false);
        } else if (step == 2) {
            setCityTo(item);
            setShowCitySelect(false);
        }
    }

    const submitCategory = (item) => {
        setCategory(item);
        setShowCategorySelect(false);
    }

    const submitType = (item) => {
        setType(item);
        setShowTypeSelect(false);
    }

    const nextButton = () => {
        console.log('DATE', pickUpDate)
        if (step == 1) {
            if (pickUpDate && pickUpStartTime && pickUpEndTime && cityFrom && countryFrom && addressFrom) {
                setMinDeliveryDate(new Date(pickUpDate).setDate(new Date(pickUpDate).getDate() + 1));
                setErrorTitle();
                setStep(2);
                window.scrollTo(0, 0);
            } else setErrorTitle('Необходимо заполнить все поля');
        } else if (step == 2) {
            if (recipientName != "" && recipientEmail != "" && recipientPhone && deliveryDate && deliveryStartTime && deliveryEndTime && cityTo && countryTo && addressTo) {
                setErrorTitle();
                setStep(3);
                window.scrollTo(0, 0);
            } else setErrorTitle('Необходимо заполнить все поля');
        } else if (step == 3) {
            if (category && type && weight && volume && width && height && length && details && ((!insurance) || (insurance && declaredPrice))) {
                if (!copyCount || copyCount == '0') {
                    setErrorTitle('Поле Количество экземпляр не должен быть меньше 0');
                    return
                }
                setErrorTitle();
                if (declaredPrice) setInsurancePrice(Math.trunc((declaredPrice / 100) * 0.3))
                setStep(4);
                window.scrollTo(0, 0);
                setCalculationLoading(true);
                const data = {
                    "cityIdFrom": cityFrom.id,
                    "cityIdTo": cityTo.id,
                    "weight": weight.replace(',', '.'),
                    "volume": volume.replace(',', '.'),
                    "transportType": type.value,
                    "cargoCategory": category.value,
                };

                Order.getOrderPrice(data)
                    .then(response => {
                        console.log('CALC RESPONSE', response.data);
                    
                        if (response.status == 200) {

                            setPrice(response.data.price);
                            setNetPrice(response.data.netPrice);
                            setDistance(response.data.distance);
                            setCalculationLoading(false);
                        } else {
                            console.log('Произошла ошибка, попробуйте позже');
                            alert('Произошла ошибка, попробуйте позже')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });

            } else setErrorTitle('Необходимо заполнить все поля');
        } else if (step == 4) {
            if (distance, price, netPrice) createOrder();
        }

    }

    const prevButton = () => {
        if (step == 1) {
            navigate('/main');
        } else {
            setStep(step - 1);
        }
    }

    const [minPickDate, setMinPickDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const [minDeliveryDate, setMinDeliveryDate] = useState();
    // const [minDeliveryDate, setMinDeliveryDate] = useState(new Date(pickUpDate).setDate(new Date().getDate(pickUpDate) + 1)); 


    const renderStep1 = () => {
        return (
            <div>
                <div style={{ fontSize: '18px', paddingBottom: '16px' }}>Данные отправителя</div>
                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Название организации</Form.Label>
                    <Form.Control disabled={true} value={user ? user.name : ''} style={{ fontSize: '14px' }} />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Контактный телефон</Form.Label>
                    <Form.Control disabled={true} value={user ? user.phoneNumber : ''} style={{ fontSize: '14px' }} />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Электронная почта</Form.Label>
                    <Form.Control disabled={true} value={user ? user.email : ''} style={{ fontSize: '14px' }} />
                </Form.Group>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Страна загрузки груза</Form.Label>
                    <div onClick={() => setShowCountrySelect(true)} style={{
                        color: `${countryFrom ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {countryFrom ? countryFrom.name : 'Выберите страну'}
                    </div>
                </div>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Город загрузки груза</Form.Label>
                    <div onClick={() => {
                        countryFrom ? setShowCitySelect(true) : null
                    }} style={{
                        color: `${cityFrom ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {cityFrom ? cityFrom.name : 'Выберите город'}
                    </div>
                </div>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Адрес загрузки</Form.Label>
                    <Form.Control value={addressFrom} onChange={(event) => setAddressFrom(event.target.value)}
                        style={{ fontSize: '14px' }} />
                </Form.Group>

                <div className='row'>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата погрузки</Form.Label>
                            <DatePicker
                                selected={pickUpDate}
                                minDate={minPickDate}
                                onChange={(date) => setPickUpDate(date)}
                                dateFormat="dd.MM.yyyy"
                                locale={ru}
                                placeholderText="Укажите дату"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Время от</Form.Label>
                            <DatePicker
                                selected={pickUpStartTime}
                                onChange={(date) => setPickUpStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                locale={ru}
                                placeholderText="Укажите время"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Время до</Form.Label>
                            <DatePicker
                                selected={pickUpEndTime}
                                onChange={(date) => setPickUpEndTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                locale={ru}
                                placeholderText="Укажите время"
                            />
                        </Form.Group>
                    </div>
                </div>

            </div>
        );
    }

    const renderStep2 = () => {
        return (
            <div>
                <div style={{ fontSize: '18px', paddingBottom: '16px' }}>Данные получателя</div>
                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Название организации</Form.Label>
                    <Form.Control type="text" placeholder="Введите название" value={recipientName}
                        onChange={(event) => setRecipientName(event.target.value)}
                        style={{ fontSize: '14px' }} />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Контактный телефон</Form.Label>
                    <InputMask
                        value={recipientPhone}
                        maskChar={null}
                        mask={phoneNumberMask}
                        onChange={(event) => setRecipientPhone(event.target.value)}
                        disabled={false}
                    >
                        {(inputProps) => (
                            <Form.Control {...inputProps} type="text" placeholder="Введите телефон"
                                style={{ fontSize: '14px' }} />
                        )}
                    </InputMask>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Электронная почта</Form.Label>
                    <Form.Control type="text" placeholder="Введите адрес эл. почты" value={recipientEmail}
                        onChange={(event) => setRecipientEmail(event.target.value)}
                        style={{ fontSize: '14px' }} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Страна доставки груза</Form.Label>
                    <div onClick={() => setShowCountrySelect(true)} style={{
                        color: `${countryTo ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {countryTo ? countryTo.name : 'Выберите страну'}
                    </div>
                </div>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Город доставки груза</Form.Label>
                    <div onClick={() => {
                        countryTo ? setShowCitySelect(true) : null
                    }} style={{
                        color: `${cityTo ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {cityTo ? cityTo.name : 'Выберите город'}

                    </div>
                </div>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Адрес доставки</Form.Label>
                    <Form.Control value={addressTo} onChange={(event) => setAddressTo(event.target.value)}
                        style={{ fontSize: '14px' }} />
                </Form.Group>

                <div className='row'>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Дата доставки</Form.Label>
                            <DatePicker
                                selected={deliveryDate}
                                minDate={minDeliveryDate}
                                onChange={(date) => setDeliveryDate(date)}
                                dateFormat="dd.MM.yyyy"
                                locale={ru}
                                placeholderText="Укажите дату"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Время от</Form.Label>
                            <DatePicker
                                selected={deliveryStartTime}
                                onChange={(date) => setDeliveryStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                locale={ru}
                                placeholderText="Укажите время"
                            />
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Время до</Form.Label>
                            <DatePicker
                                selected={deliveryEndTime}
                                onChange={(date) => setDeliveryEndTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                locale={ru}
                                placeholderText="Укажите время"
                            />
                        </Form.Group>
                    </div>
                </div>

            </div>
        );
    }

    const renderStep3 = () => {
        return (
            <div>
                <div style={{ fontSize: '18px', paddingBottom: '16px' }}>Детали груза</div>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Вес</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="number" placeholder="Введите вес" value={weight}
                            onChange={(event) => setWeight(event.target.value)} style={{ fontSize: '14px' }} />
                        <div style={{ marginLeft: '12px', fontSize: '15px' }}>тн.</div>
                    </div>
                </Form.Group>


                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Объем</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="number" placeholder="Введите объем" value={volume}
                            onChange={(event) => setVolume(event.target.value)} style={{ fontSize: '14px' }} />
                        <div style={{ marginLeft: '12px', fontSize: '15px' }}>м<sup>3</sup></div>
                    </div>
                </Form.Group>

                <div className='row'>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Высота</Form.Label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Control type="number" placeholder="Введите высоту" value={height}
                                    onChange={(event) => setHeight(event.target.value)}
                                    style={{ fontSize: '14px' }} />
                                <div style={{ marginLeft: '12px', fontSize: '15px' }}>см</div>
                            </div>
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Длина</Form.Label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Control type="number" placeholder="Введите длину" value={length}
                                    onChange={(event) => setLength(event.target.value)}
                                    style={{ fontSize: '14px' }} />
                                <div style={{ marginLeft: '12px', fontSize: '15px' }}>см</div>
                            </div>
                        </Form.Group>
                    </div>
                    <div className='col-4'>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Ширина</Form.Label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Control type="number" placeholder="Введите ширину" value={width}
                                    onChange={(event) => setWidth(event.target.value)}
                                    style={{ fontSize: '14px' }} />
                                <div style={{ marginLeft: '12px', fontSize: '15px' }}>см</div>
                            </div>
                        </Form.Group>
                    </div>
                </div>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Категория груза</Form.Label>
                    <div onClick={() => setShowCategorySelect(true)} style={{
                        color: `${category ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {category ? category.name : 'Выберите категория'}
                    </div>
                </div>

                <div className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Тип транспорта</Form.Label>
                    <div onClick={() => setShowTypeSelect(true)} style={{
                        color: `${type ? '#212529' : '#A3ACB6'}`,
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'
                    }}>
                        {type ? type.name : 'Выберите тип'}
                    </div>
                </div>

                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Детали груза</Form.Label>
                    <Form.Control as="textarea" placeholder="Введите детали" rows={2} value={details}
                        onChange={(event) => setDetails(event.target.value)} style={{ fontSize: '14px' }} />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Страховка</Form.Label>
                    <Form.Check style={{ cursor: 'pointer' }} type="checkbox" checked={insurance} value={insurance}
                        onClick={queryInsurance} id={`default-checkbox`}
                        label="Включить страховку (составит 0,30% от объявленной стоимости груза)" />
                </Form.Group>
                {
                    insurance ?
                        <div>
                            <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Объявленная
                                    стоимость</Form.Label>
                                <Form.Control type="number" placeholder="0 ₸" value={declaredPrice}
                                    onChange={(event) => setDeclaredPrice(event.target.value)}
                                    style={{ fontSize: '14px' }} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Инвойс, для подтверждения
                                    объявленной стоимости груза (необязательно)</Form.Label>
                                <div style={{ width: '100%', display: 'flex', marginTop: '15px' }}>
                                    <label className="custom-file-upload" style={{ marginTop: '-15px' }}>
                                        <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                                        <div style={{
                                            backgroundColor: '#E5EAF0',
                                            padding: '6px 7px 7px',
                                            borderRadius: '7px'
                                        }}>
                                            Прикрепить файл
                                        </div>
                                    </label>
                                    {
                                        file.name ?
                                            <div style={{
                                                color: '#A3ACB6',
                                                marginLeft: '20px',
                                                marginTop: '-10px'
                                            }}>{file && `${file.name}`}</div>
                                            :
                                            <div style={{ color: '#A3ACB6', marginLeft: '20px', marginTop: '-10px' }}>Файл
                                                не выбран</div>
                                    }
                                </div>
                            </Form.Group>
                        </div>
                        : <span></span>
                }
                <Form.Group className="mb-2">
                    <Form.Label style={{ color: '#A3ACB6', fontSize: '12px' }}>Количество экземпляр</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control type="number" placeholder="Введите высоту" value={copyCount}
                            onChange={(event) => setCopyCount(event.target.value)}
                            style={{ fontSize: '14px' }} />
                        {/* <div style={{marginLeft: '12px', fontSize: '15px'}}>см</div> */}
                    </div>
                </Form.Group>
            </div>
        );
    }

    const renderStep4 = () => {

        console.log('Category and type', category, type);

        if (calculationLoading) {
            return (
                <div style={{ padding: '32px', textAlign: 'center' }}>Подсчет стоимости..</div>
            );
        } else {
            return (
                <SkeletonTheme color="#e5ebf2" highlightColor="#f0f4f7">
                    <div style={{ fontSize: '18px', paddingBottom: '16px' }}>Стоимость доставки</div>
                    {/* <Form.Group className="mb-2" >
                        <Form.Label style={{ color: '#A3ACB6', fontSize: '12px', marginBottom: '0' }}>Расстояние</Form.Label>
                        {
                            distance 
                            ?
                            <div style={{ fontSize: '18px' }}>{distance} км</div>
                            :
                            <div style={{ fontSize: '18px' }}><Skeleton width="100px" /></div>
                        }
                    </Form.Group> */}
                    <Form.Group className="mb-2">
                        <Form.Label style={{ color: '#A3ACB6', fontSize: '12px', marginBottom: '0' }}>Стоимость
                            доставки</Form.Label>
                        {
                            price
                                ?
                                <div style={{ fontSize: '30px', fontFamily: 'Gerbera-Medium' }}>{price} ₸</div>
                                :
                                <div style={{ fontSize: '30px' }}><Skeleton width="120px" /></div>
                        }
                    </Form.Group>
                    {
                        insurancePrice ?
                            <Form.Group className="mb-2">
                                <Form.Label style={{
                                    color: '#A3ACB6',
                                    fontSize: '12px',
                                    marginBottom: '0'
                                }}>Страховка</Form.Label>
                                <div style={{ fontSize: '18px' }}>{insurancePrice} ₸</div>
                            </Form.Group>
                            : <span></span>
                    }
                    {
                        insurancePrice ?
                            <Form.Group className="mb-2">
                                <Form.Label
                                    style={{ color: '#A3ACB6', fontSize: '12px', marginBottom: '0' }}>Итого</Form.Label>
                                <div style={{ fontSize: '18px' }}>{insurancePrice + price} ₸</div>
                            </Form.Group>
                            : <span></span>
                    }
                </SkeletonTheme>
            );
        }


    }

    const renderForm = () => {
        switch (step) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
        }
    }

    const renderControlButtons = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <button onClick={prevButton} style={{
                        boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
                        border: 'none',
                        backgroundColor: '#ffffff',
                        padding: '12px 48px',
                        borderRadius: '12px'
                    }}>{step == 1 ? "Отменить" : "Назад"}</button>
                </div>
                <div>
                    <button onClick={nextButton} style={{
                        backgroundColor: '#A3195B',
                        padding: '12px 48px',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#ffffff'
                    }}>{step == 4 ? "Подтвердить" : "Далее"}</button>
                </div>
            </div>
        );
    }

    const renderOrderNavigation = () => {

        const list = ORDER_NAVIGATION.map((item, index) => {
            return (
                <>
                    {index == 0 ? null : <div style={{
                        width: '50px',
                        border: `${item.value <= step ? '1px solid #13B65E' : '1px dashed #A3ACB6'}`,
                        marginLeft: '12px',
                        marginTop: '4px'
                    }} key={index}></div>}
                    {
                        item.value < step
                            ?
                            <div style={{
                                width: '40px',
                                height: '40px',
                                color: '#ffffff',
                                fontWeight: '700',
                                backgroundColor: '#5bb47f',
                                borderRadius: '12px',
                                textAlign: 'center',
                                paddingTop: '8px',
                                marginLeft: `${index == 0 ? '0' : '12px'}`
                            }}>
                                <img src="/icons/tick.svg" height="12px" />
                            </div>
                            :
                            <div style={{
                                width: '40px',
                                height: '40px',
                                boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
                                color: `${step == item.value ? '#ffffff' : '#A3ACB6'}`,
                                fontWeight: '700',
                                backgroundColor: `${step == item.value ? '#A3195B' : '#ffffff'}`,
                                borderRadius: '12px',
                                textAlign: 'center',
                                paddingTop: '8px',
                                marginLeft: `${index == 0 ? '0' : '12px'}`
                            }}>
                                {item.value}
                            </div>
                    }

                    <div style={{
                        fontSize: '15px',
                        marginLeft: '12px',
                        color: `${item.value != step ? (item.value < step ? '#13B65E' : '#A3ACB6') : '#A3195B'}`,
                        fontWeight: '600'
                    }}>{item.title}</div>
                </>
            );

        });

        return <div
            style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{list}</div>
    }

    return (
        <>
            <div style={{ padding: '24px 24px 32px' }}>
                <div style={{ fontSize: '26px', fontFamily: 'Gerbera-Medium' }}>Создание нового заказа</div>
                {
                    registrationSuccess
                        ?
                        <div style={{
                            marginTop: '24px',
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            padding: '38px 44px',
                            textAlign: 'center'
                        }}>
                            <div>
                                <div style={{
                                    display: 'inline-block',
                                    backgroundColor: 'rgba(19, 182, 94, 0.1)',
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%'
                                }}>
                                    <div style={{ height: '20px', marginTop: '28px' }}>
                                        <img src="/icons/tick-success.svg" height="22px" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ fontSize: '24px', fontFamily: 'Gerbera-Bold', marginTop: '24px' }}>Заказ успешно
                                создан!
                            </div>
                            <div style={{
                                fontSize: '15px',
                                marginTop: '16px',
                                textAlign: 'center',
                                color: '#A3ACB6'
                            }}>Он будет опубликован и виден водителям после того как пройдет модерацию
                            </div>
                            <div style={{
                                fontSize: '15px',
                                marginTop: '2px',
                                textAlign: 'center',
                                color: '#A3ACB6'
                            }}>Вы можете отследить статус заказа в разделе Заказы
                            </div>

                            <Link to="/main" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    fontSize: '15px',
                                    marginTop: '16px',
                                    padding: '8px',
                                    color: '#A3195B'
                                }}>Перейти в заказы
                                </div>
                            </Link>
                        </div>
                        :
                        <>
                            {renderOrderNavigation()}
                            <div className='row' style={{ marginTop: '30px' }}>
                                <div className='col-2'></div>
                                <div className='col-8'>
                                    <div style={{
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
                                        borderRadius: '16px',
                                        padding: '24px'
                                    }}>
                                        {renderForm()}
                                    </div>
                                    {errorTitle ? <div style={{
                                        color: 'red',
                                        marginTop: '16px',
                                        textAlign: 'center',
                                        fontSize: '14px'
                                    }}>{errorTitle}</div> : null}
                                    <div className='mt-4'>{renderControlButtons()}</div>
                                </div>
                                <div className='col-2'></div>
                            </div>
                        </>
                }

            </div>
            {
                showCountrySelect &&
                <SelectModal
                    onClose={() => setShowCountrySelect(false)}
                    header="Укажите страну"
                    options={countries}
                    onSubmit={(item) => submitCountry(item)}
                />
            }
            {
                showCitySelect &&
                <SelectModal
                    onClose={() => setShowCitySelect(false)}
                    header="Укажите город"
                    options={cities}
                    onSubmit={(item) => submitCity(item)}
                    search={true}
                    searchTitle="Поиск по названию города"
                />
            }
            {
                showCategorySelect &&
                <SelectModal
                    onClose={() => setShowCategorySelect(false)}
                    header="Укажите категорию груза"
                    options={categories}
                    onSubmit={(item) => submitCategory(item)}
                />
            }
            {
                showTypeSelect &&
                <SelectModal
                    onClose={() => setShowTypeSelect(false)}
                    header="Укажите тип транспорта"
                    options={types}
                    onSubmit={(item) => submitType(item)}
                />
            }
        </>
    );
}

export default OrderCreatePage;
