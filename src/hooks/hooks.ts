import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import weatherService from '../services/weather';
import {
  setNotification,
  useNotificationDispatch,
} from '../NotificationContext';
import { ForecastResponse, WeatherResponse } from '../utils/types';

export const useWeather = () => {
  return useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({}),
    retry: 1,
  });
};

export const useForecast = () => {
  return useQuery<ForecastResponse>({
    queryKey: ['forecast'],
    queryFn: () => weatherService.fetchForecast({}),
    retry: 1,
  });
};

export const useFetchWeatherMutation = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  return useMutation({
    mutationFn: weatherService.fetchWeather,
    onSuccess: data => {
      queryClient.setQueryData(['weather'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });
};

export const useFetchForecastMutation = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  return useMutation({
    mutationFn: weatherService.fetchForecast,
    onSuccess: data => {
      queryClient.setQueryData(['forecast'], data);
    },
    onError: error => {
      notificationDispatch(setNotification(error.message));
    },
  });
};
