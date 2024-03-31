import React, {useEffect, useState} from 'react';
import HomeIcon from "../../shared/icons/HomeIcon";
import style from "./style.module.scss"
import {Order} from "../../../services";
import {toast} from "react-toastify";

const OrdersLocationDropdownItem = ({item, clickHandle}) => {
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    Order.getCountryById(item.countryId)
      .then(res => res.data)
      .then((response) => {
          setCountry(response);
      })
      .catch(error => {
        console.log(error);
        toast.error(error)
      });
    Order.getCityById(item.cityId)
      .then(res => res.data)
      .then((response) => {
        setCity(response);
      }).catch(error => {
        console.log(error);
        toast.error(error)
      });
  }, [])
  return (
    <div className={style.dropdown_card} onClick={() => clickHandle(item)}>
      <HomeIcon />
      <div className={style.dropdown_card_content}>
        <h4>{country?.name}, {city?.name}, {item.fullAddress}</h4>
        <p>{item.phoneNumber}</p>
      </div>
    </div>
  );
};

export default OrdersLocationDropdownItem;