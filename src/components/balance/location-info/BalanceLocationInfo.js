import React from 'react';
import style from "./style.module.scss"

const BalanceLocationInfo = ({ isSender = false }) => {
    return (
        <div className={style.wrapper}>
            <img src={'/icons/' + (isSender ? 'sender-color.svg' : 'location-color.svg')} alt="icon" />
            <div className={style.content}>
                <h4>КазПочта</h4>
                <a href="tel:">+79990009999</a>
                <p>г. Атырау, ул.Баймуханова 70а</p>
            </div>
        </div>
    );
};

export default BalanceLocationInfo;