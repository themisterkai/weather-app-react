import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notificationText = useNotificationValue();

  if (notificationText === '') {
    return <div className="notification"></div>;
  }
  return <div className="notification">{notificationText}</div>;
};

export default Notification;
