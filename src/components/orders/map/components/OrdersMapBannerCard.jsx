import React from 'react';
import style from "../map.module.scss";
import Skeleton from "react-loading-skeleton";

const OrdersMapBannerCard = ({ isEditable = false, isSender = false, title = "", text = "" }) => {
  return (
    <div
      className={style.card}
    >
      <div className={style.card_img}>
        { isSender
          ? <img src="/icons/Subtract%20(1).svg" alt={title}/>
          : <img src="/icons/Subtract%20(2).svg" alt={title}/>
        }
      </div>
      <div className={style.card_content}>
        {
          isEditable
            ? (
              <div className={style.card_text}>
                { isSender ? "Город погрузки" : "Город выгрузки" }
              </div>
            )
            : title ?
            <>
              <div className={style.card_title}>
                {title}
              </div>
              <div className={style.card_text}>
                {text}
              </div>
            </>
            :
            <>
              <div className={style.card_title}><Skeleton width="120px"/></div>
              <div className={style.card_text}><Skeleton width="100px"/></div>
            </>
        }
      </div>
    </div>
  );
};

export default OrdersMapBannerCard;