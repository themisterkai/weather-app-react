import { useQuery } from '@tanstack/react-query';
import weatherService from '../services/weather';
import { ForecastResponse } from '../utils/types';
import { celcius, fahrenheit } from '../utils/constants';
import { formatFutureForecast } from '../utils/helpers';

const Forecast = () => {
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
    <div>
      {futureForecast.map(forecast => (
        <>
          <div>{forecast.day}</div>
          <p className={celcius}>
            <span className="low">↓ ${forecast.lowC} °C</span>
            <span className="high">↑ {forecast.highC} °C</span>
          </p>
          <p className={fahrenheit}>
            <span className="low">↓ ${forecast.lowF} °F</span>
            <span className="high">↑ {forecast.highF} °F</span>
          </p>
        </>
      ))}
    </div>
  );
};

export default Forecast;
