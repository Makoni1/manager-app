import React from 'react';
import style from "../map.module.scss";
import Skeleton from "react-loading-skeleton";
import OrdersMapBannerCard from "./OrdersMapBannerCard";
import OrdersMapBannerDistance from "./OrdersMapBannerDistance";
import cn from "classnames";

const OrdersMapBanner = ({ isEditable = false, hide = false, order, countryFrom, distance, cityFrom, countryTo, cityTo }) => {
  return (
    <div className={cn(style.content, { [style.hide]: hide })}>
      <div className='row' style={{position: 'relative'}}>

        <OrdersMapBannerDistance distance={order?.distance || distance} />

        <OrdersMapBannerCard
          isSender
          title={ countryFrom && cityFrom ? `${countryFrom} г. ${cityFrom.name}` : ''}
          text={order?.addressFrom}
          isEditable={isEditable}
        />
        <OrdersMapBannerCard
          title={ countryTo && cityTo ? `${countryTo} г. ${cityTo.name}` : ''}
          text={order?.addressTo}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

export default OrdersMapBanner;