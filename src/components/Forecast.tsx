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
                <span>↓ ${forecast.lowC}</span>
                <span className="temp-sign">°C</span>
              </span>
              <span className="high">
                <span>↑ ${forecast.highC}</span>
                <span className="temp-sign">°C</span>
              </span>
            </div>
          )}
          {tempSetting === 'F' && (
            <div className="forecast-line-temp">
              <span className="low">
                <span>↓ ${forecast.lowF}</span>
                <span className="temp-sign">°F</span>
              </span>
              <span className="high">
                <span>↑ ${forecast.highF}</span>
                <span className="temp-sign">°F</span>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
