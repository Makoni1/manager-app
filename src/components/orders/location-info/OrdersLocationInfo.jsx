import React, {useEffect, useRef, useState} from 'react';
import style from "./style.module.scss"
import OrdersLocationDropdown from "./OrdersLocationDropdown";
import {useClickOutside} from "../../../hooks/useClickOutside";

const OrdersLocationInfo = ({
  isSender = false,
  isEditable = false,
  forceOpenDropdown = false,
  forceOpenDropdownCount = 0,
  address = "",
  onChangeAddress,
  onChangeResipient,
  countrySelected,
  citySelected,
  onRecipientPhone,
  onChangeCity,
  onChangeCountry,
  companyName = "",
  phoneNumber,
  countries = [],
  detect
}) => {
  const [displayModal, changeDisplayModal] = useState(false)
  const infoRef = useRef(null)
  const iconColor = isEditable ? '' : '-color'

  useEffect(() => {
    if (isEditable && forceOpenDropdownCount && forceOpenDropdown && !address) {
      changeDisplayModal(forceOpenDropdown)
    }
  }, [forceOpenDropdown, forceOpenDropdownCount])

  if (isEditable) {
    useClickOutside(infoRef, () => changeDisplayModal(false));
  }

  const clickHandle = obj => {
    if (onChangeAddress) {
      onChangeAddress(obj.fullAddress)
    }
    if (onChangeResipient) {
      onChangeResipient(obj?.name)
    }
    if (onRecipientPhone) {
      onRecipientPhone(obj?.phoneNumber)
    }
    changeDisplayModal(false)
    if (detect) detect()
  }

  return (
    <div
      ref={infoRef}
      className={style.wrapper}
      onClick={() => { isEditable ? changeDisplayModal(!displayModal) : null }
    }>
      <img src={'/icons/' + (isSender ? 'sender' : 'location') + iconColor + '.svg'} alt="icon" />
      <div className={style.content}>
        {
          isEditable && (!phoneNumber && !address)
            ? (
              <div>
                Выбрать {isSender ? 'отправителя' : 'получателя'}
              </div>
            )
            : (
              <>
                { companyName && <h4>{companyName}</h4>}
                {phoneNumber && <a href={'tel:' + phoneNumber}>{phoneNumber}</a>}
                <p>{address}</p>
              </>
            )
        }
      </div>
      { displayModal && <OrdersLocationDropdown
        onClose={() => changeDisplayModal(false)}
        isSender={isSender}
        countries={countries}
        clickHandle={clickHandle}
        countrySelected={countrySelected}
        citySelected={citySelected}
        onChangeCountry={onChangeCountry}
        onChangeCity={onChangeCity}
      />}
    </div>
  );
};

export default OrdersLocationInfo;