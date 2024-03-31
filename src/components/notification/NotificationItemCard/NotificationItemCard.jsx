import style from "./index.module.scss"
import React, {useState} from 'react';
import ClockIcon from "../../shared/icons/ClockIcon";
import ActiveNotificationIcon from "../../shared/icons/ActiveNotificationIcon";
import {Notification} from "../../../services";
import {ORDER_STATUSES_DATA} from "../../../mock";
import {requestErrorDisplay} from "../../../utils";
import {useNavigate} from "react-router-dom";
const NotificationItemCard = ({ type, notification }) => {
  const [isRead, setIsRead] = useState(notification.isSeen);
  const navigate = useNavigate()
  const handleNotificationClick = async () => {
    if(!isRead && notification.id) {
      try {
        await Notification.getNotificationById(notification.id);
        setIsRead(true);

    } catch(error) {
        requestErrorDisplay(error);
      }
    }
        navigate(`/order/${notification?.orderId}${notification?.isSeen ? '' : '?update-notification-quantity-byId=' + notification?.id  }`)
  };

  let changeContent;
  const notificationObject = JSON.parse(notification.text || "{}");
  const statusTitle = ORDER_STATUSES_DATA[notificationObject.status]?.title || 'Не указано';

  if (notification && notification.text) {
  switch (type) {
    case 'order':
      changeContent = (
        <>
          <div className={style.destination_city}>
            {notificationObject.description || 'Не указано'}
          </div>

          <div className={style.destination_status}>
            {statusTitle || 'Не указано'}
          </div>
        </>
      );
      break;
    case 'driverMessage':
      changeContent = (
        <>
          <div className={style.writer}>
            Альжан Б:
          </div>
          <div className={style.comment}>
            У нас полная же сть нужна другая машина
          </div>
        </>
      );
      break;
    case 'moderationRejection':
      changeContent = (
        <>
          <div className={style.writer}>
            Модерация отклонена:
          </div>
          <div className={style.comment}>
            Пожалуйста, приложите накладную, чтобы мы могли застраховать груз
          </div>
        </>
      );
      break;
    default:
      changeContent = (
        <div>
          {notification.content || 'Не указано'}
        </div>
      );
      break;
  }
  } else {
    changeContent = (
      <div>
        Невозможно отобразить уведомление: отсутствуют данные.
      </div>
    );
  }
  const formattedTime = notification
    ? new Date(notification.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={style.notificationCard} onClick={handleNotificationClick}>
      <div className={style.notificationCard_content}>
        <div className={style.content_img}>
            <ActiveNotificationIcon fill={isRead ? "#C3C5CA" : "#C5115E"} />
        </div>
        <div className={style.content_title}>
          {notification.title || 'Загрузка...'}
        </div>
      </div>
      <div className={style.notificationCard_destination}>
        {changeContent}
      </div>
      <div className={style.notificationCard_time}>
        <div className={style.time_img}><ClockIcon /></div>
        <div className={style.time_text}>{formattedTime}</div>
      </div>
    </div>
  );
};

export default NotificationItemCard;