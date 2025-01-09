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
    return <div>loading data...</div>;
  }

  const forecast = result.data;

  if (result.isError || !forecast) {
    return <div>user service is not available due to problems in server</div>;
  }

  const futureForecast = formatFutureForecast(forecast.list);

  console.log('FORECAST: ', forecast);

  return (
    <div className="forecast">
      {futureForecast.map(forecast => (
        <div className="forecast-line">
          <div>{forecast.day}</div>
          {tempSetting === 'C' && (
            <div>
              <span className="low">{`↓ ${forecast.lowC} °C`}</span>
              <span className="high">{`↑ ${forecast.highC} °C`}</span>
            </div>
          )}
          {tempSetting === 'F' && (
            <div>
              <span className="low">{`↓ ${forecast.lowF} °F`}</span>
              <span className="high">{`↑ ${forecast.highF} °F`}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
