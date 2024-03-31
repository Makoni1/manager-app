import React from 'react';
import style from "./style.module.scss"
import cn from "classnames";

const OrdersContentColumn = ({ children, gridColumnGap = 10, gridRowGap = 10, hide = false }) => {
  return (
    <div className={cn(style.column, { [style.hide]: hide })} style={{gap: `${gridRowGap}px ${gridColumnGap}px`}}>
      { children }
    </div>
  );
};

export default OrdersContentColumn;