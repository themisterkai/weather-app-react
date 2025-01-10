import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserLatLong } from '../utils/helpers';
import weatherService from '../services/weather';
import {
  clearNotification,
  setNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const Geolocation = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newWeatherMutation = useMutation({
    mutationFn: weatherService.fetchWeather,
    onSuccess: data => {
      notificationDispatch(clearNotification());
      queryClient.setQueryData(['weather'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });

  const newForecastMutation = useMutation({
    mutationFn: weatherService.fetchForecast,
    onSuccess: data => {
      notificationDispatch(clearNotification());
      queryClient.setQueryData(['forecast'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });

  const handleGeolocation = async () => {
    notificationDispatch(setNotification('getting geolocation data...'));
    try {
      const { latitude: lat, longitude: lon } = await getUserLatLong();
      newWeatherMutation.mutate({ lat, lon });
      newForecastMutation.mutate({ lat, lon });
    } catch (e) {
      if (e instanceof Error) {
        notificationDispatch(setNotification(e.message));
      }
    }
  };
  return (
    <div className="geolocation">
      <span>or </span>
      <span className="underlined" onClick={handleGeolocation}>
        use current location
      </span>
    </div>
  );
};

export default Geolocation;
