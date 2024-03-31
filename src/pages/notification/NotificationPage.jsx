import style from "./index.module.scss"
import WrapperContent from "../../components/shared/WrapperContent";
import HeaderContent from "../../components/shared/HeaderContent";
import React, { useEffect, useState } from "react";
import NotificationItemCard from "../../components/notification/NotificationItemCard";
import DefaultPagination from "../../components/shared/DefaultPagination";
import { requestErrorDisplay } from "../../utils";
import { Notification } from "../../services";
import Loading from "../../components/invoices/Loading";
import { useNavigate } from "react-router-dom";

const ITEMS_LIMIT = 10;
const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsTotal, setNotificationsTotal] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const getNotifications = async () => {
    setLoading(true)
    try {
      const response = await Notification.getNotificationsList({
        page: currentPage,
        limit: ITEMS_LIMIT
      });
      const responseData = response.data;

      setNotifications(responseData.rows || []);
      setNotificationsTotal(responseData.total);
    } catch (error) {
      requestErrorDisplay(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getNotifications();
  }, [currentPage])


  const handleNotificationTypeChange = (id, newType) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notifications, type: newType } : notification
      )
    );
  };

  const formatRussianDate = (inputDate) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('ru-RU', options);
    return formattedDate;
  };

  // Function to mark all notifications as read and send to API
  const markAllAsRead = async () => {
    const notificationIds = notifications.map(notification => notification.id);
    try {
      await Notification.markNotificationsAsSeen(notificationIds);
      const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
      setNotifications(updatedNotifications);
      getNotifications(); // Re-fetch notifications from the server
      navigate(`/notification`)
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
    }
  };


  const groupedNotifications = Array.isArray(notifications)
    ? notifications.reduce((result, notifications) => {
      const date = formatRussianDate(notifications.createdAt);
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(notifications);
      return result;
    }, {})
    : {};

  if (isLoading) {
    return <Loading inBlock />
  }
  return (
    <WrapperContent>
      <HeaderContent title={"Уведомления"} badgeType={'brand'} />
      <button onClick={markAllAsRead} className={style.markReadButton}>Прочитать все</button>
      {Object.entries(groupedNotifications).map(([date, notificationsForDate]) => (
        <div key={date}>
          <span className={style.date}>{date}</span>
          {notificationsForDate.map((notification) => (
            <NotificationItemCard
              key={`${notification.type}-${notification.id}`}
              type={notification.type}
              notification={notification}
              onChange={(newType) => handleNotificationTypeChange(notification.id, newType)}
            />

          ))}
        </div>
      ))}
      <DefaultPagination
        currentPage={currentPage}
        limit={ITEMS_LIMIT}
        total={notificationsTotal}
        changePage={setCurrentPage}
      />
    </WrapperContent>
  )
}
export default NotificationPage;

