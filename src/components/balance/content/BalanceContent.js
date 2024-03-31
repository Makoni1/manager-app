import React from 'react';
import style from "./style.module.scss"

const BalanceContent = ({ children, column = 1 }) => {
    return (
        <div className={style.wrapper} style={{ gridTemplateColumns: `repeat(${column}, 1fr)`}}>
            { children }
        </div>
    );
};

export default BalanceContent;