import { getUserLatLong } from '../utils/helpers';
import {
  setNotification,
  useNotificationDispatch,
} from '../NotificationContext';
import {
  useFetchForecastMutation,
  useFetchWeatherMutation,
} from '../hooks/hooks';

const Geolocation = () => {
  const notificationDispatch = useNotificationDispatch();

  const weatherMutation = useFetchWeatherMutation();
  const forecastMutation = useFetchForecastMutation();

  const handleGeolocation = async () => {
    notificationDispatch(setNotification('getting geolocation data...'));
    try {
      const { latitude: lat, longitude: lon } = await getUserLatLong();
      weatherMutation.mutate({ lat, lon });
      forecastMutation.mutate({ lat, lon });
    } catch (e) {
      if (e instanceof Error) {
        notificationDispatch(setNotification(e.message));
      }
    }
  };
  return (
    <div className="mt-2">
      <span>or </span>
      <span className="underline cursor-pointer" onClick={handleGeolocation}>
        use current location
      </span>
    </div>
  );
};

export default Geolocation;
