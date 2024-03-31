import React from 'react';
import style from "../common.module.scss"

const OrdersSectionItemTitle = ({ title, count }) => {
  return (
    <div className={style.title}>
      {title}
      <span className={style.title_count}>{count}</span>
    </div>
  );
};

export default OrdersSectionItemTitle;