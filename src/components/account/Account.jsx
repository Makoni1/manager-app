import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {setNavbarState} from '../../store/actions/navigationAction';
import {useDispatch, useSelector} from 'react-redux';
import {Invoice} from '../../services';
import Pagination from "react-responsive-pagination";
import AccountListItem from '../account/AccountListItem';
import {numberToFinanceFormat} from '../../utils/index';

const DRIVER_STATUSES_DATA = {
    "moderation": {title: 'На модерации', url: '/icons/Group 79.svg'},
    "awaitingpayment": {title: 'Ожидает оплаты', url: '/icons/Group 80.svg'},
    "awaiting-loading": {title: 'Ожидает погрузки', url: '/icons/Group 77.svg'},
    "inprocess": {title: 'В пути', url: '/icons/Group 82.svg'},
    "completed": {title: 'Завершен', url: '/icons/Group 83.svg'},
    "canceled": {title: 'Отменён', url: '/icons/Group 84.png'},
}


const AccountComponent = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    console.log('user: ', user)
    const [accounts, setAccounts] = useState([{}]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        dispatch(setNavbarState({activeNavId: '5'}));
    }, []);

    useEffect(() => {
        if (user && user.id) {
        Invoice.getByUser(user.id, 'paid', 1,true).then((response) => {
            console.log('Invoices responce', response.data);
            if(response.status == 200) {
                setAccounts(response.data) 
            }
            else setAccounts([]); 
        }).catch(error => {
            console.log(error);
        })
    }
    }, [user, status]);

    const renderTable = () => {
        return (
            <div style={{
                width: '100%',
                color: '#A3A7B3',
                borderRadius: '10px',
                padding: '0px 16px'
            }}>
                <div style={{height: '35px', width: '100%', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '10%', fontSize: '13px'}}>
                        <div style={{fontSize: '14px'}}>ID заказа</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Дата создания заявки</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Город погрузки</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Город отгрузки</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Дата погрузки</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Дата отгрузки</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Статус заказа</div>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{fontSize: '14px'}}>Сумма</div>
                    </div>
                </div>
            </div>
        )
    }

    const renderTableItem = () => {
        if(accounts) {
            if(accounts.length > 0) {
                const list = accounts.map((item, idx) => {
                    return (
                        <AccountListItem item={item} key={idx} />
                    );
                });
        
                return list;
            }else {
                return (
                    <div>
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '12vh', textAlign: 'center', color: '#A3ACB6' }}>
                            <div>
                                <img src="/icons/no-invoices.svg" height="60px" style={{ opacity: '0.5' }} />
                            </div>
                            <div style={{ marginTop: '24px' }}>По данной категории у вас пока нет счетов</div>
                        </div>
                    </div>
                );
            }
        }else {
            const list = emptyArr.map((item, idx) => {
                return <EmptyInvoiceListItem key={idx} />
            });

            return list
        }
    };

    // const renderTableItem = (item) => {
    //     return (
    //         <div style={{
    //             marginTop: '8px',
    //             backgroundColor: '#FFFFFF',
    //             color: '#10121C',
    //             borderRadius: '10px',
    //             padding: '0px 16px'
    //         }}>
    //             <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '100%'}}>
    //                 <div style={{
    //                     height: '45px',
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     width: '10%',
    //                     fontSize: '13px',
    //                     fontWeight: '700'
    //                 }}>
    //                 <div style={{background: '#F2F3F4', borderRadius: '10px', width: '90px', height: '30px', display: 'flex', alignItems: 'center', padding: '0px 10px'}}>
    //                     {item?.number | '-'}
    //                 </div>
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
    //                      >{item.createdAtStr}
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
    //                      >{item.cityFromName}
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
    //                      >{item.cityToName}
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
    //                      >{moment(item.shippingDate).format("DD.MM.YYYY")}
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}
    //                      >{moment(item.unloadingDate).format("DD.MM.YYYY")}
    //                 </div>
    //                 <div style={{width: '15%'}}>
    //                     <div style={{fontSize: '14px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
    //                         <div style={{padding: '5px 0', width: '80%'}}>
    //                             <div>{DRIVER_STATUSES_DATA[item.status]?.title}</div>
    //                             <div style={{marginTop: '-8px'}}><img src={DRIVER_STATUSES_DATA[item.status]?.url} alt=""/>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div style={{height: '45px', display: 'flex', alignItems: 'center', width: '15%', fontSize: '14px'}}>
    //                     <div style={{
    //                         fontSize: '14px',
    //                         fontWeight: '700'
    //                     }}>{item.price ? <span>{item.price} ₸</span> : '-'}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <>
            <div style={{padding: '20px 24px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <span style={{fontSize: '30px', fontFamily: 'Gerbera', fontWeight: 'bold'}}>Баланс</span> 
                        <span style={{fontSize: '16px', color: '#A3A7B3', fontWeight: 'inherit', marginLeft: '10px'}}></span>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', marginTop: '10px'}}>
                    <div className='card-acc'>
                        <div style={{color: '#9EA2AD', fontSize: '16px', fontWeight: 'lighter'}}>Доступно</div>
                        <div style={{color: '#212529', fontSize: '18px', marginTop: '5px'}}>
                            <img style={{marginRight: '10px'}} src="/icons/Union.svg" height="18px"/> 
                             {user.balance ? <span  style={{marginTop: '5px'}}>{numberToFinanceFormat(user.balance)} ₸</span> : ' 0 ₸'}
                        </div>
                    </div>
                    <div className='card-acc'>
                        <div style={{color: '#9EA2AD', fontSize: '16px', fontWeight: 'lighter'}}>На удержании</div>
                        <div style={{color: '#212529', fontSize: '18px', marginTop: '5px'}}>
                            <img style={{marginRight: '10px'}} src="/icons/Union.svg" height="18px"/> 
                            {user.moneyOnHold ? <span  style={{marginTop: '5px'}}>{numberToFinanceFormat(user.moneyOnHold)} ₸</span> : ' 0 ₸'}
                        </div>
                    </div>
                    <div className='card-acc'>
                        <div style={{color: '#9EA2AD', fontSize: '16px', fontWeight: 'lighter'}}>Оплачено всего</div>
                        <div style={{color: '#212529', fontSize: '18px', marginTop: '5px'}}>
                            <img style={{marginRight: '10px'}} src="/icons/Union.svg" height="18px"/> 
                            {user.totalPaid ? <span  style={{marginTop: '5px'}}>{numberToFinanceFormat(user.totalPaid)} ₸</span> : ' 0 ₸'}
                        </div>
                    </div>
                </div>
                <div style={{marginTop: '10px'}}>
                    <span style={{fontSize: '30px', fontFamily: 'Gerbera', fontWeight: 'bold'}}>История оплат</span> 
                </div>
                <div className='row'>
                    {renderTable()}
                    {renderTableItem()}

                    {/* {
                    accounts && accounts.length ?
                      accounts.icons(item => {
                        renderTableItem(item)
                       })
                       :
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
                           <div style={{marginTop: '24px'}}>По данной категории у вас пока нет заказов</div>
                       </div>
                   </div>
                    } */}
                </div>
                <div className="row" style={{marginTop: '20px'}}>
                    {
                        accounts &&
                        <Pagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={page => handlePageChange(page)}
                        />
                    }
                </div>
            </div>
        </> 
    );
}

export default AccountComponent;

