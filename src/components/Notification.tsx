import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notificationText = useNotificationValue();

  return (
    <div className="flex flex-col justify-end h-20 text-sm mb-2">
      {notificationText}
    </div>
  );
};

export default Notification;
