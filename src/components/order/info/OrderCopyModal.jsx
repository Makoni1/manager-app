import React, {useEffect, useState} from "react";
import {Order, User} from "../../../services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import {useSelector} from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import moment from "moment";
import DriverSelectionModal from "./DriverSelectionModal";
import Form from "react-bootstrap/Form";
import Loading from "../../invoices/Loading";
import Spinner from 'react-bootstrap/Spinner';
import {phoneNumberFormat} from "../../../utils";
import {toast} from "react-toastify";
import {useWindowSize} from "../../../hooks/useWindowSize";

const OrderEditeModal = ({item, onClose, onUpdateData}) => {
  const { isMobile } = useWindowSize()
    console.log("item ---->", item);
    const {user} = useSelector((state) => state);
    console.log("USER =====>", user);

    const [showDriverSelect, setShowDriverSelect] = useState(false);

    const [errors, setErrors] = useState();

    const [addressFrom, setAddressFrom] = useState(
        item && item.addressFrom ? item.addressFrom : ""
    );
    const [addressTo, setAddressTo] = useState(
        item && item.addressTo ? item.addressTo : ""
    );

    const [pickUpDate, setPickUpDate] = useState(
        item && item.shippingDate
            ? moment(item.shippingDate.split("T")[0]).toDate()
            : ""
    );
    const [minPickDate, setMinPickDate] = useState(
        item && item.shippingDate
            ? new Date(moment(item.shippingDate.split("T")[0]).toDate()).setDate(
                new Date(moment(item.shippingDate.split("T")[0]).toDate()).getDate() +
                1
            )
            : ""
    );
    const [pickUpStartTime, setPickUpStartTime] = useState(
        item && item.shippingHourFrom
            ? new Date(item.shippingHourFrom).getHours()
            : ""
    );
    const [pickUpEndTime, setPickUpEndTime] = useState(
        item && item.shippingHourTo ? new Date(item.shippingHourTo).getHours() : ""
    );
    console.log("TIME: ", pickUpStartTime);

    const [deliveryDate, setDeliveryDate] = useState(
        item && item.unloadingDate
            ? moment(item.unloadingDate.split("T")[0]).toDate()
            : ""
    );
    const [minDeliveryDate, setMinDeliveryDate] = useState(
        item && item.shippingDate
            ? new Date(moment(item.shippingDate.split("T")[0]).toDate()).setDate(
                new Date(moment(item.shippingDate.split("T")[0]).toDate()).getDate() +
                1
            )
            : ""
    );
    const [deliveryStartTime, setDeliveryStartTime] = useState(
        item && item.unloadingHourFrom
            ? new Date(item.unloadingHourFrom).getHours()
            : ""
    );
    const [deliveryEndTime, setDeliveryEndTime] = useState(
        item && item.unloadingHourTo
            ? new Date(item.unloadingHourTo).getHours()
            : ""
    );
    const [isCalculation, setIsCalculation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorTitle, setErrorTitle] = useState();

    const [cargo, setCargo] = useState();
    const [recipient, setRecipient] = useState();

    const [price, setPrice] = useState();
    const [netPrice, setNetPrice] = useState();
    const [distance, setDistance] = useState();

    const [copyCount, setCopyCount] = useState(1);

    const [insurance, setInsurance] = useState(false);
    const [declaredPrice, setDeclaredPrice] = useState();
    const [insurancePrice, setInsurancePrice] = useState(0);

    const [file, setFile] = useState({});

    const queryInsurance = () => {
        if (insurance) {
            setInsurance(false);
            setDeclaredPrice(null);
            setInsurancePrice(null);
            setFile({});
        } else {
            setInsurance(true);
        }
        setIsCalculation(false)
    };

    const setCopyCountQuery = (type) => {
        if (type == '+') {
            setCopyCount(copyCount + 1)
        } else {
            setCopyCount(copyCount - 1)
        }
    }

    const calculation = () => {
        if (addressFrom && addressTo && deliveryDate && pickUpDate && pickUpStartTime && pickUpEndTime && deliveryStartTime && deliveryEndTime && ((!insurance) || (insurance && declaredPrice))) {
            if (!copyCount || copyCount == '0' || copyCount < 0) {
                setErrorTitle('Поле Количество экземпляр не должен быть меньше 1');
                return
            }
            setErrorTitle();
            if (declaredPrice) setInsurancePrice(Math.trunc((declaredPrice / 100) * 0.3))
            window.scrollTo(0, 0);
            item

            const data = {
                "cityIdFrom": item.cityIdFrom,
                "cityIdTo": item.cityIdTo,
                "weight": Number(cargo.weight),
                "volume": Number(cargo.volume),
                "transportType": cargo.vehicleType,
                "cargoCategory": cargo.category,
            };
            setIsLoading(true)
            Order.getOrderPrice(data)
                .then(response => {
                    console.log('CALC RESPONSE', response.data);
                    if (response.status == 200) {
                        setPrice(response.data.price);
                        setNetPrice(response.data.netPrice);
                        setDistance(response.data.distance);
                        setIsCalculation(true);
                        setIsLoading(false)
                    } else {
                        console.log('Произошла ошибка, попробуйте позже');
                        alert('Произошла ошибка, попробуйте позже')
                        setIsCalculation(false);
                        setIsLoading(false)
                    }
                })
                .catch(error => {
                    console.log(error);
                    setIsCalculation(false);
                    setIsLoading(false)
                });

        } else setErrorTitle('Необходимо заполнить все поля');
    }

    const createOrder = () => {
        if (!copyCount || copyCount == '0') {
            setErrorTitle('Поле Количество экземпляр не должен быть меньше 0');
            toast.error('Поле Количество экземпляр не должен быть меньше 0')
            return
        }
        const data = {
            orderId: item.id,
            price: item.price,
            netPrice: item.netPrice,
            insurancePrice: item?.insurancePrice,
            distance: item.distance,
            addressFrom: addressFrom,
            addressTo: addressTo,
            shippingDate: pickUpDate,
            shippingHourFrom: pickUpStartTime
                ? Number(moment(pickUpStartTime).format("HH"))
                : null,
            shippingHourTo: pickUpEndTime
                ? Number(moment(pickUpEndTime).format("HH"))
                : null,
            unloadingDate: deliveryDate,
            unloadingHourFrom: deliveryStartTime
                ? Number(moment(deliveryStartTime).format("HH"))
                : null,
            unloadingHourTo: deliveryEndTime
                ? Number(moment(deliveryEndTime).format("HH"))
                : null,

            cityIdFrom: item.cityIdFrom ? item.cityIdFrom : null,
            cityIdTo: item.cityIdTo ? item.cityIdTo : null,
            countryIdFrom: item.countryIdFrom ? item.countryIdFrom : null,
            countryIdTo: item.countryIdTo ? item.countryIdTo : null,

            recipientEmail: recipient && recipient.email ? recipient.email : null,
            recipientName: recipient && recipient.name ? recipient.name : null,
            recipientPhoneNumber:
                recipient && recipient.phoneNumber ? recipient.phoneNumber : null,

            userId: user.id,
            vehicleType: item.vehicleType ? item.vehicleType : null,

            category: cargo && cargo.category ? cargo.category : null,
            details: cargo && cargo.details ? cargo.details : null,
            weight: cargo?.weight,
            volume: cargo?.volume,
            length: cargo?.length,
            width: cargo?.width,
            height: cargo?.height,
            copyCount: copyCount,
            isInsurance: insurance,
            declaredPrice: declaredPrice,
        };
        console.log("aaa", data);
        setIsLoading(true)
        Order.create(data)
            .then((response) => {
                if (response.status == 200) {
                    setErrors();
                    onClose();
                    setIsLoading(false)
                    onUpdateData(response.data.id)
                } else {
                    toast.error("Произошла ошибка, попробуйте позже")
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
              toast.error("Произошла ошибка, попробуйте позже!")
              toast.error(error)
                setIsLoading(false)
            });
    };

    useEffect(() => {
        // get cargo
        Order.getCargo(item.cargoId)
            .then((response) => {
                console.log("get cargo", response.data);
                if (response.status == 200) {
                    setCargo(response.data);
                }
            })
            .catch((error) => {
                console.log("get cargo error:", error);
                toast.error("Произошла ошибка, попробуйте позже!")
                toast.error(error)
            });

        // get recipient
        Order.getRecipient(item.recipientId)
            .then((response) => {
                console.log("get recipient", response.data);
                if (response.status == 200) {
                    setRecipient(response.data);
                }
            })
            .catch((error) => {
                console.log("get recipient error:", error);
              toast.error("Произошла ошибка, попробуйте позже!")
              toast.error(error)
            });
    }, []);

    return (
        <>
            <div className="modal-overlay">
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        height:  '95vh',
                        width: isMobile ? "96%" : '',
                        maxWidth: "726px",
                        margin: "30px auto",
                        borderRadius: "6px",
                        overflowY: isMobile ? 'scroll' : 'auto',
                    }}
                >
                    <div>
                        <div
                            style={{
                                padding: "19px 24px",
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
                        <div
                            style={{
                                fontSize: "25px",
                                marginLeft: "50px",
                                marginTop: "-30px",
                                backgroundColor: "#ffffff",
                                fontWeight: "600",
                            }}
                        >
                            Копировать заказ
                        </div>
                        <div style={{padding: isMobile ? '14px 20px' : '20px 50px', height: '600px'}}>
                            <div
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    marginBottom: "10px",
                                }}
                            >
                                Информация о заказе
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="col-12">
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Город отправки
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {item?.cityFromName}, {item?.countryFromName}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Адрес отправки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{width: "95%"}}>
                                                <input
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        border: "none",
                                                        fontSize: "14px",
                                                    }}
                                                    value={addressFrom}
                                                    onChange={(event) =>
                                                        setAddressFrom(event.target.value)
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Дата погрузки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{width: "95%", marginLeft: "-10px"}}>
                                                {/* <input type="text" style={{ width: '100%', border: 'none', fontSize: '14px' }} /> */}
                                                <DatePicker
                                                    style={{
                                                        width: "100%",
                                                        border: "none",
                                                        fontSize: "14px",
                                                    }}
                                                    selected={pickUpDate}
                                                    minDate={minPickDate}
                                                    onChange={(date) => setPickUpDate(date)}
                                                    dateFormat="dd.MM.yyyy"
                                                    locale={ru}
                                                    placeholderText="Укажите дату"
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Отправитель
                                        </div>
                                        <div style={{fontSize: "17px"}}>{user?.name || "-"}</div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Время загрузки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "95%",
                                                    display: "flex",
                                                    marginLeft: "-10px",
                                                }}
                                            >
                                                <div style={{width: "90px"}}>
                                                    <DatePicker
                                                        style={{border: "none", fontSize: "14px"}}
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
                                                <div style={{width: "90px", marginLeft: "20px"}}>
                                                    <DatePicker
                                                        style={{border: "none", fontSize: "14px"}}
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
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}>
                                            Номер отправителя
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {(user && user?.phoneNumber) ? phoneNumberFormat(user?.phoneNumber) : "-"}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Email отправителя
                                        </div>
                                        <div style={{fontSize: "17px"}}>{user?.email || "-"}</div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Страховка
                                        </div>
                                        <Form.Check
                                            className="check"
                                            type="checkbox"
                                            checked={insurance}
                                            value={insurance}
                                            onClick={queryInsurance}
                                            id={`default-checkbox`}
                                            label="Включить страховку"
                                        />
                                    </div>
                                    {insurance ? (
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                Объявленная стоимость
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "17px",
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <div style={{width: "95%"}}>
                                                    {/* <Form.Control type="number" placeholder="0 ₸" value={declaredPrice} onChange={(event) => setDeclaredPrice(event.target.value)} style={{ fontSize: '14px' }} /> */}
                                                    <input
                                                        type="number"
                                                        style={{
                                                            width: "100%",
                                                            border: "none",
                                                            fontSize: "14px",
                                                        }}
                                                        value={declaredPrice}
                                                        onChange={(event) =>
                                                            setDeclaredPrice(event.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "end",
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    <img src="/icons/Vector (6).svg" alt=""/>
                                                </div>
                                            </div>
                                            <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="col-12">
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Город доставки
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {item?.cityToName}, {item?.countryToName}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Адрес доставки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{width: "95%"}}>
                                                <input
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        border: "none",
                                                        fontSize: "14px",
                                                    }}
                                                    value={addressTo}
                                                    onChange={(event) => setAddressTo(event.target.value)}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Дата доставки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{width: "95%", marginLeft: "-10px"}}>
                                                <DatePicker
                                                    style={{
                                                        width: "100%",
                                                        border: "none",
                                                        fontSize: "14px",
                                                    }}
                                                    selected={deliveryDate}
                                                    minDate={minDeliveryDate}
                                                    onChange={(date) => setDeliveryDate(date)}
                                                    dateFormat="dd.MM.yyyy"
                                                    locale={ru}
                                                    placeholderText="Укажите дату"
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Получатель
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {item?.recipientName || "-"}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Время отгрузки
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "17px",
                                                display: "flex",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "95%",
                                                    display: "flex",
                                                    marginLeft: "-10px",
                                                }}
                                            >
                                                <div style={{width: "90px"}}>
                                                    <DatePicker
                                                        style={{border: "none", fontSize: "14px"}}
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
                                                <div style={{width: "90px", marginLeft: "20px"}}>
                                                    <DatePicker
                                                        style={{border: "none", fontSize: "14px"}}
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
                                            <div
                                                style={{
                                                    width: "5%",
                                                    textAlign: "end",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <img src="/icons/Vector (6).svg" alt=""/>
                                            </div>
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Номер получателя
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {recipient?.phoneNumber || "-"}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px"}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Email получателя
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {recipient?.email || "-"}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    <div className="col-12" style={{marginTop: "14px", opacity: '0'}}>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}
                                        >
                                            Email получателя
                                        </div>
                                        <div style={{fontSize: "17px"}}>
                                            {recipient?.email || "-"}
                                        </div>
                                        <div style={{borderBottom: "1px solid #E2E8ED"}}></div>
                                    </div>
                                    {insurance ?
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}
                                            >
                                                Накладная (необязательно)
                                            </div>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    marginTop: "15px",
                                                }}
                                            >
                                                <label
                                                    className="custom-file-upload"
                                                    style={{marginTop: "-15px"}}
                                                >
                                                    <input
                                                        type="file"
                                                        onChange={(event) => setFile(event.target.files[0])}
                                                    />
                                                    <div
                                                        style={{
                                                            backgroundColor: "#E5EAF0",
                                                            padding: "6px 7px 7px",
                                                            fontSize: '12px',
                                                            borderRadius: "7px",
                                                            width: '150px'
                                                        }}
                                                    >
                                                        Прикрепить файл
                                                    </div>
                                                </label>
                                                {file.name ? (
                                                    <div
                                                        style={{
                                                            color: "#A3ACB6",
                                                            marginLeft: "20px",
                                                            fontSize: '12px',
                                                            marginTop: "-20px",
                                                        }}
                                                    >
                                                        {file && `${file.name}`}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            color: "#A3ACB6",
                                                            marginLeft: "20px",
                                                            fontSize: '12px',
                                                            marginTop: "-10px",
                                                        }}
                                                    >
                                                        Файл не выбран
                                                    </div>
                                                )}
                                            </div>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                            <div style={{
                                background: '#FFFFFF',
                                position: 'relative',
                                height: '20px',
                                margin: '0px -50px -18px -50px',
                                borderRadius: '10px'
                            }}></div>
                            <div style={{background: '#EEEFF0', margin: '0px -50px -50px -50px', padding: "20px 50px"}}>
                                <div className="row" style={{marginTop: '10px'}}>
                                    <div className="col-12 col-md-4">
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}>Стоимость заказа
                                            </div>
                                            <div style={{color: "#5C5F65", fontSize: "17px"}}>{price || '-'}</div>
                                        </div>
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}>Стоимость страховки
                                            </div>
                                            <div style={{
                                                color: "#5C5F65",
                                                fontSize: "17px"
                                            }}>{insurancePrice || '-'}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}>Сумма за заказы
                                            </div>
                                            <div style={{
                                                color: "#5C5F65",
                                                fontSize: "17px"
                                            }}>{price ? price * copyCount : '-'}</div>
                                        </div>
                                        <div className="col-12" style={{marginTop: "14px"}}>
                                            <div
                                                style={{
                                                    color: "#9BA0AB",
                                                    fontSize: "15px",
                                                    fontWeight: "lighter",
                                                }}>Сумма страховки
                                            </div>
                                            <div style={{
                                                color: "#5C5F65",
                                                fontSize: "17px"
                                            }}>{insurancePrice ? insurancePrice * copyCount : '-'}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="col-12"
                                             style={{
                                                 marginTop: "14px",
                                                 display: 'flex',
                                                 justifyContent: 'center',
                                                 alignItems: 'center',
                                                 height: '69px',
                                                 border: '2px solid #DDDEE2',
                                                 borderRadius: '10px'
                                             }}>
                                            <div>
                                                <div
                                                    style={{
                                                        color: "#9BA0AB",
                                                        fontSize: "15px",
                                                        fontWeight: "lighter",
                                                    }}>Итоговая стоимость
                                                </div>
                                                <div style={{
                                                    color: "#212529",
                                                    fontSize: "17px"
                                                }}>{price ? (price + insurancePrice) * copyCount : '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {errorTitle ? <div style={{
                                    color: 'red',
                                    marginTop: '16px',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}>{errorTitle}</div> : null}
                                <div style={{
                                    marginTop: "30px",
                                    height: '50px',
                                    width: "100%",
                                    alignItems: 'flex-end',
                                    display: "flex",
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div
                                            style={{
                                                color: "#9BA0AB",
                                                fontSize: "15px",
                                                fontWeight: "lighter",
                                            }}>Количество заказов
                                        </div>
                                        <div style={{width: '110px', display: 'flex', marginTop: '10px'}}>
                                            <div style={{cursor: 'pointer', position: 'relative', marginRight: '-12px'}}
                                                 onClick={() => {
                                                     setCopyCountQuery('-')
                                                 }}><img src="/icons/icon -.svg" height="35px"/></div>
                                            <div style={{
                                                height: '33px',
                                                width: '100%',
                                                borderTop: '2px solid #DDDEE2',
                                                borderBottom: '2px solid #DDDEE2',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {copyCount}
                                            </div>
                                            <div onClick={() => {
                                                setCopyCountQuery('+')
                                            }} style={{cursor: 'pointer', position: 'relative', marginLeft: '-12px'}}>
                                                <img src="/icons/icon +.svg" height="35px"/></div>

                                        </div>
                                    </div>
                                    {
                                        !isCalculation ?
                                            <div
                                                onClick={calculation}
                                                style={{
                                                    backgroundColor: "#C5115E",
                                                    color: "#ffffff",
                                                    padding: "10px 16px",
                                                    height: '44px',
                                                    cursor: "pointer",
                                                    fontSize: "13px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                Рассчитать стоимость
                                            </div>
                                            :
                                            <div
                                                onClick={createOrder}
                                                style={{
                                                    backgroundColor: "#C5115E",
                                                    color: "#ffffff",
                                                    padding: "10px 16px",
                                                    cursor: "pointer",
                                                    height: '44px',
                                                    fontSize: "13px",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                Подтвердить заказ
                                            </div>

                                    }
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
            {isLoading && (<Loading/>)}
        </>
    );
};

export default OrderEditeModal;
