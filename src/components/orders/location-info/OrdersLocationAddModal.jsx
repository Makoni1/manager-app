import React, {useEffect, useState} from 'react';
import ModalWindow from "../../shared/ModalWindow";

import style from "./style.module.scss"
import OrdersLocationInfo from "./index";
import OrdersSectionItemInfoColumn from "../section-item/components/OrdersSectionItemInfoColumn";
import SelectCustom from "../../shared/forms/select-custom";
import InputCustom from "../../shared/forms/input-custom";
import InputSearch from "../../shared/forms/input-search";
import {Order} from "../../../services";
import InputMask from "react-input-mask";
import cn from "classnames";
import {toast} from "react-toastify";
import Loading from "../../invoices/Loading";
import {get} from "../../../services/config";
import {useSelector} from "react-redux";
import {requestErrorDisplay} from '../../../utils';

const phoneNumberMask = '+79999999999';

const OrdersLocationAddModal = ({
  onClose,
  updateContent,
  searchText = "",
  titleEnd = "",
  displayBin = false,
  isSender = false,
  countries = [],
  countrySelected,
  citySelected,
  onChangeCity,
  onChangeCountry,
}) => {
  const { user } = useSelector(state => state);
  const [name, setName] = useState(null)
  const [country, setCountry] = useState(countrySelected)
  const [binData, setBinData] = useState()
  const [cities, setCities] = useState();
  const [city, setCity] = useState(citySelected)
  const [address, setAddress] = useState(searchText || null)
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id && isSender) {
      setPhone(user?.phoneNumber || null)
    }
    setEmail(user?.email || null)
  }, [user, isSender])

  useEffect(() => {
    if (country) {
      Order.getCities(country.id)
        .then(response => {
          console.log('cities 111', country, response)
          setCities(response.data.sort(function (a, b) {
            return a.name.localeCompare(b.name)
          }));
        })
        .catch(error => {
          console.log(error);
          toast.error(error)
        });
    }
  }, [country]);

  const getInfoByBin = async (bin) => {
    try {
      const { data } = await get(`/v1/users/gov/juridical`, { params: {
          bin, lang: "ru"
        }})
      if (!data.success) {
        throw data
      }
      setBinData(data.obj)
      setName(data?.obj?.name)
    } catch (e) {
      console.log("error", e)
    }
  }

  const validationData = () => {
    let allow = true
    if (!isSender && !name) {
      toast.error('Заполните поле "Название организации получателя"')
      allow = false
    }
    if (!phone) {
      toast.error('Заполните поле "Контактный телефон"')
      allow = false
    }
    if (!address) {
      toast.error('Заполните поле "Адрес"')
      allow = false
    }
    if (!country?.id) {
      toast.error('Заполните поле "Страна"')
      allow = false
    }
    if (!city?.id) {
      toast.error('Заполните поле "Город"')
      allow = false
    }
    return allow
  }

  const submitHandle = () => {

    if (!validationData()) {
      return
    }

    const formData = {
      countryId: country?.id,
      cityId: city?.id,
      phoneNumber: phone.replace("+", ""),
      email: email,
      fullAddress: address,
    }
    if (isSender) {
      formData["type"] = 0
    } else {
      formData["type"] = 1
      formData["name"] = name
    }

    setLoading(true)
    Order.getUserAddressCreate(formData)
      .then(res => res.data)
      .then(response => {
        toast.info("Запись успешно создан")
        updateContent(response)
        console.log('submit', country, response)
      })
      .catch(error => {
        requestErrorDisplay(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const startSearch = bin => {
    if (bin.length === 12) {
      getInfoByBin(bin)
    } else {
      setBinData(null)
    }
  }

  return (
    <ModalWindow onClose={onClose}>
      <div className={style.modal}>
        <h3>
          Добавить адрес <br/> { titleEnd }
        </h3>
        {/* Bin */}
        { displayBin && (
          <>
            {/* Input Search */}
            <InputSearch placeholder={'Поиск по БИН/ИИН'} onGetText={startSearch} />
            {/* Input Name bin */}
            <OrdersSectionItemInfoColumn title="Название организации получателя">
              <InputCustom
                defaultValue={name}
                onChangeValue={setName}
                isDisabled={binData}
                placeholder={'Введите название'}
              />
            </OrdersSectionItemInfoColumn>
          </>
        )}
        {/* Select Country */}
        <OrdersSectionItemInfoColumn title="Страна">
          <SelectCustom
            options={countries}
            onSubmit={(country) => {
              setCountry(country); setCity(null); onChangeCountry(country)
            }}
            defaultValue={country}
            returnObject
          />
        </OrdersSectionItemInfoColumn>
        {/* Select City */}
        <OrdersSectionItemInfoColumn title="Город">
          <SelectCustom
            key={city?.id}
            options={cities}
            defaultValue={city}
            onSubmit={city => {
              setCity(city); onChangeCity(city)
            }}
            isDisabled={!country}
            returnObject
          />
        </OrdersSectionItemInfoColumn>
        {/* Input location */}
        <OrdersSectionItemInfoColumn title="Адрес">
          <InputCustom
            onChangeValue={setAddress}
            defaultValue={address}
            placeholder="Введите адрес"
          />
        </OrdersSectionItemInfoColumn>
        {/* Input Phone */}
        <OrdersSectionItemInfoColumn title="Контактный телефон">
          <InputMask
            value={phone}
            maskChar={null}
            mask={phoneNumberMask}
            onChange={(event) => setPhone(event.target.value)}
            disabled={false}
          >
            {(inputProps) => (
              <InputCustom
                {...inputProps}
                defaultValue={phone}
                onChangeValue={setPhone}
                placeholder="Введите телефон"
              />
            )}
          </InputMask>
        </OrdersSectionItemInfoColumn>
        {/* Input Email */}
        <OrdersSectionItemInfoColumn title="E-mail">
          <InputCustom
            onChangeValue={setEmail}
            defaultValue={email}
            placeholder="E-mail"
          />
        </OrdersSectionItemInfoColumn>
        {/* Action submit */}
        <button
          type="button"
          className={cn(style.modal_button, {
              [style.modal_button_disabled]: !country || !city
          })}
          onClick={submitHandle}
        >
          { isLoading ? <Loading inBlock marginBottom={0}/> : 'Сохранить адрес'}

        </button>
      </div>
    </ModalWindow>
  );
};

export default OrdersLocationAddModal;