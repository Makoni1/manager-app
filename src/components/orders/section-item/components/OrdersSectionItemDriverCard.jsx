import React, {useEffect, useState} from 'react';
import commonStyle from "../common.module.scss"
import cn from "classnames";
import {File} from "../../../../services";
import Loading from "../../../invoices/Loading";
import style from "../../../profileTwo/components/ChangeAvatar/style.module.scss";

const OrdersSectionItemDriverCard = ({
                                       fio,
                                        id,
                                       phoneNumber
}) => {
  const [avatarData, setAvatarData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const getDriverPhoto = () => {
    setLoading(true)
    File.getDriverPhoto(id)
      .then(res => res.data)
      .then(data => {
        setAvatarData(data)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getDriverPhoto()
  }, [id])

  return (
    <div className={cn(commonStyle.driverInfo, commonStyle.cardItem)}>
      <div className={commonStyle.driverInfo_image}>
        <img
          src={avatarData?.base64 ? 'data:image/png;base64, ' + avatarData?.base64 : '/images/no-photo.png'}
          alt="avatar"
        />
        {isLoading && <Loading inBlock className={commonStyle.loading} />}
      </div>

      <div className={commonStyle.driverInfo_content}>
        <h4>{fio}</h4>
        <a href={'tel:' + phoneNumber}>{phoneNumber}</a>
        {/*<p>Samsung В232ЕУ</p>*/}
      </div>
    </div>
  );
};

export default OrdersSectionItemDriverCard;