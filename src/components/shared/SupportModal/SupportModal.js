import React, {useState} from 'react';
import style from "./style.module.css"
import ModalWindow from "../ModalWindow";
import TelegramIcon from "../icons/TelegramIcon";
import WhatsappIcon from "../icons/WhatsappIcon";
import ViberIcon from "../icons/ViberIcon";
import SupportIcon from "../icons/SupportIcon";

const SupportModal = ({ display = false, displayHeader = true, onClose }) => {
  const [isSupport, changeDisplaySupport] = useState(display)
  return (
    <div>
      { displayHeader && (
        <div className={style.footer} onClick={() => changeDisplaySupport(true)}>
          <SupportIcon />
          <span>Поддержка</span>
        </div>
      )}
      { isSupport &&
        <ModalWindow onClose={() => {changeDisplaySupport(false); if (onClose) onClose()}} >
          <div className={style.wrapper}>
            <h3 className={style.title}>Нужна помощь?</h3>
            <p className={style.summary}>Пишите в мессенджерах:</p>
            <div className={style.block}>
              <a href="https://t.me/biny_support" target="_blank">
                <TelegramIcon />
              </a>
              <a href="https://wa.me/77711031141" target="_blank">
                <WhatsappIcon />
              </a>
            </div>
            <p className={style.summary}>Звоните по телефону:</p>
            <div className={style.block}>
              <a href="tel:+77750075398" className={style.phone}>+77750075398</a>
            </div>
            <p className={style.summary}>Мы работаем ежедневно <br/> с <b>9:00</b> до <b>20:00</b></p>
          </div>
        </ModalWindow>}
    </div>
  );
};

export default SupportModal;