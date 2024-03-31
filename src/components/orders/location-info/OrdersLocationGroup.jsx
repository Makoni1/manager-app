import React, {useState} from 'react';
import ArrowDownIcon from "../../shared/icons/ArrowDownIcon";
import style from "./style.module.scss"
import cn from "classnames";

const OrdersLocationGroup = ({ children, item }) => {
  const [display, setDisplay] = useState(false)
  return (
    <div className={style.locationGroup}>
      <div className={cn(style.locationGroup_card, { [style.locationGroup_card_open]: display } )} onClick={() => setDisplay(!display)}>
        <p>{item.name}</p>
        <span>Адресов: {item.children.length}</span>
        <ArrowDownIcon />
      </div>
      <div className={cn(style.locationGroup_content, { [style.locationGroup_content_display]: !display })}>
        { children }
      </div>
    </div>
  );
};

export default OrdersLocationGroup;