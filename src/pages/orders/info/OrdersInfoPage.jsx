import React, {useEffect, useState} from 'react';
import WrapperOrders from "../../../components/shared/WrapperContent";
import OrdersHeader from "../../../components/orders/title";
import OrdersContent from "../../../components/orders/content";
import SectionItem from "../../../components/orders/section-item";
import OrdersSectionItemInfoColumn from "../../../components/orders/section-item/components/OrdersSectionItemInfoColumn";
import OrdersSectionItemTableStatusLine from "../../../components/orders/section-item/components/OrdersSectionItemTableStatusLine";
import OrdersContentColumn from "../../../components/orders/content/OrdersContentColumn";
import OrdersLocationInfo from "../../../components/orders/location-info";
import OrdersDatePicker from "../../../components/orders/date-picker";
import OrdersTransportType from "../../../components/orders/transport-type/OrdersTransportType";
import OrdersSectionActions from "../../../components/orders/section-item/components/OrdersSectionActions";
import OrdersMap from "../../../components/orders/map/OrdersMap";
import {useParams, useSearchParams, useNavigate} from "react-router-dom";
import Loading from "../../../components/invoices/Loading";
import {File, Order} from "../../../services";
import {useSelector} from "react-redux";
import OrdersSectionItemDriverInfo from "../../../components/orders/section-item/components/OrdersSectionItemDriverInfo";
import {numberToFinanceFormat} from "../../../utils";
import OrdersShareModal from "../../../components/orders/orders-share-modal";
import OrdersDocuments from "../../../components/orders/orders-documents";
import {toast} from "react-toastify";
import {useWindowSize} from "../../../hooks/useWindowSize";
import ModalConfirm from "../../../components/shared/ModalWindow/Confirm";

const OrdersInfoPage = () => {
  const params = useParams();
  const { isMobile } = useWindowSize()
  const [searchParams, setSearchParams] = useSearchParams();
  const {user} = useSelector(state => state);

  const [forceUpdate, setForceUpdate] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [isShareModalDisplay, changeShareModal] = useState(false)
  const [getOrder, setOrder] = useState(null)
  const [getFiles, setFiles] = useState([])

  const [countryFrom, setCountryFrom] = useState();
  const [countryTo, setCountryTo] = useState();
  const [cityFrom, setCityFrom] = useState();
  const [cityTo, setCityTo] = useState();
  const [cargoDetails, setCargoDetails] = useState();
  const [recipient, setRecipient] = useState();
  const navigate = useNavigate();
  const orderId = params.id
  const fetchOrderData = async () => {
    setLoading(true)
    try {
      const {data} = await Order.getOrderById(orderId)
      if (data.shippingDate) {
        let date = data.shippingDate.split("T")
        const timeStart = data.shippingHourFrom < 10 ? `0${data.shippingHourFrom}` : data.shippingHourFrom
        const timeEnd = data.shippingHourTo < 10 ? `0${data.shippingHourTo}` : data.shippingHourTo
        data.shippingDate = `${date[0]}T${timeStart}:00:00`
        data.shippingDateEnd = `${date[0]}T${timeEnd}:00:00`
      }
      if (data.unloadingDate) {
        let date = data.unloadingDate.split("T")
        const timeStart = data.unloadingHourFrom < 10 ? `0${data.unloadingHourFrom}` : data.unloadingHourFrom
        const timeEnd = data.unloadingHourTo < 10 ? `0${data.unloadingHourTo}` : data.unloadingHourTo
        data.unloadingDate = `${date[0]}T${timeStart}:00:00`
        data.unloadingDateEnd = `${date[0]}T${timeEnd}:00:00`
      }
      console.log(data)
      setOrder(data)
    } catch (e) {
      console.log(e)
      toast.error(e)
      toast.error("Произошла ошибка, попробуйте позже")
    } finally {
      setLoading(false)
    }
  }
  const fetchFilesByOrderData = async () => {
    try {
      const {data} = await File.getFilesByOrder(orderId)
      setFiles(data)
    } catch (e) {
      console.log(e)
      toast.error(e)
      toast.error("Произошла ошибка, попробуйте позже")
    }
  }

  useEffect(() => {
    fetchOrderData()
    fetchFilesByOrderData()
  }, [forceUpdate])

  useEffect(() => {
    if (getOrder) {
      Order.getCountryById(getOrder.countryIdFrom).then((response) => {
        if (response.status == 200) {
          setCountryFrom(response.data.name);
        } else {
          setCountryFrom(null);
        }
      }).catch(error => {
        console.log(error);
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });

      Order.getCountryById(getOrder.countryIdTo).then((response) => {
        if (response.status == 200) {
          setCountryTo(response.data.name);
        } else {
          setCountryTo(null);
        }
      }).catch(error => {
        console.log(error);
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });

      Order.getCityById(getOrder.cityIdFrom).then((response) => {
        if (response.status == 200) {
          setCityFrom(response.data);
        } else {
          setCityFrom(null);
        }
      }).catch(error => {
        console.log(error);
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });

      Order.getCityById(getOrder.cityIdTo).then((response) => {
        if (response.status == 200) {
          setCityTo(response.data);
        } else {
          setCityTo(null);
        }
      }).catch(error => {
        console.log(error);
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });

      Order.getCargo(getOrder.cargoId).then((response) => {
        // console.log('[CARGO] details ====>', response.data)
        if (response.status == 200) {
          setCargoDetails(response.data);
        } else {
          setCargoDetails({})
        }
      }).catch(error => {
        console.log(error);
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });

      Order.getRecipient(getOrder.recipientId)
        .then(response => {
          // console.log('RECIPIENT', response.data);
          if (response.status == 200) {
            setRecipient(response.data);
          } else {
            setRecipient({})
          }
        }).catch(error => {
        console.log(error)
        toast.error("Произошла ошибка, попробуйте позже")
        toast.error(error)
      });
    }
  }, [getOrder]);

  if (isLoading || !getOrder) {
    return <Loading />
  }

  return (
    <WrapperOrders>
      <div style={{ marginBottom: '5px' }}>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>
      {/* Header */}
      <OrdersHeader
        title={'Заказ №' + getOrder.number}
        displayCreateBtn
      />

      {/* Content */}
      <OrdersContent column={isMobile ? 1 : 2} withAdaptive>
        {/* Info */}
        <OrdersContentColumn>

          {/* Section Status and Price */}
          <SectionItem isCompact column={2} >

            <OrdersSectionItemInfoColumn title="Стоимость" isTextBig>
              {numberToFinanceFormat(getOrder.price)} ₸
            </OrdersSectionItemInfoColumn>

            <OrdersSectionItemInfoColumn title="Статус">
              <OrdersSectionItemTableStatusLine status={getOrder.clientStatus} />
            </OrdersSectionItemInfoColumn>

          </SectionItem>

          {/* Section info delivery */}
          <SectionItem isCompact column={isMobile ? 1 : 2} title="Информация о доставке" gridColumnGap={30} gridGapRow={isMobile ? 10 : 30}>

            <OrdersSectionItemInfoColumn title="Отправитель" withArrowRight={!isMobile}>
              <OrdersLocationInfo isSender address={`г. ${cityFrom?.name}, ${getOrder.addressFrom}`} companyName={user?.name || '-'} phoneNumber={user?.phoneNumber} />
            </OrdersSectionItemInfoColumn>

            { isMobile && (
              <OrdersSectionItemInfoColumn title="Дата отправки">
                <OrdersDatePicker
                  date={getOrder.shippingDate}
                  timeStart={getOrder.shippingDate}
                  timeEnd={getOrder.shippingDateEnd}
                />
              </OrdersSectionItemInfoColumn>
            )}

            <OrdersSectionItemInfoColumn title="Получатель">
              <OrdersLocationInfo address={`г. ${cityTo?.name}, ${getOrder.addressTo}`} companyName={recipient?.name} phoneNumber={recipient?.phoneNumber} />
            </OrdersSectionItemInfoColumn>

            { !isMobile && (
              <OrdersSectionItemInfoColumn title="Дата отправки">
                <OrdersDatePicker
                  date={getOrder.shippingDate}
                  timeStart={getOrder.shippingDate}
                  timeEnd={getOrder.shippingDateEnd}
                />
              </OrdersSectionItemInfoColumn>
            )}

            <OrdersSectionItemInfoColumn title="Дата прибытия">
              <OrdersDatePicker
                date={getOrder.unloadingDate}
                timeStart={getOrder.unloadingDate}
                timeEnd={getOrder.unloadingDateEnd}
              />
            </OrdersSectionItemInfoColumn>

          </SectionItem>

          {/* Section Cargo Information */}
          <SectionItem isCompact column={isMobile ? 1 : 3} title="Информация о грузе" gridColumnGap={30} gridGapRow={isMobile ? 14 : 30}>

            { isMobile && (
              <OrdersSectionItemInfoColumn title="Транспорт">
                <OrdersTransportType type={getOrder?.vehicleType} text={getOrder?.vehicleTypeName} />
              </OrdersSectionItemInfoColumn>
            )}
            <OrdersSectionItemInfoColumn title="Тип груза">
              {cargoDetails?.categoryName}
            </OrdersSectionItemInfoColumn>

            <OrdersSectionItemInfoColumn title="Температурный режим">
              Нет
            </OrdersSectionItemInfoColumn>

            { !isMobile && (
              <OrdersSectionItemInfoColumn title="Транспорт">
                <OrdersTransportType type={getOrder?.vehicleType} style={{ marginBottom: '-75px' }} text={getOrder?.vehicleTypeName} />
              </OrdersSectionItemInfoColumn>
            )}

            <OrdersSectionItemInfoColumn title="Габариты">
              {cargoDetails?.weight} тонн
            </OrdersSectionItemInfoColumn>

            <OrdersSectionItemInfoColumn title="Опасный груз">
              Нет
            </OrdersSectionItemInfoColumn>

          </SectionItem>

          {/* Section Driver Information */}
          <SectionItem isCompact column={1} title="Информация об исполнителе" gridColumnGap={30} gridGapRow={isMobile ? 10 : 30}>
            <OrdersSectionItemDriverInfo driverId={getOrder?.driverId} />
          </SectionItem>

          {/* Documents */}
          <SectionItem isCompact column={1} title="Документы" gridColumnGap={30} gridGapRow={30}>
            {
              getFiles.length
                ? <OrdersDocuments files={getFiles} />
                : <span>Не прикреплен</span>
            }

          </SectionItem>

          {/* Actions */}
          <OrdersSectionActions order={getOrder} orderId={orderId} onForceUpdate={() => setForceUpdate(prev => prev + 1)} />

        </OrdersContentColumn>

        {/* Location */}
        <OrdersContentColumn hide={isMobile}>
          <OrdersMap
            countryFrom={countryFrom}
            countryTo={countryTo}
            cityFrom={cityFrom}
            cityTo={cityTo}
            orderId={orderId}
            order={getOrder}
            orderNumber={getOrder.number}
            driverId={getOrder?.driverId}
          />
        </OrdersContentColumn>
      </OrdersContent>
      { isShareModalDisplay && <OrdersShareModal /> }
      { searchParams.get("created") === "1" && <ModalConfirm
          onClose={() => setSearchParams({ created: 0 })}
          title={"Заказ создан"}
          summary={<span>Заказ отправлен на модерацию <br/> Обычно это занимает не более 10 минут</span>}
        />
      }
    </WrapperOrders>
  );
};

export default OrdersInfoPage;