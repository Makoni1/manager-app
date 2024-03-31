import React from 'react';
import cn from "classnames";
import style from "../common.module.scss"

const BalanceSectionItemFilter = () => {
    return (
        <div className={style.filters}>
            <div className={style.filter_item}>
                <span>Погрузка г. Алматы</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M6 6L11 11M11 11L16 16M11 11L16 6M11 11L6 16" stroke="#909195" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            <div className={cn(style.filter_item, style.filter_item_add)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 5V11M11 11V17M11 11L17 11M11 11H5" stroke="#909195" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Добавить фильтр</span>
            </div>
        </div>
    );
};

export default BalanceSectionItemFilter;