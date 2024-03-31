import React from 'react';
import ModalWindow from "../../shared/ModalWindow";

import style from "./index.module.scss"
import InputSearch from "../../shared/forms/input-search";
import OrdersShareCard from "./OrdersShareCard";

const OrdersShareModal = () => {
  return (
    <ModalWindow padding="middle">
      <div className={style.wrapper}>
        <h4 className={style.title}>Разослать сотрудникам</h4>
        <InputSearch />
        <OrdersShareCard />
        <OrdersShareCard />
        <OrdersShareCard />
        <OrdersShareCard isEditable />

        <button type="button" className={style.button}>
          Добавить сотрудника
        </button>
      </div>
    </ModalWindow>
  );
};

export default OrdersShareModal;