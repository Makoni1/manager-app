import React from 'react';
import cn from "classnames";
import TransportTentIcon from "../../shared/icons/TransportTentIcon";
import TransportCoveredIcon from "../../shared/icons/TransportCoveredIcon";
import TransportIsothermIcon from "../../shared/icons/TransportIsothermIcon";
import TransportRefrigeratorIcon from "../../shared/icons/TransportRefrigeratorIcon";

import styleCommon from "../section-item/common.module.scss"
import styleLocal from "./style.module.scss"

const disc = {
  awning: "Тент",
  covered: "Крытая",
  isothermal: "Изотерм",
  refrigerator: "Рефрижератор",
}
const OrdersTransportType = ({
  text = "",
  style = {},
  isEditable = false,
  isSelected = false,
  isTagView = false,
  draft = false,
  type = "",
  onClick = () => void(0)
}) => {
  return (
    <div
      className={cn(styleLocal.transportType, styleCommon.cardItem, {
        [styleLocal.transportType_tagView]: isTagView,
        [styleLocal.transportType_editable]: isEditable,
        [styleLocal.transportType_selected]: isSelected
      })}
      style={style}
      onClick={onClick}
    >
      {getIcon(type, isEditable ? '#C3C5CA' : '#909195')}
      { text || (draft && !type ? "Транспорт не указан" : disc[type]) }
    </div>
  );
};

const getIcon = (type, color) => {
  if (type === "awning") {
    return <TransportTentIcon fill={color} />
  } else if (type === "covered") {
    return <TransportCoveredIcon fill={color} />
  } else if (type === "isothermal") {
    return <TransportIsothermIcon fill={color} />
  } else if (type === "refrigerator") {
    return <TransportRefrigeratorIcon fill={color} />
  }
}

export default OrdersTransportType;