import React, {useEffect, useState} from 'react';
import style from "./index.module.scss"
import cn from "classnames";
import Badge from "../../shared/Badge";
import {File} from '../../../services';
import {requestErrorDisplay} from '../../../utils';

const DriverItemCard = ({ isHead, item }) => {
  const [ isLoading, setLoading ] = useState(false)
  const [ avatarData, setAvatarData ] = useState(false)

  const getAvatarById = () => {
    setLoading(true)
    File.getImageByType(8, item.id)
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
              Имя
            </div>
            {/*<div className={style.item}>*/}
            {/*  Автомобиль*/}
            {/*</div>*/}
            <div className={style.item}>
              Номер удостоверения
            </div>
            <div className={style.item}>
              Номер телефона
            </div>
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
                alt="Фарид"
              />
              <p>{item.name} {item.surname}</p>
            </div>
            {/*<div className={style.item}>*/}
            {/*  <p>{item.vehicle?.carModel} {item.vehicle?.carNumber}</p>*/}
            {/*</div>*/}
            <div className={style.item}>
              <p>{item.idNumber}</p>
            </div>
            <div className={style.item}>
              +{item.phoneNumber}
            </div>
            <div className={cn(style.item, style.item_status)}>
              <Badge type={"green"} text={item.isFree ? "Свободен" : item.stateCode} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default DriverItemCard;