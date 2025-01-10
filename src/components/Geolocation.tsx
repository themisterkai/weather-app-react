import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserLatLong } from '../utils/helpers';
import weatherService from '../services/weather';

const Geolocation = () => {
  const queryClient = useQueryClient();
  const newWeatherMutation = useMutation({
    mutationFn: weatherService.fetchWeather,
    onSuccess: data => {
      queryClient.setQueryData(['weather'], data);
    },
    onError: error => {
      console.error('Error updating weather:', error);
    },
  });

  const newForecastMutation = useMutation({
    mutationFn: weatherService.fetchForecast,
    onSuccess: data => {
      queryClient.setQueryData(['forecast'], data);
    },
    onError: error => {
      console.error('Error updating forecast:', error);
    },
  });

  const handleGeolocation = async () => {
    const { latitude: lat, longitude: lon } = await getUserLatLong();
    newWeatherMutation.mutate({ lat, lon });
    newForecastMutation.mutate({ lat, lon });
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
