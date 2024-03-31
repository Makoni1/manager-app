import React, { useEffect, useState } from 'react';
import { Order } from '../../../services';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { numberToFinanceFormat } from '../../../utils/index';
import { ORDER_STATUSES_DATA } from '../../../mock';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button'

const OrderListItem = ({item, selectOrder, copyOrder, editeOrder, cancalOrder, selectMenu}) => {

    const { user } = useSelector(state => state);

    const [countryFrom, setCountryFrom] = useState();
    const [countryTo, setCountryTo] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [cityTo, setCityTo] = useState();
    item.statusSave = item.status
    item.status = item.status == 'published' || item.status == 'booked' || item.status == 'confirmed' ?  'awaiting-loading' : item.status == 'waitingforcompletion' ? 'inprocess' : item.status
    const DRIVER_STATUSES_DATA = {
        "moderation": {title: 'На модерации', url: '/icons/Group 79.svg'},
        "awaitingpayment": {title: 'Ожидает оплаты', url: '/icons/Group 80.svg'},
        "awaiting-loading": {title: 'Ожидает погрузки', url: '/icons/Group 77.svg'},
        "inprocess": {title: 'В пути', url: '/icons/Group 82.svg'},
        "completed": {title: 'Завершен', url: '/icons/Group 83.svg'},
        "canceled": {title: 'Отменён', url: '/icons/Group 84.png'},
    }

    const [open, setOpen] = useState(false);
    const [selectList, setSelectList] = useState([]);

    const handleOpen = (value) => { 
    //   setOpen(!open);
        item.isOpenMenu = value
        selectMenu(item)
    };

    const handleSelect = (type, item) => { 
        const list = JSON.parse(localStorage.getItem('selectList')) ? JSON.parse(localStorage.getItem('selectList')) : []
        if(type === 2){
            list.push(item.number)
            localStorage.setItem('selectList', JSON.stringify(list))
            setSelectList(list)
        }else if(type === 3){
            let selectItem = []
            list.map(m=>{
                if(m != item.number){
                    selectItem.push(m)
                }
            })
            localStorage.setItem('selectList', JSON.stringify(selectItem))
            setSelectList(selectItem)
        }
      };

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('selectList')) ? JSON.parse(localStorage.getItem('selectList')) : []
        setSelectList(list && list.length ? list : [])
    }, [item]);

    useEffect(() => {
        if(item) {
            Order.getCountryById(item.countryIdFrom).then((response) => {
                if(response.status == 200) { setCountryFrom(response.data.name); } else { setCountryFrom(''); } 
            }).catch(error => { console.log(error); });

            Order.getCountryById(item.countryIdTo).then((response) => {
                if(response.status == 200) { setCountryTo(response.data.name); } else { setCountryTo('');} 
            }).catch(error => { console.log(error); });

            Order.getCityById(item.cityIdFrom).then((response) => {
                if(response.status == 200) { setCityFrom(response.data.name); } else { setCityFrom(''); } 
            }).catch(error => { console.log(error); });

            Order.getCityById(item.cityIdTo).then((response) => {
                if(response.status == 200) { setCityTo(response.data.name); } else { setCityTo(''); } 
            }).catch(error => { console.log(error); });
        }
    }, [item]);

    const copyApp = (item) =>{

    }

    return (
        <SkeletonTheme color="#e5ebf2" highlightColor="#f0f4f7">
            <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ paddingBottom: '24px' }}>
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px -2px rgb(228, 228, 228)', borderRadius: '16px' }}>
                    <div style={{ padding: '16px' }}>
                        <div  onClick={() => selectOrder(item)} style={{ borderBottom: '1px solid rgba(190, 190, 182, 0.15)', paddingBottom: '14px' }}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Номер</div>
                                    <div style={{ color: '#193048', marginTop: '2px', fontSize: '15px' }}>№ {item.internalNumber}</div>
                                    {/* <div style={{ color: '#193048', fontSize: '13px', marginTop: '2px', color: '#A3ACB6' }}>01.10.2022, 16:45</div> */}
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>ID заказа</div>
                                    <div style={{ color: '#193048', marginTop: '2px', fontSize: '15px' }}>{item.number}</div>
                                    {/* <div style={{ color: '#193048', fontSize: '13px', marginTop: '2px', color: '#A3ACB6' }}>01.10.2022, 16:45</div> */}
                                </div>
                                {/* <div style={{ flex: '1', marginLeft: '16px', textAlign: 'right' }}>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Статус заказа</div>
                                    <div style={{ display: 'inline-block', color: '#ffffff', fontSize: '12px', fontWeight: '500', backgroundColor: `${ORDER_STATUSES_DATA[item.status].color}`, padding: '2px 8px', borderRadius: '6px', marginTop: '4px', textAlign: 'center' }}>{ORDER_STATUSES_DATA[item.status].title}</div>
                                </div> */}
                                <div style={{ flex: '1', marginLeft: '16px', textAlign: 'right' }} >
                                    <div style={{fontSize: '14px'}}>{DRIVER_STATUSES_DATA[item.status]?.title}</div>
                                    <div style={{marginTop: '-8px'}}><img src={DRIVER_STATUSES_DATA[item.status]?.url} alt="" /></div>
                                </div>
                            </div>
                        </div>
                        <div  onClick={() => selectOrder(item)} style={{ padding: '14px 0', borderBottom: '1px solid rgba(190, 190, 182, 0.15)' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '9px', borderRight: '2px rgba(163, 172, 182, 0.4) dashed', height: '54px' }}></div>
                                    {/* <div style={{ backgroundColor: 'rgba(91,180,127, 0.1)', height: '30px', width: '30px', textAlign: 'center', borderRadius: '50%' }}>
                                        <img src="/icons/pick-up-arrow.svg" height="11px" style={{ marginTop: '2px' }} />
                                    </div> */}
                                    <div style={{ position: 'relative', zIndex: '1' }}>
                                        <img src="/icons/pick-up.svg" height="20px" />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    {
                                        countryFrom && cityFrom ?
                                        <>
                                            <div style={{ color: '#193048', fontSize: '15px', lineHeight: '1.3' }}>{countryFrom}, г. {cityFrom}</div>
                                            <div style={{ color: '#A3ACB6', fontSize: '13px', lineHeight: '1.3', marginTop: '2px' }}>{item.addressFrom}</div>
                                        </>
                                        :
                                        <>
                                            <div style={{ fontSize: '15px', lineHeight: '1.3' }}><Skeleton width="120px" /></div> 
                                            <div style={{ lineHeight: '1.3', fontSize: '13px', marginTop: '2px' }}><Skeleton width="140px" /></div>
                                        </>
                                         
                                    }
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                                <div style={{ position: 'relative' }}>
                                    {/* <div style={{ backgroundColor: 'rgba(163, 25, 91, 0.1)', height: '30px', width: '30px', textAlign: 'center', borderRadius: '50%' }}>
                                        <img src="/icons/delivery-arrow.svg" height="11px" style={{ transform: 'rotate(90deg)', marginTop: '2px' }} />
                                    </div> */}
                                    
                                    <div style={{ position: 'relative', zIndex: '1' }}>
                                        <img src="/icons/delivery.svg" height="20px" />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    {
                                        countryTo && cityTo ?
                                        <>
                                            <div style={{ color: '#193048', fontSize: '15px', lineHeight: '1.3' }}>{countryTo}, г. {cityTo}</div>
                                            <div style={{ color: '#A3ACB6', fontSize: '13px', lineHeight: '1.3', marginTop: '2px' }}>{item.addressTo}</div>
                                        </>
                                        :
                                        <>
                                            <div style={{ fontSize: '15px', lineHeight: '1.3' }}><Skeleton width="120px" /></div> 
                                            <div style={{ lineHeight: '1.3', fontSize: '13px', marginTop: '2px' }}><Skeleton width="140px" /></div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '14px 0 0' }}>
                            <div className='row'>
                                {/* <div className='col-6'>
                                    <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Стоимость</div>
                                    <div style={{ color: '#193048', marginTop: '2px', fontSize: '18px' }}>135 000 тг</div>
                                </div> */}
                                <div className='col-4'  onClick={() => selectOrder(item)}>
                                    {/* <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Расстояние</div> */}
                                    <div style={{ display: 'flex', marginTop: '2px', alignItems: 'center' }}>
                                        <div>
                                            <img src="/icons/price.svg" height="22px" />
                                        </div>
                                        <div style={{ color: '#193048', fontSize: '16px', marginLeft: '8px' }}>{numberToFinanceFormat(user.type === "Expeditor" ? item.netPrice : item.price)} тг</div>
                                    </div>
                                </div>
                                <div className='col-4'  onClick={() => selectOrder(item)}>
                                    {/* <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Расстояние</div> */}
                                    <div style={{ display: 'flex', marginTop: '2px', alignItems: 'center' }}>
                                        <div>
                                            <img src="/icons/distance.svg" height="20px" />
                                        </div>
                                        <div style={{ color: '#193048', fontSize: '16px', marginLeft: '6px' }}>{numberToFinanceFormat(item.distance)} км</div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    {/* <div style={{ display: 'flex', marginTop: '2px', alignItems: 'center' }}>
                                        <Button onClick={() => selectCopy(item)} variant="outline-primary">Копировать</Button>
                                    </div> */}
                                <div style={{display: 'flex', width:'100%', justifyContent: 'flex-end'}}>
                                    {
                                        selectList.includes(item.number) ?
                                        <div style={{width: '10px'}}  onClick={() => selectOrder(item)}>
                                            <img src="/icons/Star 1.svg" height="13px"/>
                                        </div>
                                        : null
                                    }
                            <div className="dropdown">
                                <div style={{cursor: 'pointer'}}>
                                    {
                                        item.isOpenMenu ?
                                            <div onClick={() => handleOpen(false)}><img src="/icons/Vector (3).svg"
                                                                                        height="13px"/></div>
                                            :
                                            <div onClick={() => handleOpen(true)}><img src="/icons/Vector (4).svg"
                                                                                       height="13px"/></div>
                                    }
                                </div>
                                {item.isOpenMenu  ? 
                                    user.type === "Expeditor" 
                                    ? 
                                    <ul className="menu">
                                    {
                                        selectList.includes(item.number) ?
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(3, item), handleOpen(false)
                                            }}>Убрать из избранного</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(2, item), handleOpen(false)
                                            }}>В избранные</li>
                                    }
                                    </ul>
                                    : 
                                    <ul className="menu">
                                    <li className="menu-item" onClick={() => {
                                        copyOrder(item), handleOpen(false)
                                    }}>Сделать копию
                                    </li>
                                    {
                                        selectList.includes(item.number) ?
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(3, item), handleOpen(false)
                                            }}>Убрать из избранного</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                handleSelect(2, item), handleOpen(false)
                                            }}>В избранные</li>
                                    }
                                    {
                                        item.status == 'completed' ?
                                            <li className="menu-item" style={{opacity: '0.2'}}>Редактировать</li>
                                            :
                                            <li className="menu-item" onClick={() => {
                                                editeOrder(item), handleOpen(false)
                                            }}>Редактировать</li>
                                    }
                                    {
                                        item.statusSave == 'moderation' || item.statusSave == 'awaitingpayment'  || item.statusSave == 'published'?
                                        <li className="menu-item" onClick={() => {
                                            cancalOrder(item), handleOpen(false)
                                        }}>Отозвать заявку</li>
                                            :
                                        <li className="menu-item" style={{opacity: '0.2'}}>Отозвать заявку</li>
                                    }
                                    </ul>
                                : null}
                            </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{ padding: '14px 0 0' }}>
                            <div style={{ color: '#A3ACB6', fontSize: '12px' }}>Водитель</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                <div>
                                    <img src="/icons/driver-account.svg" height="30px" style={{ opacity: '0.4' }} />
                                </div>
                                
                                <div style={{ marginLeft: '14px' }}>
                                    <div style={{ color: '#193048', fontWeight: '700', fontSize: '14px', lineHeight: '1.3' }}>Калиев Алихан</div>
                                    <div style={{ color: '#A3ACB6', fontSize: '11px', lineHeight: '1.3', marginTop: '2px' }}>748 AMP 05</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default OrderListItem;