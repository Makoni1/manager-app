import React, {useEffect, useState} from 'react';
import style from "./index.module.scss"
import cn from "classnames";
import Badge from "../../shared/Badge";
import {File} from '../../../services';
import {requestErrorDisplay} from '../../../utils';

const CarsItemCard = ({ isHead, item }) => {
  const [ isLoading, setLoading ] = useState(false)
  const [ avatarData, setAvatarData ] = useState(false)
  const getAvatarById = () => {
    setLoading(true)
    File.getImageByType(5, item.id)
      .then(res => res.data)
      .then(data => {
        setAvatarData(data)
      })
      .catch(e => {
        requestErrorDisplay(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!isHead && item?.id) {
      getAvatarById()
    }
  }, [isHead, item?.id])

  return (
    <div className={cn(style.wrapper, { [style.isHead]: isHead })}>
      {
        isHead && (
          <>
            <div className={style.item}>
              <div className={style.item_avatar} style={{ height: "1px" }}></div>
              Модель и гос номер
            </div>
            <div className={style.item}>
              Модель и Гос номер прицепа
            </div>
            <div className={style.item}>
              Тип прицепа
            </div>
            {/*<div className={style.item}>*/}
            {/*  Водитель*/}
            {/*</div>*/}
            <div className={cn(style.item, style.item_status)} style={{ paddingRight: "14px" }}>
              Статус
            </div>
          </>
        )
      }
      {
        !isHead && (
          <>
            <div className={style.item}>
              <img
                className={style.item_avatar}
                src={avatarData?.base64 ? `data:${avatarData?.contentType};base64, ${avatarData?.base64}` : '/images/no-photo.png'}
                alt={item.carNumber}
              />
              <p>{item.carModel} {item.carNumber}</p>
            </div>
            <div className={style.item}>
              <p>{item.trailerModel} {item.trailerNumber}</p>
            </div>
            <div className={style.item}>
              <p>{item.vehicleTypeName} ({item.loadingTypeName})</p>
            </div>
            <div className={cn(style.item, style.item_status)}>
              <Badge type={"green"} text={"Свободен"} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default CarsItemCard;