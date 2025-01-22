import { useQuery } from '@tanstack/react-query';
import weatherService from '../services/weather';
import { WeatherResponse } from '../utils/types';
import { celsiusToFahrenheit, getTime, round } from '../utils/helpers';
import { useSettingsValue } from '../SettingsContext';
import Control from './Control';

const Weather = () => {
  const tempSetting = useSettingsValue();
  const result = useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({ city: 'amsterdam' }),
    retry: 1,
  });

  if (result.isLoading) {
    return null;
  }

  const weather = result.data;

  if (result.isError || !weather) {
    return null;
  }

  const { timezone } = weather;
  const { sunrise, sunset } = weather.sys;
  const { temp, feels_like: feelsLike } = weather.main;
  const { description } = weather.weather[0];

  return (
    <div className="flex justify-between items-start w-full text-l mb-4">
      <div className="text-xl leading-tight">
        {tempSetting === 'C' && (
          <>
            <div>
              {description} | {round(temp)} °C
            </div>
            <div>feels like {round(feelsLike)} °C</div>
          </>
        )}

        {tempSetting === 'F' && (
          <>
            <div>
              {description} | {round(celsiusToFahrenheit(temp))} °F
            </div>
            <div>feels like {round(celsiusToFahrenheit(feelsLike))} °F</div>
          </>
        )}

        <div>sunrise {getTime(sunrise, timezone)}</div>
        <div>sunset {getTime(sunset, timezone)}</div>
      </div>
      <Control />
    </div>
  );
};

export default Weather;
