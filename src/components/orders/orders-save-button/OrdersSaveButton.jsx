import React from 'react';
import DocumentIcon from "../../shared/icons/DocumentIcon";

import style from "./index.module.scss"

const OrdersSaveButton = ({ onSubmit }) => {
  return (
    <div className={style.wrapper} onClick={() => onSubmit(true)}>
      <DocumentIcon />
      <span className={style.text}>Сохранить как черновик</span>
    </div>
  );
};

export default OrdersSaveButton;