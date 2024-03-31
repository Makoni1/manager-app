import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import style from './style.module.scss';
import { Order } from '../../../services';
import Loading from '../../invoices/Loading';
import { setNavbarStatusesState } from '../../../store/actions/navigationAction';
import {useDispatch, useSelector} from 'react-redux';
import {useClickOutside} from "../../../hooks/useClickOutside";
import {requestErrorDisplay} from '../../../utils';

const ITEM_TEMPLATE = {
  "moderation": {
    iconName: 'publish',
  },
  "awaitingpayment": {
    // name: "Ожидает оплаты",
    iconName: 'payment',
  },
  "waitloadingcargo": {
    // name: "Ожидает погрузки",
    iconName: 'awaiting-loading',
  },
  "loadingcargo": {
    iconName: 'loading-in-progress',
  },
  "confirmed": {
    iconName: 'awaiting',
  },
  "onthetrip": {
    iconName: 'way',
  },
  "unloadingcargo": {
    iconName: 'unloading-in-progress',
  },
  "waitcompletion": {
    // name: "Ожидает завершения",
    iconName: 'completion',
  }
};

const OrdersTab = ({ setStatus }) => {
  const currentUrl = new URL(window.location);
  const {navigation} = useSelector(state => state);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownContent = useRef(null)

  useClickOutside(dropdownContent, () => setDropdownOpen(false));

  const updateActiveStatus = (item = {}, status = 'all', isInit = false) => {
    setActiveStatus(item);
    if (!isInit) {
      currentUrl.searchParams.set("status", status);
      window.history.replaceState({}, "", currentUrl);
    }
    setStatus(item);
  };

  const getQueryParams = (data = []) => {
    const queryStatus = searchParams.get('status');

    if (!queryStatus) {
      updateActiveStatus(data[0], data[0].status, true);
      return;
    }

    const dataIndex = data.findIndex((d) => d.status === queryStatus);
    updateActiveStatus(data[dataIndex], queryStatus, true);
  };

  const fetchData = useCallback(async () => {
    //ОТСЮДА БЕРУТСЯ ЧИЛДРЕНЫ МЕНЮ ЗАКАЗОВ
    setLoading(true);
    try {
      const response = await Order.getStatusWithOrderCounts();
      if (response?.data) {
        setItems(response.data);
        getQueryParams(response.data);
        // get Loop rerender
        if (!navigation.statuses?.length) {
          console.log("response.data", response.data)
          dispatch(
            setNavbarStatusesState(response.data)
          );
        }
      }
    } catch (e) {
      requestErrorDisplay(e)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={cn(style.wrapper, 'd-flex flex-wrap')}>
      {/* Dropdown отображается только для мобильной версии */}
      <div ref={dropdownContent} className={style.dropdownWrapper}>
        <div className={style.flex}>
          <span className={style.statusTitle}>Статус:</span>
          <button
            type="button"
            className={cn(style.button, 'd-flex align-items-center', {
              [style.button_active]: activeStatus?.status,
            })}
            onClick={toggleDropdown}
          >
            {activeStatus?.statusName}
            <span className={style.count}>
              {activeStatus?.count || 0}
            </span>
            <div className={style.imgSelect}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                className={style.checkmark}
              >
                <path
                  d="M1 1.5L5 5.5L9 1.5"
                  stroke="#909195"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
        {isDropdownOpen && (
          <div className={style.dropdownContent}>
            {items.map((item) => (
              <button
                type="button"
                key={"dropdown-" + item.status}
                className={cn(style.button, 'd-flex align-items-center', {
                  [style.button_none]: item.status === activeStatus?.status,
                })}
                onClick={() => {
                  toggleDropdown();
                  updateActiveStatus(item, item.status);
                }}
              >
                {ITEM_TEMPLATE[item.status]?.iconName && (
                  <>
                    <img
                      className={cn(style.icon, style.icon_1)}
                      src={`/icons/status/${ITEM_TEMPLATE[item.status]?.iconName}.svg`}
                      alt={item.status}
                    />
                    <img
                      className={cn(style.icon, style.icon_2)}
                      src={`/icons/status/${ITEM_TEMPLATE[item.status]?.iconName}-color.svg`}
                      alt={item.status}
                    />
                  </>
                )}
                {item.statusName}
                <span className={style.count}>
                 {item.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Код для не мобильной версии остается без изменений */}
      <div className={style.mobile}>
        {items.map((button) => (
          <button
            type="button"
            key={"desktop-" + button.status}
            className={cn(style.button, 'd-flex align-items-center text-nowrap', {
              [style.button_active]: button.status === activeStatus?.status,
            })}
            onClick={() => updateActiveStatus(button, button.status)}
          >
            {ITEM_TEMPLATE[button.status]?.iconName && (
              <>
                <img
                  className={cn(style.icon, style.icon_1)}
                  src={`/icons/status/${ITEM_TEMPLATE[button.status]?.iconName}.svg`}
                  alt={button.statusName}
                />
                <img
                  className={cn(style.icon, style.icon_2)}
                  src={`/icons/status/${ITEM_TEMPLATE[button.status]?.iconName}-color.svg`}
                  alt={button.statusName}
                />
              </>
            )}
            {button.statusName}
            <span className={style.count}>{button.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;