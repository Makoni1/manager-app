import React, {useEffect, useState} from "react";
import {Order, User} from "../../../services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import {useSelector} from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import moment from 'moment';
import DriverSelectionModal from "./DriverSelectionModal";
import {setNavbarState} from "../../../store/actions/navigationAction";
import {toast} from "react-toastify";
import {useWindowSize} from "../../../hooks/useWindowSize";

const OrderEditeModal = ({item, onClose, onUpdateData}) => {
    const { isMobile } = useWindowSize()
    console.log("item ---->", item);
    const {user} = useSelector((state) => state);
    console.log("USER =====>", user);

    const [showDriverSelect, setShowDriverSelect] = useState(false);

    const [errors, setErrors] = useState();

    const [addressFrom, setAddressFrom] = useState(item && item.addressFrom ? item.addressFrom : '');
    const [addressTo, setAddressTo] = useState(item && item.addressTo ? item.addressTo : '');

    const [pickUpDate, setPickUpDate] = useState(item && item.shippingDate ? moment(item.shippingDate.split('T')[0]).toDate() : '')
    const [minPickDate, setMinPickDate] = useState(item && item.shippingDate ? new Date(moment(item.shippingDate.split('T')[0]).toDate()).setDate(new Date(moment(item.shippingDate.split('T')[0]).toDate()).getDate() + 1) : '');
    const [pickUpStartTime, setPickUpStartTime] = useState(item && item.shippingHourFrom ? new Date(item.shippingHourFrom).getHours() : '');
    const [pickUpEndTime, setPickUpEndTime] = useState(item && item.shippingHourTo ? new Date(item.shippingHourTo).getHours() : '');
    console.log('TIME: ', pickUpStartTime)

    const [deliveryDate, setDeliveryDate] = useState(item && item.unloadingDate ? moment(item.unloadingDate.split('T')[0]).toDate() : '');
    const [minDeliveryDate, setMinDeliveryDate] = useState(item && item.shippingDate ? new Date(moment(item.shippingDate.split('T')[0]).toDate()).setDate(new Date(moment(item.shippingDate.split('T')[0]).toDate()).getDate() + 1) : '');
    const [deliveryStartTime, setDeliveryStartTime] = useState(item && item.unloadingHourFrom ? new Date(item.unloadingHourFrom).getHours() : '');
    const [deliveryEndTime, setDeliveryEndTime] = useState(item && item.unloadingHourTo ? new Date(item.unloadingHourTo).getHours() : '');

    const [cargo, setCargo] = useState();
    const [recipient, setRecipient] = useState();

    const createOrder = () => {

        const data = {
            "orderId": item.id,
            "price": item.price,
            "netPrice": item.netPrice,
            "insurancePrice": item?.insurancePrice,
            "distance": item.distance,
            "addressFrom": addressFrom,
            "addressTo": addressTo,
            "shippingDate": pickUpDate,
            "shippingHourFrom": pickUpStartTime ? Number(moment(pickUpStartTime).format("HH")) : null,
            "shippingHourTo": pickUpEndTime ? Number(moment(pickUpEndTime).format("HH")) : null,
            "unloadingDate": deliveryDate,
            "unloadingHourFrom": deliveryStartTime ? Number(moment(deliveryStartTime).format("HH")) : null,
            "unloadingHourTo": deliveryEndTime ? Number(moment(deliveryEndTime).format("HH")) : null,

            "cityIdFrom": item.cityIdFrom ? item.cityIdFrom : null,
            "cityIdTo": item.cityIdTo ? item.cityIdTo : null,
            "countryIdFrom": item.countryIdFrom ? item.countryIdFrom : null,
            "countryIdTo": item.countryIdTo ? item.countryIdTo : null,

            "recipientEmail": recipient && recipient.email ? recipient.email : null,
            "recipientName": recipient && recipient.name ? recipient.name : null,
            "recipientPhoneNumber": recipient && recipient.phoneNumber ? recipient.phoneNumber : null,


            "userId": user.id,
            "vehicleType": item.vehicleType ? item.vehicleType : null,

            "category": cargo && cargo.category ? cargo.category : null,
            "details": cargo && cargo.details ? cargo.details : null,
            "weight": cargo?.weight,
            "volume": cargo?.volume,
            "length": cargo?.length,
            "width": cargo?.width,
            "height": cargo?.height,
        }
        console.log('aaa', data);
        Order.update(data)
            .then(response => {
                if (response.status == 200) {
                    setErrors();
                    onClose();
                    onUpdateData();
                    toast.info("Запрос отправлен на модерацию")
                } else {
                    toast.error("Произошла ошибка, попробуйте позже")
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Произошла ошибка, попробуйте позже")
                toast.error(error)
            });
    }

    useEffect(() => {
        // get cargo
        Order.getCargo(item.cargoId).then(response => {
            console.log('get cargo', response.data);
            if (response.status == 200) {
                setCargo(response.data);
            }
        }).catch(error => {
            console.log('get cargo error:', error);
            toast.error("Произошла ошибка, попробуйте позже")
            toast.error(error)
        });

        // get recipient
        Order.getRecipient(item.recipientId).then(response => {
            console.log('get recipient', response.data);
            if (response.status == 200) {
                setRecipient(response.data);
            }
        }).catch(error => {
            console.log('get recipient error:', error);
            toast.error("Произошла ошибка, попробуйте позже")
            toast.error(error)
        });
    }, []);

    return (
        <>
            <div className="modal-overlay">
                <div style={{
                    backgroundColor: "#ffffff",
                    height: "670px",
                    width: isMobile ? "96%" : '',
                    maxWidth: "730px",
                    margin: "30px auto",
                    borderRadius: "6px",
                    overflowY: isMobile ? 'scroll' : ''
                }}>
                    <div>
                        <div
                            style={{
                                padding: "14px 24px",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                justifyContent: "space-between",
                                borderTopLeftRadius: "6px",
                                borderTopRightRadius: "6px",
                            }}
                        >
                            <div></div>
                            <div
                                onClick={onClose}
                                style={{padding: "4px", cursor: "pointer", opacity: "1"}}
                            >
                                <img src="/icons/close.svg" height="16px"/>
                            </div>
                        </div>
                        <div style={{
                            fontSize: "25px",
                            marginLeft: '50px',
                            marginTop: '-30px',
                            backgroundColor: "#ffffff",
                            fontWeight: '600'
                        }}>
                            Редактировать заказ
                        </div>
                        <div style={{padding: isMobile ? '14px 20px' : '20px 50px'}}>
                            <div style={{fontSize: "16px", fontWeight: '600', marginBottom: '10px'}}>
                                Информация о
                                заказе
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="col-12">
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Город
                                            отправки
                                        </div>
                                        <div
                                            style={{fontSize: '17px'}}>{item?.cityFromName}, {item?.countryFromName}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Адрес
                                            отправки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%'}}>
                                                <input type="text"
                                                       style={{width: '100%', border: 'none', fontSize: '14px'}}
                                                       value={addressFrom}
                                                       onChange={(event) => setAddressFrom(event.target.value)}/>
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{
                                            color: '#9BA0AB',
                                            fontSize: '15px',
                                            fontWeight: 'lighter'
                                        }}>Отправитель
                                        </div>
                                        <div style={{fontSize: '17px'}}>{user?.name || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Дата
                                            погрузки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%', marginLeft: '-10px'}}>
                                                {/* <input type="text" style={{ width: '100%', border: 'none', fontSize: '14px' }} /> */}
                                                <DatePicker style={{width: '100%', border: 'none', fontSize: '14px'}}
                                                            selected={pickUpDate}
                                                            minDate={minPickDate}
                                                            onChange={(date) => setPickUpDate(date)}
                                                            dateFormat="dd.MM.yyyy"
                                                            locale={ru}
                                                            placeholderText="Укажите дату"
                                                />
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Время
                                            загрузки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%', display: 'flex', marginLeft: '-10px'}}>
                                                <div style={{width: '90px'}}>
                                                    <DatePicker style={{border: 'none', fontSize: '14px'}}
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
                                                </div>
                                                -
                                                <div style={{width: '90px', marginLeft: '20px'}}>
                                                    <DatePicker style={{border: 'none', fontSize: '14px'}}
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
                                                </div>
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Номер
                                            отправителя
                                        </div>
                                        <div style={{fontSize: '17px'}}>{user?.phoneNumber || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Email
                                            отправителя
                                        </div>
                                        <div style={{fontSize: '17px'}}>{user?.email || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="col-12">
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Город
                                            доставки
                                        </div>
                                        <div style={{fontSize: '17px'}}>{item?.cityToName}, {item?.countryToName}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Адрес
                                            доставки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%'}}>
                                                <input type="text"
                                                       style={{width: '100%', border: 'none', fontSize: '14px'}}
                                                       value={addressTo}
                                                       onChange={(event) => setAddressTo(event.target.value)}/>
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{
                                            color: '#9BA0AB',
                                            fontSize: '15px',
                                            fontWeight: 'lighter'
                                        }}>Получатель
                                        </div>
                                        <div style={{fontSize: '17px'}}>{recipient?.name || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Дата
                                            доставки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%', marginLeft: '-10px'}}>
                                                <DatePicker style={{width: '100%', border: 'none', fontSize: '14px'}}
                                                            selected={deliveryDate}
                                                            minDate={minDeliveryDate}
                                                            onChange={(date) => setDeliveryDate(date)}
                                                            dateFormat="dd.MM.yyyy"
                                                            locale={ru}
                                                            placeholderText="Укажите дату"
                                                />
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>Время
                                            отгрузки
                                        </div>
                                        <div style={{
                                            fontSize: '17px',
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{width: '95%', display: 'flex', marginLeft: '-10px'}}>
                                                <div style={{width: '90px'}}>
                                                    <DatePicker style={{border: 'none', fontSize: '14px'}}
                                                                selected={deliveryStartTime}
                                                                onChange={(date) => setDeliveryStartTime(date)}
                                                                showTimeSelect
                                                                showTimeSelectOnly
                                                                timeIntervals={60}
                                                                timeCaption="Time"
                                                                dateFormat="HH:mm"
                                                                locale={ru}
                                                                placeholderText="Укажите"
                                                    />
                                                </div>
                                                -
                                                <div style={{width: '90px', marginLeft: '20px'}}>
                                                    <DatePicker style={{border: 'none', fontSize: '14px'}}
                                                                selected={deliveryEndTime}
                                                                onChange={(date) => setDeliveryEndTime(date)}
                                                                showTimeSelect
                                                                showTimeSelectOnly
                                                                timeIntervals={60}
                                                                timeCaption="Time"
                                                                dateFormat="HH:mm"
                                                                locale={ru}
                                                                placeholderText="Укажите"
                                                    />
                                                </div>
                                            </div>
                                            <div style={{width: '5%', textAlign: 'end', marginLeft: '5px'}}><img
                                                src="/icons/Vector (6).svg" alt=""/></div>
                                        </div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>
                                            Номер получателя
                                        </div>
                                        <div style={{fontSize: '17px'}}>{recipient?.phoneNumber || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: '14px'}}>
                                        <div style={{color: '#9BA0AB', fontSize: '15px', fontWeight: 'lighter'}}>
                                            Email получателя
                                        </div>
                                        <div style={{fontSize: '17px'}}>{recipient?.email || '-'}</div>
                                        <div style={{borderBottom: '1px solid #E2E8ED'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: '24px', width: '100%', display: isMobile ? "block" : "flex", textAlign: isMobile ? "center" : "left"}}>
                                <div onClick={createOrder} style={{
                                    backgroundColor: '#A3195B',
                                    color: '#ffffff',
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                }}>Отправить на модерацию
                                </div>
                                <div onClick={onClose} style={{
                                    color: '#9BA0AB',
                                    padding: '10px 16px',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    marginLeft: '14px'
                                }}>Отмена
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDriverSelect && (
                <DriverSelectionModal
                    onClose={() => setShowDriverSelect(false)}
                    orderId={item.id}
                />
            )}
        </>
    );
};

export default OrderEditeModal;
