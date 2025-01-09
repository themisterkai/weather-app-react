import { WeatherResponse } from '../utils/types';
import weatherService from '../services/weather';
import { useQuery } from '@tanstack/react-query';
import {
  returnDescriptionText,
  returnWeatherIcon,
} from '../utils/weatherHelpers';

const Description = () => {
  //
  const result = useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({ city: 'stockholm' }),
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const weather = result.data;

  if (result.isError || !weather) {
    return <div>user service is not available due to problems in server</div>;
  }

  const { name } = weather;
  const { main } = weather.weather[0];

  return (
    <div className="description-box">
      <img src={returnWeatherIcon(main)} className="icon" />
      <h2>{returnDescriptionText(name, main)}</h2>
    </div>
  );
};

export default Description;
