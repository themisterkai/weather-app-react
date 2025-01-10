import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import weatherService from '../services/weather';
import {
  clearNotification,
  setNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const SearchBar = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [city, setCity] = useState('');

  const newWeatherMutation = useMutation({
    mutationFn: weatherService.fetchWeather,
    onSuccess: data => {
      queryClient.setQueryData(['weather'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });

  const newForecastMutation = useMutation({
    mutationFn: weatherService.fetchForecast,
    onSuccess: data => {
      queryClient.setQueryData(['forecast'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });

  const handleSubmit = () => {
    notificationDispatch(clearNotification());
    newWeatherMutation.mutate({ city });
    newForecastMutation.mutate({ city });
    setCity('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="search-bar">
      <input
        value={city}
        onChange={({ target }) => setCity(target.value)}
        onKeyDown={handleKeyDown}
        id="search-bar"
        type="text"
        placeholder="Search by city name"
      ></input>
    </div>
  );
};

export default SearchBar;
