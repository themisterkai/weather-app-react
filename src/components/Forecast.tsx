import { useQuery } from '@tanstack/react-query';
import weatherService from '../services/weather';
import { ForecastResponse } from '../utils/types';
import { formatFutureForecast } from '../utils/helpers';
import { useSettingsValue } from '../SettingsContext';

const Forecast = () => {
  const tempSetting = useSettingsValue();
  const result = useQuery<ForecastResponse>({
    queryKey: ['forecast'],
    queryFn: () => weatherService.fetchForecast({ city: 'Stockholm' }),
    retry: 1,
  });

  if (result.isLoading) {
    return null;
  }

  const forecast = result.data;

  if (result.isError || !forecast) {
    return null;
  }

  const futureForecast = formatFutureForecast(forecast.list);

  return (
    <div className="forecast">
      {futureForecast.map(forecast => (
        <div className="forecast-line" key={forecast.day}>
          <div>{forecast.day}</div>
          {tempSetting === 'C' && (
            <div className="forecast-line-temp">
              <span className="low">
                <span>↓</span>
                <span className="temp-sign">{forecast.lowC} °C</span>
              </span>
              <span className="high">
                <span>↑ </span>
                <span className="temp-sign">{forecast.highC} °C</span>
              </span>
            </div>
          )}
          {tempSetting === 'F' && (
            <div className="forecast-line-temp">
              <span className="low">
                <span>↓</span>
                <span className="temp-sign">{forecast.lowF} °F</span>
              </span>
              <span className="high">
                <span>↑</span>
                <span className="temp-sign">{forecast.highF} °F</span>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
