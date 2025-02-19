import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notificationText = useNotificationValue();

  return (
    <div className="flex flex-col justify-end h-16 text-sm mb-2">
      {notificationText}
    </div>
  );
};

export default Notification;
