import React from 'react';
import style from "../map.module.scss"
const OrdersMapBannerDistance = ({ distance = 0 }) => {
  return (
    <div className={style.distance}>
      <div className={style.distance_line}></div>
      <div className={style.distance_text}>
        {distance} км
      </div>
    </div>
  );
};

export default OrdersMapBannerDistance;