import axios, { AxiosError } from 'axios';
import { ForecastResponse, WeatherResponse } from '../utils/types';
import { error404, forecastUrl, weatherUrl } from '../utils/constants';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const fetchWeather = async ({
  city,
  lat,
  lon,
}: {
  city?: string;
  lat?: number;
  lon?: number;
}): Promise<WeatherResponse> => {
  let url = `${weatherUrl}q=${city}&appid=${API_KEY}&units=metric`;
  if (lat != null && lon != null) {
    url = `${weatherUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error(error404);
      }
    }
    throw new Error('Failed to fetch weather data.');
  }
};

const fetchForecast = async ({
  city = 'amsterdam',
  lat,
  lon,
}: {
  city?: string;
  lat?: number;
  lon?: number;
}): Promise<ForecastResponse> => {
  let url = `${forecastUrl}q=${city}&appid=${API_KEY}&units=metric`;
  if (lat != null && lon != null) {
    url = `${forecastUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error(error404);
      }
    }
    throw new Error('Failed to fetch forecast data.');
  }
};

export default { fetchWeather, fetchForecast };
