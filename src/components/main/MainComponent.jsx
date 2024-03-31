import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import OrderInfoModal from '../order/info-modal/OrderInfoModal';
import MenuMadal from '../order/info/MenuMadal';
import OrderEditeModal from '../order/info/OrderEditeModal';
import OrderListItemTable from '../order/order-item/OrderListItemTable';
import { setNavbarState } from '../../store/actions/navigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { Order } from '../../services';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import OrderListItem from '../order/order-item/OrderListItem';
import EmptyOrderListItem from '../order/order-item/EmptyOrderLIstItem';
import { CLIENT_ORDER_STATUSES, EXPEDITOR_ORDER_STATUSES, ACTIVE_DATA } from '../../mock';
import Pagination from "react-responsive-pagination";
import moment from 'moment';
import CancelApp from '../order/info/CancelApp';
import InfoMadal from '../order/info/InfoMadal';
import OrderCopyModal from '../order/info/OrderCopyModal';

const STATUS_TITLE2 = {
    'all': 'Все заказы',
    'moderation': 'На модерации',
    'awaitingpayment': 'Ожидает оплаты',
    'published': 'Опубликован',
    'booked': 'Забронирован',
    'confirmed': 'Подтвержден',
    'inprocess': 'В пути',
    'waitingforcompletion': 'Ожидает завершения',
    'completed': 'Завершен'
}
// 'published': 'Опубликован',
// 'booked': 'Забронирован',
// 'confirmed': 'Подтвержден',
const STATUS_TITLE = {
    'all': 'Все заказы',
    'moderation': 'На модерации',
    'awaitingpayment': 'Ожидает оплаты',
    'awaiting-loading': 'Ожидает погрузки',
    'inprocess': 'В пути',
    // 'waitingforcompletion': 'Ожидает завершения',
    'completed': 'Завершен',
    'canceled': 'Отменен'
}


const MainComponent = () => {

    const emptyArr = [1, 2, 3];
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showOrderInfoModal, setShowOrderInfoModal] = useState(false);
    const [status, setStatus] = useState('all');
    const [orders, setOrders] = useState();
    const [activeOrder, setActiveOrder] = useState();
    const [sort, setSort] = useState('status');

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [isTable, setIsTable] = useState(true);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [isFilter, setIsFilter] = useState(false);

    const [orderNo, setOrderNo] = useState('');
    // const [createAt, setCreateAt] = useState('');
    const [recipient, setRecipient] = useState('');
    const [driver, setDriver] = useState('');
    const [openEditeMadal, setOpenEditeMadal] = useState();
    const [openCopyMadal, setOpenCopyMadal] = useState();
    const [openCancalMadal, setOpenCancalMadal] = useState();
    const [infoMadal, setInfoMadal] = useState(false);
    const [infoCopyMadal, setInfoCopyMadal] = useState(false);
    const [infoMadalCancal, setInfoMadalCancal] = useState(false);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [isRenderTable, setIsRenderTable] = useState();

    const [total, setTotal] = useState();

    function onChangeHandler(value) {
        setDateStart(value[0]);
        setDateEnd(value[1]);
        setCurrentPage(1);
        getOrder('all', orderNo, value[0], value[1], recipient, driver)
    }

    useEffect(() => {
        console.log('curr user', user);
        dispatch(setNavbarState({ activeNavId: '1' }));
    }, []);

    useEffect(() => {
        getOrder('all', orderNo, dateStart, dateEnd, recipient, driver)
    }, [user, status, currentPage, sort]);

    const clearFilter = () => {
        setOrderNo('');
        setDateStart('');
        setDateEnd('');
        setRecipient('');
        setDriver('');
        setStatus('');
        setCurrentPage(1);
        getOrder('all', '', '', '', '')
    }

    const searchOrderNo = (value) => {

        setOrderNo(value);
        if (value && value.length && value.length >= 3) {
            setCurrentPage(1);
            getOrder('all', value, dateStart, dateEnd, recipient, driver)
        } else if (!value || !value.length) {
            setCurrentPage(1);
            getOrder('all', '', dateStart, dateEnd, recipient, driver)
        }
    }

    const searchCreateAt = (value) => {
        setCreateAt(value)
        if (value) {
            getOrder('all', orderNo, moment(value).format("YYYY-MM-DD"), recipient, driver)
        } else if (!value || !value.length) {
            getOrder('all', orderNo, '', recipient, driver)
        }
    }

    const searchRecipient = (value) => {
        setRecipient(value);
        if (value && value.length && value.length >= 3) {
            setCurrentPage(1);
            getOrder('all', orderNo, dateStart, dateEnd, value, driver)
        } else if (!value || !value.length) {
            setCurrentPage(1);
            getOrder('all', orderNo, dateStart, dateEnd, '', driver)
        }
    }
    const searchDriver = (value) => {
        setDriver(value);
        if (value && value.length && value.length >= 3) {
            setCurrentPage(1);
            getOrder('all', orderNo, dateStart, dateEnd, recipient, value)
        } else if (!value || !value.length) {
            setCurrentPage(1)
            getOrder('all', orderNo, dateStart, dateEnd, recipient, '')
        }
    }

    const getOrder = (type, orderNo, dateStart, dateEnd, recipient, driver) => {
        if (user) {
            setOrders([]);
            if (user.type === "Expeditor") {
                Order.getCompanyOrders(user.id, {status:status === 'all' ? '' : status, page: 1 }).then((response) => {
                    console.log('Orders responce', response.data);
                    if (response.status == 200) {

                        setOrders(response.data)
                        if (type == 'select') {
                            setIsSelectAll(true)
                        } else {
                            setIsSelectAll(false)
                        }
                    } else {
                        setIsSelectAll(false)
                        setOrders([]);
                    }
                }).catch(error => {
                    setIsSelectAll(false)
                    console.log(error);
                })
            } else {
                Order.getOwnOrders(status === 'all' ? '' : status, currentPage, limit, sort, orderNo, dateStart ? moment(dateStart).format("YYYY-MM-DD") : '', dateEnd ? moment(dateEnd).format("YYYY-MM-DD") : '', recipient, driver).then((response) => {
                    console.log('Orders responce', response.data);
                    if (response.status == 200) {
                        if (type == 'select') {
                            setIsSelectAll(true)
                            let list = response.data.rows
                            const selectList = JSON.parse(localStorage.getItem('selectList')) ? JSON.parse(localStorage.getItem('selectList')) : []
                            response.data.rows = list.filter(f => selectList.includes(f.number));
                        } else {
                            setIsSelectAll(false)
                        }
                        response.data.rows.map(item => {
                            item.isOpenMenu = false
                        })
                        setOrders(response.data.rows);
                        setTotal(response.data.total)
                        setTotalPages(Math.ceil(response.data.total / limit));
                    } else {
                        setIsSelectAll(false)
                        setOrders([]);
                    }
                }).catch(error => {
                    setIsSelectAll(false)
                    console.log(error);
                })
            }
        }
    }

    const selectMenuMadal = (item) => {
        orders.map(i => {
            if (i.id == item.id) {
                i.isOpenMenu = item.isOpenMenu
            } else {
                i.isOpenMenu = false
            }
        })
        setIsRenderTable(item)
        setTimeout(() => {
            setIsRenderTable()
        }, 10);
    }

    const openSelectCopy = (item) => {
        console.log('AAAA: ', item)
        navigate({
            pathname: '/order-info',
            search: `id=${item.id}`,
        });
    }

    // const openEditeMadal = (item) =>{ 
    //     console.log('EDITE: ', item)
    // }

    const renderStatus = () => {
        if (user) {
            const statuses = user.type === "Expeditor" ? EXPEDITOR_ORDER_STATUSES : CLIENT_ORDER_STATUSES;
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <div style={{fontSize: '15px', color: '#A3ACB6'}}>Статус заказа:</div> */}
                    <div>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={e => {
                                setStatus(e.target.value)
                            }}
                            style={{
                                fontSize: '14px',
                                border: 'none',
                                boxShadow: '0 2px 4px -2px rgb(228, 228, 228)',
                                width: '130px',
                                height: '33px'
                            }}
                        >
                            {statuses.map((item, idx) => {
                                return (
                                    <option key={idx} value={item}>{STATUS_TITLE[item]}</option>
                                );
                            })}
                        </Form.Control>
                    </div>
                </div>
            );
        }
    }

    const renderActive = () => {
        if (user) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Form.Control
                            as="select"
                            value={sort}
                            onChange={e => {
                                setSort(e.target.value)
                            }}
                            style={{
                                fontSize: '14px',
                                border: 'none',
                                boxShadow: '0 2px 4px -2px rgb(228, 228, 228)',
                                width: '178px',
                                alignItems: 'center',
                                height: '33px'
                            }}
                        >
                            {ACTIVE_DATA.map(item => {
                                return (
                                    <option key={item.code} value={item.code}>{item.name}</option>
                                );
                            })}
                        </Form.Control>
                    </div>
                </div>
            );
        }
    }

    const renderList = () => {
        if (orders) {
            if (orders.length > 0 && isTable) {
                const list = orders.map(item => {
                    return <OrderListItemTable key={item.id} item={item}
                        selectOrder={(item) => setActiveOrder(item)}
                        //    selectCopy={(item) => openSelectCopy(item)}
                        editeOrder={(item) => setOpenEditeMadal(item)}
                        copyOrder={(item) => setOpenCopyMadal(item)}
                        cancalOrder={(item) => setOpenCancalMadal(item)}
                        selectMenu={(item) => selectMenuMadal(item)}
                    />
                });
                return list;
            } else if (orders.length > 0 && !isTable) {
                const list = orders.map(item => {
                    return <OrderListItem key={item.id} item={item}
                        selectOrder={(item) => setActiveOrder(item)}
                        //   selectCopy={(item) => openSelectCopy(item)}
                        editeOrder={(item) => setOpenEditeMadal(item)}
                        copyOrder={(item) => setOpenCopyMadal(item)}
                        cancalOrder={(item) => setOpenCancalMadal(item)}
                        selectMenu={(item) => selectMenuMadal(item)}
                    />
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
                                <img src="/icons/no-orders.svg" height="60px" style={{ opacity: '0.5' }} />
                            </div>
                            <div style={{ marginTop: '24px' }}>По данной категории у вас пока нет заказов</div>
                        </div>
                    </div>
                );
            }

        } else {
            const list = emptyArr.map((_, idx) => {
                return <EmptyOrderListItem key={idx} />
            });

            return list
        }
    }

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    }

    const refreshOrder = () => {
        setInfoMadalCancal(false)
        setInfoMadal(false)
        setInfoCopyMadal(false)
        getOrder('all', orderNo, dateStart, dateEnd, recipient, driver)
    }

    const renderTable = () => {
        return (
            <div style={{
                marginTop: '8px',
                width: '100%',
                backgroundColor: '#10121C',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '0px 16px'
            }}>
                <div style={{ height: '35px', width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '6%', fontSize: '13px' }}>
                        <div style={{ fontSize: '14px' }}>ID</div>
                    </div>
                    <div style={{ width: '10%' }}>
                        <div style={{ fontSize: '14px' }}>Откуда</div>
                    </div>
                    <div style={{ width: '10%' }}>
                        <div style={{ fontSize: '14px' }}>Куда</div>
                    </div>
                    <div style={{ width: '12%' }}>
                        <div style={{ fontSize: '14px' }}>Дата создания</div>
                    </div>
                    <div style={{ width: '12%' }}>
                        <div style={{ fontSize: '14px' }}>Дата отправки</div>
                    </div>
                    <div style={{ width: '12%' }}>
                        <div style={{ fontSize: '14px' }}>Дата получения</div>
                    </div>
                    <div style={{ width: '12%' }}>
                        <div style={{ fontSize: '14px' }}>Тип транспорта</div>
                    </div>
                    <div style={{ width: '15%' }}>
                        <div style={{ fontSize: '14px' }}>Стоимость доставки</div>
                    </div>
                    <div style={{ width: '18%' }}>
                        <div style={{ fontSize: '14px' }}>Статус</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '30px', fontFamily: 'Gerbera', fontWeight: 'bold' }}>Мои заказы</span>
                        <span style={{ fontSize: '16px', color: '#A3A7B3', fontWeight: 'inherit', marginLeft: '10px' }}>{total} заказов</span>
                    </div>
                    {
                        user.type === "Expeditor"
                            ? null
                            :
                            <div>
                                {
                                    user.state === "Moderation" ?
                                        <div style={{
                                            backgroundColor: '#C5115E',
                                            color: '#ffffff',
                                            padding: '8px 16px',
                                            fontSize: '13px',
                                            borderRadius: '8px',
                                            marginLeft: '14px'
                                        }}>Создать заказ</div>
                                        :
                                        <Link to="/order-create" style={{ textDecoration: 'none' }}>
                                            <div style={{
                                                backgroundColor: '#C5115E',
                                                color: '#ffffff',
                                                padding: '8px 16px',
                                                fontSize: '13px',
                                                borderRadius: '8px',
                                                marginLeft: '14px'
                                            }}>Создать заказ
                                            </div>
                                        </Link>
                                }
                            </div>
                    }
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ display: 'flex' }}>
                        {renderActive()}
                        {/* isFilter, setIsFilter */}
                        {
                            isFilter ?
                                <div onClick={() => setIsFilter(false)} style={{ cursor: 'pointer', marginTop: '3px' }}><img
                                    src="/icons/Group 36 (1).svg" height="50px" /></div>
                                :
                                <div onClick={() => setIsFilter(true)} style={{ cursor: 'pointer', marginTop: '3px' }}><img
                                    src="/icons/Group 36.svg" height="50px" /></div>
                        }
                        {
                            !isSelectAll ?
                                <div onClick={() => getOrder('select', orderNo, dateStart, dateEnd, recipient, driver)}
                                    style={{ cursor: 'pointer', marginLeft: '-8px', marginTop: '3px' }}><img src="/icons/Group 63.svg" height="50px" /></div>
                                :
                                <div onClick={() => getOrder('all', orderNo, dateStart, dateEnd, recipient, driver)}
                                    style={{ cursor: 'pointer', marginLeft: '-8px', marginTop: '3px' }}><img src="/icons/Group 63 (1).svg" height="50px" />
                                </div>
                        }
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ opacity: '0.3', fontWeight: '400', fontSize: '14px', marginTop: '10px' }}>Вид</div>
                        {
                            isTable ?
                                <div onClick={() => setIsTable(false)} style={{ cursor: 'pointer' }}><img
                                    src="/icons/Group 34 (1).svg" height="45px" /></div>
                                :
                                <div onClick={() => setIsTable(true)} style={{ cursor: 'pointer' }}><img
                                    src="/icons/Group 34.svg" height="45px" /></div>
                        }
                    </div>
                </div>
                {
                    isFilter ?
                        <div style={{ width: '100%', display: 'flex' }}>
                            <div onClick={() => clearFilter()} style={{ cursor: 'pointer' }}><img
                                src="/icons/Frame 41.svg" height="50px" /></div>
                            {renderStatus()}
                            <Form.Group style={{ marginLeft: '7px', width: '180px', marginTop: '7px' }}>
                                <DatePicker
                                    id="dateStartEnd"
                                    selectsRange={true}
                                    startDate={dateStart}
                                    endDate={dateEnd}
                                    onChange={onChangeHandler}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                    placeholderText="Дата создания с - по"
                                    className={'form-control form-control-sm'}
                                    showDisabledMonthNavigation />
                            </Form.Group>
                            <Form.Group style={{ marginLeft: '7px', width: '120px', marginTop: '7px' }}>
                                <Form.Control value={recipient}
                                    onChange={(event) => searchRecipient(event.target.value)}
                                    placeholder="Получатель"
                                    style={{ fontSize: '14px', border: 'none' }} />
                            </Form.Group>
                            <Form.Group style={{ marginLeft: '7px', width: '120px', marginTop: '7px' }}>
                                <Form.Control value={driver} onChange={(event) => searchDriver(event.target.value)}
                                    placeholder="Водитель"
                                    style={{ fontSize: '14px', border: 'none' }} />
                            </Form.Group>
                            <Form.Group style={{ marginLeft: '7px', width: '80px', marginTop: '7px' }}>
                                <Form.Control value={orderNo} onChange={(event) => searchOrderNo(event.target.value)}
                                    placeholder="ID"
                                    style={{ fontSize: '14px', border: 'none' }} />
                            </Form.Group>
                        </div>
                        : null
                }
                {
                    // #664d03
                    user.state === "Moderation"
                        ?
                        <div style={{ marginTop: '16px' }}>
                            <Alert variant="warning" style={{ borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ height: '40px' }}>
                                        <img src="/icons/moderation.svg" height="40px" />
                                    </div>
                                    <div style={{ fontSize: '14px', marginLeft: '12px' }}>
                                        <div style={{ fontSize: '16px', fontFamily: 'Gerbera-Bold' }}>Ваш аккаунт
                                            находится на модерации!
                                        </div>
                                        <div style={{ marginTop: '2px' }}>Это может занять несколько часов. Как только
                                            модератор проверит данные Вашей компании Вы сможете создавать заказы
                                        </div>
                                    </div>
                                </div>
                            </Alert>
                        </div>
                        : null
                }
                <div className='row' style={{ marginTop: '10px' }}>
                    {isTable ?
                        renderTable()
                        :
                        null
                    }
                    {renderList()}
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
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

            {activeOrder && <OrderInfoModal item={activeOrder}
                onClose={() => setActiveOrder()}
                editeOrder={(item) => setOpenEditeMadal(item)}
                copyOrder={(item) => setOpenCopyMadal(item)}
                cancalOrder={(item) => setOpenCancalMadal(item)}
            // selectCopy={(item) => openSelectCopy(item)}
            />}
            {isRenderTable && <MenuMadal item={isRenderTable}
                onClose={() => setActiveOrder()}
                editeOrder={(item) => setOpenEditeMadal(item)}
                selectCopy={(item) => openSelectCopy(item)}
            />}
            {openEditeMadal && <OrderEditeModal item={openEditeMadal} onClose={() => setOpenEditeMadal()}
                infoMadal={() => setInfoMadal(true)} />}
            {openCopyMadal && <OrderCopyModal item={openCopyMadal} onClose={() => setOpenCopyMadal()}
                infoMadal={() => setInfoCopyMadal(true)} />}
            {openCancalMadal && <CancelApp item={openCancalMadal} onClose={() => setOpenCancalMadal()}
                infoMadalCancal={() => setInfoMadalCancal(true)} />}
            {infoMadal && <InfoMadal status={'success '} title={'Запрос отправлен на модерацию'}
                refreshOrder={() => refreshOrder()} />}
            {infoMadalCancal &&
                <InfoMadal status={'success '} title={'Заказ успешно отменен'} refreshOrder={() => refreshOrder()} />}
            {infoCopyMadal &&
                <InfoMadal status={'success '} title={'Заказ(ы) будет опубликован после модерации'} refreshOrder={() => refreshOrder()} />}
        </>
    );
}

export default MainComponent;

