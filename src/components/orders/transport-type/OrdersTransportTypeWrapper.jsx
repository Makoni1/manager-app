import React from 'react';
import style from "./style.module.scss"
import styleCommon from "../section-item/common.module.scss"
import OrdersTransportType from "./OrdersTransportType"
import cn from "classnames";

const OrdersTransportTypeWrapper = ({ types = [], onClick = void(0), defaultValue = null }) => {
  return (
    <div className={cn(style.wrapper, styleCommon.cardItem)}>
      { types.map(type => <OrdersTransportType
        key={type.value}
        text={type.name}
        isSelected={defaultValue?.value === type.value}
        isEditable
        type={type.value}
        onClick={() => onClick(type)}
      /> )}
    </div>
  );
};

export default OrdersTransportTypeWrapper;