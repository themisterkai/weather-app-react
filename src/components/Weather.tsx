import { celsiusToFahrenheit, getTime, round } from '../utils/helpers';
import { useSettingsValue } from '../SettingsContext';
import { useWeather } from '../hooks/hooks';

const Weather = () => {
  const tempSetting = useSettingsValue();
  const result = useWeather();

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
  );
};

export default Weather;
