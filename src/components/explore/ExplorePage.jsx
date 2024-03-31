import React, {useEffect, useState} from 'react';
import {Order} from '../../services';
import {setNavbarState} from '../../store/actions/navigationAction';
import {useDispatch} from 'react-redux';
import OrderListItem from '../order/order-item/OrderListItem';
import EmptyOrderListItem from '../order/order-item/EmptyOrderLIstItem';
import OrderInfoModal from '../order/info-modal/OrderInfoModal';
import Form from 'react-bootstrap/Form';
import SelectModal from '../custom/SelectModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import moment from 'moment';
import Pagination from 'react-responsive-pagination';

const ExplorePage = () => {

    const dispatch = useDispatch();

    const [orders, setOrders] = useState();
    const [orderQuantity, setOrdersQuantity] = useState();
    const [activeOrder, setActiveOrder] = useState();

    // FILTERS
    const [countryFrom, setCountryFrom] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [shippingDate, setShippingDate] = useState();
    const [countryTo, setCountryTo] = useState();
    const [cityTo, setCityTo] = useState();
    const [cargoCategory, setCargoCategory] = useState();
    const [vehicleType, setVehicleType] = useState();
    const [minWeight, setMinWeight] = useState();
    const [maxWeight, setMaxWeight] = useState();

    const [showCountryFromSelect, setShowCountryFromSelect] = useState(false);
    const [showCountryToSelect, setShowCountryToSelect] = useState(false);
    const [showCityFromSelect, setShowCityFromSelect] = useState(false);
    const [showCityToSelect, setShowCityToSelect] = useState(false);
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [showTypeSelect, setShowTypeSelect] = useState(false);

    const [countries, setCountries] = useState();
    const [citiesFrom, setCitiesFrom] = useState();
    const [citiesTo, setCitiesTo] = useState();
    const [categories, setCategories] = useState();
    const [types, setTypes] = useState();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [totalPages, setTotalPages] = useState();

    const emptyArr = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        dispatch(setNavbarState({activeNavId: '2'}));
    }, []);

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
                console.log('categories', response.data)
                setCategories(response.data);
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

    }, []);

    useEffect(() => {
        if (countryFrom) {
            Order.getCities(countryFrom.id)
                .then(response => {
                    console.log('cities from', response)
                    setCitiesFrom(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [countryFrom]);

    useEffect(() => {
        if (countryTo) {
            Order.getCities(countryTo.id)
                .then(response => {
                    console.log('cities from', response)
                    setCitiesTo(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [countryTo]);

    const getOrders = () => {
        setOrders();
        Order.getAllOrderList(
            "published",
            countryFrom ? countryFrom.id : '',
            cityFrom ? cityFrom.id : '',
            shippingDate ? moment(shippingDate).format("dd.mm.yyyy") : '',
            countryTo ? countryTo.id : '',
            cityTo ? cityTo.id : '',
            cargoCategory ? cargoCategory : '',
            vehicleType ? vehicleType : '',
            minWeight ? minWeight : 0,
            maxWeight ? maxWeight : 0,
            currentPage,
            limit
        ).then((response) => {
            console.log('Orders responce', response.data);
            // if (response.status == 200) {
            //     setOrders(response.data)
            // } else setOrders([]);

            if (response.status == 200) {
                setOrders(response.data.rows);
                setTotalPages(Math.ceil(response.data.total / limit));
            } else setOrders([]);


        }).catch(error => {
            console.log(error);
        });
    }

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    }

    useEffect(() => {
        getOrders();

        // Order.getAllOrdersQuantity("published").then((response) => {
        //     console.log('Orders quantity responce', response.data);
        //     if(response.status == 200) {
        //         if(response.data.quantity > 0) {
        //             setOrdersQuantity(response.data.quantity) 
        //         }else setOrdersQuantity('empty') 

        //     }else setOrdersQuantity('empty') 
        // }).catch(error => {
        //     console.log(error);
        // });

    }, [currentPage]);

    const clearFilter = () => {
        setCountryFrom();
        setCityFrom();
        setCountryTo();
        setCityTo();
        setShippingDate();
        setCargoCategory();
        setVehicleType();
        setMinWeight();
        setMaxWeight();
    }

    const renderFilter = () => {
        return (
            <div style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 6px -2px rgb(228, 228, 228)',
                borderRadius: '16px',
                padding: '12px 16px 16px'
            }}>
                <div style={{fontSize: '16px'}}>Фильтр заказов</div>
                <div className='row' style={{marginTop: '3px'}}>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Страна отправки груза</Form.Label>
                            <div onClick={() => setShowCountryFromSelect(true)} style={{
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
                    </div>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Город отправки груза</Form.Label>
                            <div onClick={() => countryFrom ? setShowCityFromSelect(true) : null} style={{
                                color: `${cityFrom ? '#212529' : '#A3ACB6'}`,
                                fontSize: '14px',
                                backgroundColor: `${countryFrom ? '#ffffff' : '#e9ecef'}`,
                                padding: '0.375rem 0.75rem',
                                border: '1px solid #ced4da',
                                borderRadius: '0.375rem'
                            }}>
                                {cityFrom ? cityFrom.name : 'Выберите город'}
                            </div>
                        </div>
                    </div>


                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Страна доставки груза</Form.Label>
                            <div onClick={() => setShowCountryToSelect(true)} style={{
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
                    </div>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Город доставки груза</Form.Label>
                            <div onClick={() => countryTo ? setShowCityToSelect(true) : null} style={{
                                color: `${cityTo ? '#212529' : '#A3ACB6'}`,
                                fontSize: '14px',
                                backgroundColor: `${countryTo ? '#ffffff' : '#e9ecef'}`,
                                padding: '0.375rem 0.75rem',
                                border: '1px solid #ced4da',
                                borderRadius: '0.375rem'
                            }}>
                                {cityTo ? cityTo.name : 'Выберите город'}
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Дата забора груза</Form.Label>
                            <DatePicker
                                selected={shippingDate}
                                onChange={(date) => setShippingDate(date)}
                                dateFormat="dd.MM.yyyy"
                                locale={ru}
                                placeholderText="Укажите дату"
                            />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Категория груза</Form.Label>
                            <div onClick={() => setShowCategorySelect(true)} style={{
                                color: `${cargoCategory ? '#212529' : '#A3ACB6'}`,
                                fontSize: '14px',
                                backgroundColor: '#ffffff',
                                padding: '0.375rem 0.75rem',
                                border: '1px solid #ced4da',
                                borderRadius: '0.375rem'
                            }}>
                                {cargoCategory ? cargoCategory.name : 'Выберите категорию'}
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="mb-2">
                            <Form.Label style={{color: '#A3ACB6', fontSize: '12px'}}>Тип транспорта</Form.Label>
                            <div onClick={() => setShowTypeSelect(true)} style={{
                                color: `${vehicleType ? '#212529' : '#A3ACB6'}`,
                                fontSize: '14px',
                                backgroundColor: '#ffffff',
                                padding: '0.375rem 0.75rem',
                                border: '1px solid #ced4da',
                                borderRadius: '0.375rem'
                            }}>
                                {vehicleType ? vehicleType.name : 'Выберите тип'}
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div style={{display: 'flex'}}>
                            <div style={{flex: '1', marginRight: '12px'}}>
                                <Form.Group className="mb-2">
                                    <Form.Label style={{color: '#A3ACB6', fontSize: '10px'}}>Вес от</Form.Label>
                                    <Form.Control type="text" placeholder="Введите вес" value={minWeight}
                                                  onChange={(event) => setMinWeight(event.target.value)}
                                                  style={{fontSize: '14px'}}/>
                                </Form.Group>
                            </div>
                            <div style={{flex: '1', marginLeft: '12px'}}>
                                <Form.Group className="mb-2">
                                    <Form.Label style={{color: '#A3ACB6', fontSize: '10px'}}>Вес по</Form.Label>
                                    <Form.Control type="text" placeholder="Введите вес" value={maxWeight}
                                                  onChange={(event) => setMaxWeight(event.target.value)}
                                                  style={{fontSize: '14px'}}/>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', marginTop: '12px', flexDirection: 'row-reverse'}}>
                    <div>
                        <div onClick={getOrders} style={{
                            cursor: 'pointer',
                            backgroundColor: '#A3195B',
                            color: '#ffffff',
                            padding: '8px 16px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            marginLeft: '16px'
                        }}>Применить фильтр
                        </div>
                    </div>
                    <div>
                        <div onClick={clearFilter} style={{
                            cursor: 'pointer',
                            backgroundColor: '#A3ACB6',
                            color: '#ffffff',
                            padding: '8px 16px',
                            fontSize: '14px',
                            borderRadius: '8px',
                            marginLeft: '16px'
                        }}>Очистить фильтр
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderList = () => {
        if (orders) {
            if (orders.length > 0) {
                const list = orders.map((item, idx) => {
                    return <OrderListItem item={item} selectOrder={(item) => setActiveOrder(item)} key={idx} />
                });

                return list;
            } else {
                return (
                    <div>
                        <div style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            padding: '12vh',
                            textAlign: 'center',
                            color: '#A3ACB6'
                        }}>
                            <div>
                                <img src="/icons/no-orders.svg" height="60px" style={{opacity: '0.5'}}/>
                            </div>
                            <div style={{marginTop: '24px'}}>Доступных заказов пока нет</div>
                        </div>
                    </div>
                );
            }

        } else {
            const list = emptyArr.map((item, idx) => {
                return <EmptyOrderListItem key={idx} />
            });

            return list
        }
    }

    return (
        <>
            <div style={{padding: '20px 24px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{fontSize: '26px', fontFamily: 'Gerbera-Medium'}}>Поиск заказов</div>
                </div>
                <div style={{marginTop: '20px'}}>{renderFilter()}</div>
                <div className='row' style={{marginTop: '12px'}}>
                    {renderList()}
                </div>
                <div className="row">
                    {
                        orders &&
                        <Pagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={page => handlePageChange(page)}
                        />
                    }
                </div>

            </div>
            {activeOrder && <OrderInfoModal orderId={activeOrder?.id} onClose={() => setActiveOrder()}/>}
            {
                showCountryFromSelect &&
                <SelectModal
                    onClose={() => setShowCountryFromSelect(false)}
                    header="Укажите страну"
                    options={countries}
                    onSubmit={(item) => {
                        setCountryFrom(item);
                        setShowCountryFromSelect(false)
                    }}
                />
            }
            {
                showCityFromSelect &&
                <SelectModal
                    onClose={() => setShowCityFromSelect(false)}
                    header="Укажите город"
                    options={citiesFrom}
                    onSubmit={(item) => {
                        setCityFrom(item);
                        setShowCityFromSelect(false)
                    }}
                />
            }
            {
                showCountryToSelect &&
                <SelectModal
                    onClose={() => setShowCountryToSelect(false)}
                    header="Укажите страну"
                    options={countries}
                    onSubmit={(item) => {
                        setCountryTo(item);
                        setShowCountryToSelect(false)
                    }}
                />
            }
            {
                showCityToSelect &&
                <SelectModal
                    onClose={() => setShowCityToSelect(false)}
                    header="Укажите город"
                    options={citiesTo}
                    onSubmit={(item) => {
                        setCityTo(item);
                        setShowCityToSelect(false)
                    }}
                />
            }
            {
                showCategorySelect &&
                <SelectModal
                    onClose={() => setShowCategorySelect(false)}
                    header="Укажите категорию груза"
                    options={categories}
                    onSubmit={(item) => {
                        setCargoCategory(item);
                        setShowCategorySelect(false)
                    }}
                />
            }
            {
                showTypeSelect &&
                <SelectModal
                    onClose={() => setShowTypeSelect(false)}
                    header="Укажите тип транспорта"
                    options={types}
                    onSubmit={(item) => {
                        setVehicleType(item);
                        setShowTypeSelect(false)
                    }}
                />
            }
        </>
    );
}

export default ExplorePage;
