import React from 'react';
import {Link} from "react-router-dom";
import cn from "classnames"

import style from "./style.module.scss"
import Logotype from "../../shared/icons/Logotype";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import {useAmplitude} from "../../../hooks/useAmplitude";

const OrdersHeader = ({
  title = "",
  backBtn,
  renderOptions,
  displayLogo = false,
  displayCreateBtn = false,
  displayBackBtn = false,
  displayBackBtn2 = false
}) => {
  const { amplitude } = useAmplitude()
  return (
    <div
      className={cn(style.wrapper, "d-flex align-items-center", {
        [style.wrapper_pt]: displayBackBtn2
      })}
    >
      <h1 className={style.title}>
        {title}
      </h1>
      { renderOptions && (<div className={style.wrapperOptions}>{renderOptions()}</div>) }
      { displayCreateBtn && (
        <Link
          to="/orders/create"
          className={cn(style.button, "ms-auto")}
          onClick={() => {
            amplitude.startCreatingOrder()
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="6" fill="black" fillOpacity="0.16"/>
            <path d="M12.9932 18.106C12.5257 18.106 12.1466 17.7269 12.1466 17.2594V8.74108C12.1466 8.27354 12.5257 7.89453 12.9932 7.89453C13.4607 7.89453 13.8397 8.27354 13.8397 8.74108V17.2594C13.8397 17.7269 13.4607 18.106 12.9932 18.106ZM8.73717 13.8436C8.26964 13.8436 7.89062 13.4646 7.89062 12.9971C7.89062 12.5296 8.26964 12.1506 8.73717 12.1506H17.2555C17.723 12.1506 18.1021 12.5296 18.1021 12.9971C18.1021 13.4646 17.723 13.8436 17.2555 13.8436H8.73717Z" fill="white"/>
          </svg>
          <span>Создать новый заказ</span>
        </Link>
      )}
      {
        displayLogo && (
          <Link to="/" className="ms-auto">
            <Logotype />
          </Link>
        )
      }
      {
        displayBackBtn && (
          <button
            onClick={() => backBtn()}
            className={cn('ms-auto d-flex align-items-center', style.backBtn, {
              [style.backBtn_type2]: displayBackBtn2
            })}
          >
            <ArrowLeftIcon />
            { displayBackBtn2 ? "Вернуться к созданию" : "Назад"}
          </button>
        )
      }
    </div>
  );
};

export default OrdersHeader;