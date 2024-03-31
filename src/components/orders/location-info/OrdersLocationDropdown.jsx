import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import style from "./style.module.scss"
import InputSearch from "../../shared/forms/input-search";
import OrdersLocationDropdownItem from "./OrdersLocationDropdownItem";
import OrdersLocationAddModal from "./OrdersLocationAddModal";
import OrdersLocationGroup from "./OrdersLocationGroup";
import {Order} from "../../../services";
import {toast} from "react-toastify";
import Loading from "../../invoices/Loading";

const OrdersLocationDropdown = ({
  onClose,
  clickHandle,
  isSender = false,
  countries = [],
  countrySelected,
  onChangeCity,
  onChangeCountry,
  citySelected
}) => {
  const [searchText, setSearchText] = useState(null)
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [displayModal, changeModal] = useState(false)
  const $rootEl = useRef(null)

  const stopClickParent = e => {
    e.stopPropagation()
  }

  const onClickOutSite = useCallback(() => {
    // onClose()
  }, []);

  useEffect(() => {
    $rootEl.current.focus()
    fetchData()
  }, [])

  const itemsFound = useMemo(() => {
    return items.filter(i =>
      (i.name?.toLowerCase().includes(searchText)
      || i.phoneNumber?.toLowerCase().includes(searchText)
      || i.fullAddress?.toLowerCase().includes(searchText)
      || i.email?.toLowerCase().includes(searchText))
      && i.cityId === citySelected.id
    )
  }, [searchText])

  const fetchData = () => {
    setLoading(true)
    Order.getUserAddress({ type: isSender ? 0 : 1 })
      .then(res => res.data)
      .then(data => {
        setItems(data)
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const itemsFilteredByCountryAndCity = useMemo(() => {
    return items.filter(i => i.cityId === citySelected?.id || i.countryId === countrySelected?.id && i.cityId === citySelected?.id)
  }, [items, citySelected])

  const itemsGroups = useMemo(() => {
    const groups = {}
    const withOutGroups = []
    itemsFilteredByCountryAndCity.forEach(i => {
      if (!i.name) {
        withOutGroups.push(i)
      } else {
        if (!groups[i.name]) {
          groups[i.name] = []
        }
        groups[i.name].push(i)
      }
    })
    const groupsItems = []
    for (const groupName in groups) {
      groupsItems.push({
        name: groupName,
        isGroup: true,
        children: groups[groupName]
      })
    }
    return [...withOutGroups, ...groupsItems]
  }, [itemsFilteredByCountryAndCity])

  const pushItem = obj => {
    setItems([...items, obj])
    changeModal(false)
    clickHandle(obj)
  }

  return (
    <div ref={$rootEl} className={style.dropdown} onClick={stopClickParent} onBlur={onClickOutSite} tabIndex={1}>
      <h3 className={style.dropdown_title}>
        { isSender ? 'Выбрать адрес погрузки' : 'Выбрать получателя'}
      </h3>
      <InputSearch onGetText={setSearchText} />
      <div className={style.dropdown_content}>
        { isLoading && <Loading inBlock /> }
        {
          searchText
          ? itemsFound.map(item => <OrdersLocationDropdownItem key={item.id} item={item} clickHandle={clickHandle} />)
          : isSender
          ? itemsFilteredByCountryAndCity.map(item => <OrdersLocationDropdownItem key={item.id} item={item} clickHandle={clickHandle} />)
          : (
              itemsGroups.map((item, idx) =>
                item.isGroup
                ? <OrdersLocationGroup key={'local-group-' + idx} item={item}>
                    {item.children.map(child => <OrdersLocationDropdownItem key={child.id} item={child} clickHandle={clickHandle} />)}
                  </OrdersLocationGroup>
                : <OrdersLocationDropdownItem key={item.id} item={item} clickHandle={clickHandle} />
              )
            )
        }
      </div>


      <button type="button" className={style.dropdown_button} onClick={() => changeModal(!displayModal)}>
        { isSender ? 'Добавить адрес' : 'Добавить адрес или получателя'}
      </button>

      {displayModal && <OrdersLocationAddModal
        onClose={() => changeModal(false)}
        updateContent={pushItem}
        titleEnd={isSender ? 'отправителя' : ' или получателя'}
        countries={countries}
        displayBin={!isSender}
        isSender={isSender}
        searchText={searchText}
        countrySelected={countrySelected}
        citySelected={citySelected}
        onChangeCountry={onChangeCountry}
        onChangeCity={onChangeCity}
      />}
    </div>
  );
};

export default OrdersLocationDropdown;