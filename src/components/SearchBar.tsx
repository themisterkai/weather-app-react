import { useState } from 'react';
import {
  clearNotification,
  useNotificationDispatch,
} from '../NotificationContext';
import {
  useFetchForecastMutation,
  useFetchWeatherMutation,
} from '../hooks/hooks';

const SearchBar = () => {
  const notificationDispatch = useNotificationDispatch();
  const [city, setCity] = useState('');

  const weatherMutation = useFetchWeatherMutation();
  const forecastMutation = useFetchForecastMutation();

  const handleSubmit = () => {
    notificationDispatch(clearNotification());
    weatherMutation.mutate({ city });
    forecastMutation.mutate({ city });
    setCity('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-8">
      <input
        className="border border-solid border-current rounded-md placeholder-inherit text-inherit py-3 px-2 h-5 w-60"
        value={city}
        onChange={({ target }) => setCity(target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search by city name"
      ></input>
    </div>
  );
};

export default SearchBar;
