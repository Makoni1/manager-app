import React from 'react';
import style from "./index.module.scss"
import ModalWindow from "../index";

const ModalConfirm = ({ onClose, title = "", summary = "" }) => {
  return (
    <ModalWindow padding={'middle'} maxWidth={'450px'} onClose={onClose}>
      <div className={style.wrapper}>
        <h3>{title}</h3>
        <p>{summary}</p>
        <button type="button" className={style.button} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </ModalWindow>
  );
};

export default ModalConfirm;