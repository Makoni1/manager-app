import { get, post, put, destroy } from './config';

const Notification = {
  getNotificationsList: (params) =>
    get('v1/notifications/client/list', {params}),
  getNotificationById: (notificationsId) =>
    post(`v1/notifications/client/seen/${notificationsId}`),
  getQuantityNotifications : (params) =>
    get('v1/notifications/client/quantity', {params}),
  markNotificationsAsSeen: (notificationIds) =>
    post('v1/notifications/client/seen', notificationIds),
}
export default Notification;