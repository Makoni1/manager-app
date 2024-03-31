import React, {useEffect, useMemo, useState} from 'react';
import WrapperOrders from "../../../components/shared/WrapperContent";
import {File, Order} from "../../../services";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment/moment"
import OrdersCreateDesktopView from "../../../components/orders/views/OrdersCreateDesktopView";
import Loading from "../../../components/invoices/Loading";
import OrdersCreateMobileView from "../../../components/orders/views/OrdersCreateMobileView";
import OrdersHeader from "../../../components/orders/title";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useAmplitude} from "../../../hooks/useAmplitude";
import {onDebounce, requestErrorDisplay} from "../../../utils";
import {getUserId} from "@amplitude/analytics-browser";

const OrdersCreatePage = () => {
  const location = useLocation()
  const params = useParams()
  const { isMobile, isDesktop } = useWindowSize()
  const { amplitude } = useAmplitude()
  // TODO Need Refactoring
  const { user } = useSelector(state => state);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(params?.id ? params?.id : searchParams.get('id') ? searchParams.get('id') : null)
  const [recipientUpdate, setRecipientUpdate] = useState(0);
  const [isLoadingGet, setLoadingGet] = useState(location.pathname !== `/orders/draft/${orderId}/edit`);
  const [isChangedTitleInMobile, setChangeTitleForMobile] = useState(false);
  const [isBackBtn, setBackBtn] = useState(0);

  // Default data
  const [orderDraft, setOrderDraft] = useState(null);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState([]);

  // FORM
  // Selected data
  const [countryFrom, setCountryFrom] = useState();
  const [countryTo, setCountryTo] = useState();
  const [citiesFrom, setCitiesFrom] = useState([]);
  const [citiesTo, setCitiesTo] = useState([]);
  const [cityFrom, setCityFrom] = useState();
  const [cityTo, setCityTo] = useState();
  const [pickUpDate, setPickUpDate] = useState();
  const [pickUpStartTime, setPickUpStartTime] = useState();
  const [pickUpEndTime, setPickUpEndTime] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryStartTime, setDeliveryStartTime] = useState();
  const [deliveryEndTime, setDeliveryEndTime] = useState();
  const [addressTo, setAddressTo] = useState('');
  const [addressFrom, setAddressFrom] = useState();
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [weight, setWeight] = useState();
  const [volume, setVolume] = useState();
  // const [width, setWidth] = useState();
  // const [height, setHeight] = useState();
  // const [length, setLength] = useState();
  const [details, setDetails] = useState();
  const [copyCount, setCopyCount] = useState(1);
  const [price, setPrice] = useState();
  const [netPrice, setNetPrice] = useState();
  const [distance, setDistance] = useState();
  const [temperature, setTemperatury] = useState();
  const [loadingType, setLoadingType] = useState();
  const [calculationLoading, setCalculationLoading] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [declaredPrice, setDeclaredPrice] = useState(0);
  const [insurancePrice, setInsurancePrice] = useState();
  const [minPickDate, setMinPickDate] = useState(new Date(new Date().setHours(0)));
  const [minDeliveryDate, setMinDeliveryDate] = useState();

  // files
  const [files, setFiles] = useState([]);
  const [fileInvoice, setInvoiceFile] = useState(null);

  const onResetPrice = () => {
    setPrice(0);
    setNetPrice(0);
    setDistance(0);
  }

  const getDefaultData = async () => {
    setLoadingGet(true)
    try {
      await Order.getCountries(user.id)
        .then(response => {
          console.log('countries', response.data)
          setCountries(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });

      await Order.getCategories()
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });

      await Order.getTypes()
        .then(response => {
          console.log('types', response.data)
          setTypes(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });

      await Order.getTemperaturesDisc()
        .then(response => {
          console.log('Temperatures', response.data)
          setTemperatures(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });

      await Order.getLoadingTypesDisc()
        .then(response => {
          console.log('Temperatures', response.data)
          setLoadingTypes(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });

    } catch (e) {
      toast.error('Ошибка при загрузке данных')
    } finally {
      setLoadingGet(location.pathname === `/orders/draft/${orderId}/edit`)
    }
  }

  useEffect(() => {
    getDefaultData()
  }, []);

  useEffect(() => {
    if (
      orderId && location.pathname === `/orders/draft/${orderId}/edit` &&
      types.length && temperatures.length && loadingTypes.length && categories.length && countries.length
    ) {
      getOrderDetailDraft()
    }
  }, [orderId, types, temperatures, loadingTypes, categories, countries]);

  useEffect(() => {
    const responseEvent = (cities) => {
      setCitiesFrom(cities);
      if (orderDraft?.CityIdFrom && !cityFrom) {
        setCityFrom(cities?.find(c => c.id === orderDraft?.CityIdFrom))
      }
    }

    if (citiesTo.length && countryFrom?.id && countryTo?.id === countryFrom.id) {
      responseEvent(citiesTo)
    } else if (countryFrom?.id) {
      Order.getCities(countryFrom.id, user.id)
        .then(res => res.data)
        .then(data => {
          const cities = data?.sort((a, b) => a.name.localeCompare(b.name))
          console.log('cities', cities)
          responseEvent(cities)
        })
        .catch(error => {
          requestErrorDisplay(error)
        });
    }
  }, [countryFrom]);

  useEffect(() => {
    const responseEvent = (cities) => {
      setCitiesTo(cities);
      if (orderDraft?.CityIdTo && !cityTo) {
        setCityTo(cities?.find(c => c.id === orderDraft?.CityIdTo))
      }
    }
    if (citiesFrom.length && countryTo?.id && countryFrom?.id === countryTo.id) {
      responseEvent(citiesFrom)
    } else if (countryTo?.id) {
      Order.getCities(countryTo.id)
        .then(res => res.data)
        .then(data => {
          const cities = data?.sort((a, b) => a.name.localeCompare(b.name))
          console.log('cities', cities)
          responseEvent(cities)
        })
        .catch(error => {
          requestErrorDisplay(error)
        });
    }
  }, [countryTo]);

  const getOrderDetailDraft = async () => {
    try {
      const res = await Order.getDraftOrder(orderId)
      const data = JSON.parse(res.data?.jsonData || "null")
      /*
      * @return Object
      * [keyFromServer]: {
      *   setEvent: Function
      *   valueType?: String
      *   findKey?: String // required if `items` is not empty
      *   items?: Array // required if `findKey` is not empty
      * }
      * */
      const discDraftKeys = {
        AddressFrom: {
          setEvent: setAddressFrom,
        },
        AddressTo: {
          setEvent: setAddressTo,
        },
        RecipientEmail: {
          setEvent: setRecipientEmail,
        },
        RecipientName: {
          setEvent: setRecipientName,
        },
        RecipientPhoneNumber: {
          setEvent: setRecipientPhone,
        },
        Details: {
          setEvent: setDetails,
        },
        Distance: {
          setEvent: setDistance,
        },
        IsInsurance: {
          setEvent: setInsurance,
        },
        DeclaredPrice: {
          setEvent: setDeclaredPrice,
        },
        CopyCount: {
          setEvent: setCopyCount,
        },
        Volume: {
          valueType: "string",
          setEvent: setVolume,
        },
        Weight: {
          valueType: "string",
          setEvent: setWeight,
        },
        VehicleType: {
          setEvent: setType,
          findKey: "value",
          items: types
        },
        TemperatureId: {
          setEvent: setTemperatury,
          findKey: "id",
          items: temperatures
        },
        LoadingTypeId: {
          setEvent: setLoadingType,
          findKey: "id",
          items: loadingTypes
        },
        Category: {
          setEvent: setCategory,
          findKey: "value",
          items: categories
        },
        CountryIdFrom: {
          setEvent: setCountryFrom,
          findKey: "id",
          items: countries
        },
        CountryIdTo: {
          setEvent: setCountryTo,
          findKey: "id",
          items: countries
        }
      }
      setOrderDraft(data)

      if (data) {
        for (const draftKey in discDraftKeys) {
          const valueFromServer = data[draftKey]
          if (valueFromServer) {
            const item = discDraftKeys[draftKey]
            if (item.findKey) {
              item.setEvent(item.items.find(c => c[item.findKey] === valueFromServer))
            } else if (item.valueType === "string") {
              item.setEvent(valueFromServer.toString())
            } else {
              item.setEvent(valueFromServer)
            }
          }
        }
      }
      if (data?.ShippingDate) {
        const dateFormat = moment(data?.ShippingDate).format("YYYY-MM-DD")
        setPickUpDate(new Date(dateFormat + "T00:00:00"))
        const startTime = data?.ShippingHourFrom ? (data?.ShippingHourFrom > 9 ? data?.ShippingHourFrom : "0" + data?.ShippingHourFrom) : "09"
        const endTime = data?.ShippingHourTo ? (data?.ShippingHourTo > 9 ? data?.ShippingHourTo : "0" + data?.ShippingHourTo) : "18"
        setPickUpStartTime(new Date(dateFormat + `T${startTime}:00:00`))
        setPickUpEndTime(new Date(dateFormat + `T${endTime}:00:00`))
      }
      if (data?.UnloadingDate) {
        const dateFormat = moment(data?.UnloadingDate).format("YYYY-MM-DD")
        setDeliveryDate(new Date(dateFormat + "T00:00:00"))
        const startTime = data?.UnloadingHourFrom ? (data?.UnloadingHourFrom > 9 ? data?.UnloadingHourFrom : "0" + data?.UnloadingHourFrom) : "09"
        const endTime = data?.UnloadingHourTo ? (data?.UnloadingHourTo > 9 ? data?.UnloadingHourTo : "0" + data?.UnloadingHourTo) : "18"
        setDeliveryStartTime(new Date(dateFormat + `T${startTime}:00:00`))
        setDeliveryEndTime(new Date(dateFormat + `T${endTime}:00:00`))
      }
    } catch (e) {
      requestErrorDisplay(e)
      throw e
    } finally {
      setLoadingGet(false)
    }
  }

  const formData = () => {
    return {
      "userId": user.id,
      "price": price,
      "netPrice": netPrice,
      "distance": distance,
      "countryIdFrom": countryFrom?.id,
      "countryNameFrom": countryFrom?.name,
      "cityNameFrom": cityFrom?.name,
      "cityFromName": cityFrom?.name,
      "cityIdFrom": cityFrom?.id,
      "addressFrom": addressFrom,
      "shippingDate": pickUpDate,
      "shippingHourFrom": pickUpStartTime ? Number(moment(pickUpStartTime).format("HH")) : null,
      "shippingHourTo": pickUpEndTime ? Number(moment(pickUpEndTime).format("HH")) : null,
      "recipientName": recipientName,
      "recipientEmail": recipientEmail,
      "recipientPhoneNumber": recipientPhone,
      "countryIdTo": countryTo?.id,
      "countryNameTo": countryTo?.name,
      "cityIdTo": cityTo?.id,
      "cityNameTo": cityTo?.name,
      "addressTo": addressTo,
      "unloadingDate": deliveryDate,
      "unloadingHourFrom": deliveryStartTime ? Number(moment(deliveryStartTime).format("HH")) : null,
      "unloadingHourTo": deliveryEndTime ? Number(moment(deliveryEndTime).format("HH")) : null,
      "details": details || "Нет описания",
      "weight": weight?.replace(',', '.'),
      "volume": volume?.replace(',', '.'),
      // "length": length,
      // "width": width,
      // "height": height,
      "category": category?.value,
      "vehicleType": type?.value,
      "loadingTypeId": loadingType?.id,
      "temperatureId": temperature?.id,
      // "recipientBusinessIdentificationNumber": "111111",
      "isInsurance": insurance,
      "declaredPrice": declaredPrice,
      "insurancePrice": insurancePrice,
      "copyCount": copyCount
    }
  }

  const createDraftOrder = (withAlert = false) => {
    const orderType = orderId ? "updateDraft" : "createDraft"
    Order[orderType](formData(), orderId)
      .then(res => res.data)
      .then(response => {
        let oId = orderId
        if (!oId) {
          oId = response.id
          setOrderId(oId)
        }

        if (insurance && fileInvoice?.name) {
          uploadFile(oId, fileInvoice)
        }
        if (files.length) {
          files.forEach(f => uploadFile(oId, f, 5))
        }
        if (withAlert) {
          toast.success("Сохранено в черновики")
          if (searchParams.get("is-draft") !== "1") {
            navigate(`/orders/draft/${oId}/edit?is-draft=1`);
          }
        }
      })
      .catch(error => {
        console.log(error);
        requestErrorDisplay(error, "[createDraftOrder] - Произошла ошибка, попробуйте позже")
      });
  }

  const saveDraft = (withOutDebounce = false) => {
    if (withOutDebounce) {
      createDraftOrder(true)
    } else {
      onDebounce(() => createDraftOrder(false), 400)
    }
  }

  const createOrder = () => {
    const data = formData()

    console.log('[CREATE ORDER DATA]', data);

    Order.create(data)
      .then(res => res.data)
      .then(response => {
        amplitude.createOrder(response.id, insurance, response.createdAt)
        if (insurance && fileInvoice?.name) uploadFile(response.id, fileInvoice)
        if (files.length) {
          files.forEach(f => uploadFile(response.id, f, 5))
        }
        toast.success("Заказ создан.")
        if (response.id) {
          navigate(`/order/${response.id}?created=1`);
        } else {
          navigate(`/main`);
        }

      })
      .catch(error => {
        console.log(error);
        requestErrorDisplay(error, "Произошла ошибка, попробуйте позже")
      });
  }

  const orderCalculation = () => {
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
        if (response.status == 200) {
          if (isDesktop) amplitude.orderCalculatePrice(response.data.price, response.data.netPrice, data, insurance)
          setPrice(response.data.price);
          setNetPrice(response.data.netPrice);
          setDistance(response.data.distance);
          setCalculationLoading(false);
        } else {
          console.log(response);
          toast.error("[Calculation] - Произошла ошибка, попробуйте позже")
        }
      })
      .catch(error => {
        console.log(error);
        requestErrorDisplay(error, "Произошла ошибка, попробуйте позже")
        setCalculationLoading(false);
      });
  }

  const uploadFile = (orderId, file, type = 0) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type)
    formData.append("orderId", orderId)
    Promise.all([
      File.addOrderDoc(formData)
    ]).then(() => {
      toast.info("Файл успешно загружен")
    })
      .catch(error => {
        console.log(error)
        requestErrorDisplay(error, "[uploadFile] Произошла ошибка, попробуйте позже")
      });
  }

  const queryInsurance = () => {
    if (insurance) {
      setInsurance(false)
      setDeclaredPrice(0)
      setInsurancePrice(null)
      setInvoiceFile({})
    } else {
      setInsurance(true)
    }
  }
  const calcInsurance = val => {
    setDeclaredPrice(val)
    if (+val) setInsurancePrice(Math.trunc((+val / 100) * 0.3))
    else setInsurancePrice(null)
  }

  if (isLoadingGet) {
    return <Loading inBlock />
  }

  const getPropsData = () => ({
    setCountryFrom,
    setCityFrom,
    countries,
    countryFrom,
    citiesFrom,
    cityFrom,
    countryTo,
    setCountryTo,
    setCityTo,
    citiesTo,
    cityTo,
    pickUpDate,
    pickUpStartTime,
    pickUpEndTime,
    minPickDate,
    setPickUpDate,
    setPickUpStartTime,
    setPickUpEndTime,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
    minDeliveryDate,
    setDeliveryDate,
    setDeliveryStartTime,
    setDeliveryEndTime,
    types,
    setType,
    setTemperatury,
    type,
    addressTo,
    setAddressTo,
    setRecipientPhone,
    setRecipientName,
    recipientName,
    recipientUpdate,
    setRecipientEmail,
    addressFrom,
    setAddressFrom,
    setRecipientUpdate,
    volume,
    setVolume,
    weight,
    setWeight,
    categories,
    category,
    setCategory,
    temperatures,
    temperature,
    loadingTypes,
    loadingType,
    setLoadingType,
    details,
    setDetails,
    insurance,
    queryInsurance,
    declaredPrice,
    calcInsurance,
    fileInvoice,
    setInvoiceFile,
    files,
    setFiles,
    distance,
    price,
    insurancePrice,
    calculationLoading,
    copyCount,
    setCopyCount,
    createOrder,
    orderCalculation,
    onResetPrice,
    saveDraft,
  })

  return (
    <WrapperOrders displayCreateBtn={false}>
      {/* Header */}
      <OrdersHeader
        title={isChangedTitleInMobile ? "Оформление заявки" : "Создание заказа"}
        displayLogo={isDesktop}
        displayBackBtn={isMobile}
        displayBackBtn2={isChangedTitleInMobile}
        backBtn={() => isChangedTitleInMobile ? setChangeTitleForMobile(false) : setBackBtn(prev => prev + 1)}
      />

      {/* Content */}
      { isDesktop && <OrdersCreateDesktopView {...getPropsData()} /> }
      { isMobile && <OrdersCreateMobileView
        {...getPropsData()}
        setChangeTitleForMobile={setChangeTitleForMobile}
        isChangedTitleInMobile={isChangedTitleInMobile}
        isBackBtn={isBackBtn}
      /> }
    </WrapperOrders>
  );
};

export default OrdersCreatePage;