import React, {useEffect, useState} from 'react';
import style from "./index.module.scss"
import CarIcon from "../../shared/icons/CarIcon";
import Badge from "../../shared/Badge";
import cn from "classnames";
import CarPlusIcon from "../../shared/icons/CarPlusIcon";

const DriverTransport = ({ isCreate, onClick, item, isActive, displayStatus = true, withoutBgAndPadding = false }) => {
  const handleOnClick = () => {
    if (onClick) onClick()
  }

  return (
    <div
      className={cn(style.card, style.card_trans, {
        [style.card_withoutBgAndPadding]: withoutBgAndPadding,
        [style.card_isCreate]: isCreate,
        [style.card_isActive]: isActive,
        [style.cursor]: item?.isFree,
        [style.card_noStatus]: !displayStatus,
      })}
      onClick={handleOnClick}
    >
      {
        isCreate && (
          <div className={style.card_icon}>
            <CarPlusIcon />
          </div>
        )
      }
      {
        !isCreate && (
          <div className={style.card_icon}>
            <CarIcon fill={"#C3C5CA"} />
          </div>
        )
      }
      <div className={style.card_content}>
        {
          isCreate
            ? <p>Новый транспорт</p>
            : (
              <>
                <h2>{item.carModel} {item.carNumber}</h2>
                <p>{item.vehicleTypeName} ({item.loadingTypeName})</p>
              </>
            )
        }
      </div>
      {
        !isCreate && displayStatus && (
          <div className={style.card_badge}>
            <Badge type={item.isFree ? "green" : "gray"} text={item.isFree ? "Свободно" : "Занят"} />
          </div>
        )
      }
    </div>
  );
};

export default DriverTransport;