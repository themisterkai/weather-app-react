import { useQuery } from '@tanstack/react-query';
import weatherService from '../services/weather';
import { WeatherResponse } from '../utils/types';
import { celcius, fahrenheit } from '../utils/constants';
import { celsiusToFahrenheit, getTime, round } from '../utils/helpers';

const Weather = () => {
  const result = useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({ city: 'stockholm' }),
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const weather = result.data;

  if (result.isError || !weather) {
    return <div>user service is not available due to problems in server</div>;
  }

  const { name, timezone } = weather;
  const { sunrise, sunset } = weather.sys;
  const { temp, feels_like: feelsLike } = weather.main;
  const { main, description } = weather.weather[0];

  return (
    <div>
      {name}
      <div className={celcius}>
        {description} | {round(temp)} °C
      </div>
      <div className={celcius}>feels like {round(feelsLike)} °C</div>
      <div className={fahrenheit}>
        {description} | {round(celsiusToFahrenheit(temp))} °F
      </div>
      <div className={fahrenheit}>
        feels like {round(celsiusToFahrenheit(feelsLike))} °F
      </div>
      <div>sunrise {getTime(sunrise, timezone)}</div>
      <div>sunset {getTime(sunset, timezone)}</div>
    </div>
  );
};

export default Weather;
