import React from 'react';
import style from "./index.module.scss"
import DotsIcon from "../../shared/icons/DotsIcon";
import cn from "classnames";

const OrdersShareCard = ({ isEditable }) => {
  return (
    <div className={style.card}>
      <div className={cn(style.card_checkbox, { [style.card_checkbox_selected]: false })}></div>
      {
        isEditable
          ? <input className={style.card_input} type="text" placeholder="Ввести email" />
          : (
            <div className={style.card_content}>
              <h3>
                Фамилия Имя
                <span>Диспетчер</span>
              </h3>
              <p>example@mail.com</p>
            </div>
          )
      }
      <div className={style.card_dropdown}>
        <button type="button">
          <DotsIcon />
        </button>
      </div>
    </div>
  );
};

export default OrdersShareCard;