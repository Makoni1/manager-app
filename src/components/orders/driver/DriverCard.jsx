import React, {useEffect, useState} from 'react';
import style from "./index.module.scss"
import Badge from "../../shared/Badge";
import cn from "classnames";
import UserPlusIcon from "../../shared/icons/UserPlusIcon";
import {File} from '../../../services';
import {requestErrorDisplay} from '../../../utils';
import Loading from '../../invoices/Loading';

const DriverCard = ({ isCreate, onClick, item, isActive = false, displayStatus = true, withoutBgAndPadding = false }) => {
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
    if (item?.id) {
      getAvatarById()
    }
  }, [])
  const handleOnClick = () => {
    if (onClick) onClick()
  }
  return (
    <div
      className={cn(style.card, {
        [style.card_withoutBgAndPadding]: withoutBgAndPadding,
        [style.card_isCreate]: isCreate,
        [style.card_isActive]: isActive,
        [style.cursor]: item?.isFree,
        [style.card_noStatus]: !displayStatus,
      })}
      onClick={handleOnClick}
    >
      {
        isCreate && (<div className={style.card_icon}>
          <UserPlusIcon />
        </div>)
      }
      {
        !isCreate && (<div className={style.card_avatar}>
          <img
            src={avatarData?.base64 ? `data:${avatarData?.contentType};base64, ${avatarData?.base64}` : '/images/no-photo.png'}
            alt={item.name}
            loading={"lazy"}
          />
          { isLoading && <Loading inBlock marginBottom={0} className={style.card_avatar_loading} />}
        </div>)
      }
      <div className={style.card_content}>
        {
          isCreate
            ? <p>Новый водитель</p>
            : (
              <>
                <h2>{item.patronymic}</h2>
                <p>+{item.phoneNumber}</p>
              </>
            )
        }

      </div>
      { !isCreate && displayStatus && (
        <div className={style.card_badge}>
          <Badge type={item.isFree ? "green" : "gray"} text={item.isFree ? "Свободно" : "Занят"} />
        </div>
      )}
    </div>
  );
};

export default DriverCard;