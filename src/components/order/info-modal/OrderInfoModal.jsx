import React, {useEffect, useState} from 'react';
import {Order, User} from '../../../services';
import {SkeletonTheme} from 'react-loading-skeleton';
import {useSelector} from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import 'leaflet/dist/leaflet.css';
import '../info/styles.css';
import DriverSelectionModal from '../info/DriverSelectionModal';
import {numberToFinanceFormat, requestErrorDisplay} from '../../../utils';
import moment from 'moment';
import style from "./info-modal.module.scss"
import styleAvailableCard from "../../orders/available/card/OrdersAvailableCard.module.scss"
import ModalWindow from "../../shared/ModalWindow";
import OrdersMap from "../../orders/map/OrdersMap";
import ClockIcon from "../../shared/icons/ClockIcon";
import SenderIcon from "../../shared/icons/SenderIcon";
import LocationIcon from "../../shared/icons/LocationIcon";
import CarIcon from "../../shared/icons/CarIcon";
import {toast} from "react-toastify";
import Collapse from "../../shared/Collapse";
import OrderInfoCard from "./OrderInfoCard";
import SupportModal from "../../shared/SupportModal";
import Loading from '../../invoices/Loading';
import cn from 'classnames';
import Driver from '../../orders/driver';

const OrderInfoModal = ({orderId, onClose}) => {
    const {user} = useSelector(state => state);
    const isExpeditor = user.type === "Expeditor";
    const [showDriverSelect, setShowDriverSelect] = useState(false);

    const [item, setItem] = useState(null);
    const [isBooked, setBooked] = useState(false);
    const [countryFrom, setCountryFrom] = useState();
    const [countryTo, setCountryTo] = useState();
    const [cityFrom, setCityFrom] = useState();
    const [cityTo, setCityTo] = useState();
    const [vehicle, setVehicle] = useState(null);
    const [driver, setDriver] = useState();

    const [isSupportModal, setSupportModal] = useState(false);
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        if (orderId) {
            User.getHistory(orderId)
              .then(res => res.data)
                .then(data => {
                    setHistoryList(data)
                })
                .catch((error) => {
                    requestErrorDisplay(error)
                });
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) {
            Order.getOrderForExpeditor({ orderId })
            .then(res => res.data)
            .then(data => {
                setBooked(data.isBooked || data.order?.status === "booked")
                setItem(data.order)
                setDriver(data.driver)
                setVehicle(data.vehicle)
            })
            .catch((error) => {
                requestErrorDisplay(error)
            });
        }
    }, [orderId]);

    useEffect(() => {
        if (item) {
            Order.getCountryById(item.countryIdFrom).then((response) => {
                if (response.status == 200) {
                    setCountryFrom(response.data.name);
                } else {
                    setCountryFrom('');
                }
            }).catch(error => {
                requestErrorDisplay(error)
            });

            Order.getCountryById(item.countryIdTo).then((response) => {
                if (response.status == 200) {
                    setCountryTo(response.data.name);
                } else {
                    setCountryTo('');
                }
            }).catch(error => {
                requestErrorDisplay(error)
            });

            Order.getCityById(item.cityIdFrom).then((response) => {
                if (response.status == 200) {
                    setCityFrom(response.data);
                } else {
                    setCityFrom('');
                }
            }).catch(error => {
                requestErrorDisplay(error)
            });

            Order.getCityById(item.cityIdTo).then((response) => {
                if (response.status == 200) {
                    setCityTo(response.data);
                } else {
                    setCityTo('');
                }
            }).catch(error => {
                requestErrorDisplay(error)
            });

        }
    }, [item]);

    if (!item) {
        return <Loading inBlock />
    }

    return (
        <>
            <ModalWindow
                closeBtnWithBg
                padding="none"
                maxWidth={"1200px"}
                onClose={onClose}
            >
                <SkeletonTheme color="#e5ebf2" highlightColor="#f0f4f7">
                    <div className={style.wrapper}>
                        <div className='col-12'>
                            <OrdersMap
                              displayBanner={false}
                              cityFrom={cityFrom}
                              cityTo={cityTo}
                              isLoading={false}
                              countryTo={countryTo}
                              countryFrom={countryFrom}
                            />
                        </div>
                        <div className={style.content}>
                                <div className={cn("d-flex", style.gap12)}>
                                    <div className={cn("col-7")}>
                                        <Collapse
                                            gridCol={1}
                                            gridGap={10}
                                            isDisplay={false}
                                            text={"Показать историю"}
                                            minHeight={264}
                                            classNameBtn={style.btn_history}
                                        >
                                            <div className={cn(style.card, style.card__mb0)}>
                                                <div className={style.card__icon}>
                                                    <SenderIcon />
                                                </div>
                                                <div>
                                                    <span>Погрузка 1</span>
                                                    <p className={style.card__title}>{cityFrom?.name}, {countryFrom}</p>
                                                    <span className={style.card__date}>
                                                    { moment(item.shippingDate).format("DD MMMM") }, {" "}
                                                        { item.unloadingHourFrom }:00 - { item.unloadingHourTo }:00
                                                </span>
                                                </div>
                                            </div>
                                            <div className={cn(style.card, style.card__mb0)}>
                                                <div className={style.card__icon}>
                                                    <LocationIcon />
                                                </div>
                                                <div>
                                                    <span>Выгрузка</span>
                                                    <p className={style.card__title}>{cityTo?.name}, {countryTo}</p>
                                                    <span className={style.card__date}>
                                                    { moment(item.unloadingDate).format("DD MMMM") },{" "}
                                                        { item.shippingHourFrom }:00 - { item.shippingHourTo }:00
                                                </span>
                                                </div>
                                            </div>
                                            {historyList.slice().reverse().map((history, idx) => (
                                              <div key={history.createdAt + "-" + idx} className={cn(style.card, style.card__mb0)} style={{alignItems: "center"}}>
                                                  <div className={style.card__icon}>
                                                      <ClockIcon fullContent />
                                                  </div>
                                                  <div>
                                                      <span>{history.statusName}</span>
                                                  </div>
                                              </div>
                                            ))}
                                        </Collapse>
                                    </div>
                                    <div className="col-5">
                                        <OrderInfoCard order={item} displayBtnBooking={!isBooked} displayBtnBookingEdit={isBooked} />

                                        { isBooked && (
                                            <div className={style.card}>
                                                <div style={{width: "100%"}}>
                                                    <div className={style.card__mb22}>Транспорт и водитель</div>
                                                    { vehicle && (
                                                        <div className={cn(style.card__summary, style.card__mb10)}>
                                                            <div className={style.card__mb10}>Транспорт</div>
                                                            <Driver.DriverTransport
                                                                item={vehicle}
                                                                displayStatus={false}
                                                            />
                                                        </div>
                                                    )}
                                                    { driver && (
                                                        <div className={cn(style.card__summary, style.card__mb10)}>
                                                            <div className={style.card__mb10}>Водитель</div>
                                                            <Driver.DriverCard
                                                                item={driver}
                                                                displayStatus={false}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        <div className={style.footer}>
                            <span onClick={() => setSupportModal(true)}>
                                Поддержка
                            </span>
                            <span  onClick={() => setSupportModal(true)}>
                                Сообщить об ошибке
                            </span>
                        </div>
                    </div>
                </SkeletonTheme>
            </ModalWindow>

            {
                showDriverSelect &&
                    <DriverSelectionModal
                        onClose={() => setShowDriverSelect(false)}
                        orderId={item.id}
                    />
            }
            { isSupportModal && <SupportModal onClose={() => setSupportModal(false)} display={isSupportModal} displayHeader={false} /> }
        </>
    );
}

export default OrderInfoModal
