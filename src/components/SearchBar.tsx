import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import weatherService from '../services/weather';

const SearchBar = () => {
  const queryClient = useQueryClient();
  const [city, setCity] = useState('');

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

  const handleSubmit = () => {
    newWeatherMutation.mutate({ city });
    newForecastMutation.mutate({ city });
    setCity('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents default form submission if it's within a form
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
