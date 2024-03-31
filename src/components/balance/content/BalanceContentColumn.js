import React from 'react';
import style from "./style.module.scss"

const BalanceContentColumn = ({ children }) => {
    return (
        <div className={style.column}>
            { children }
        </div>
    );
};

export default BalanceContentColumn;