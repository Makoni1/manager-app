import React from 'react';
import style from "../common.module.scss"

const BalanceSectionItemInfoColumn = ({ title = "", children }) => {
    return (
        <div className={style.infoColumn}>
            <h5 className={style.infoColumn__title}>kxnaks</h5>
            <div className={style.infoColumn__wrapper}>
                { children }
            </div>
        </div>
    );
};

export default BalanceSectionItemInfoColumn;