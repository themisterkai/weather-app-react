import { WeatherResponse } from '../utils/types';
import weatherService from '../services/weather';
import { useQuery } from '@tanstack/react-query';
import {
  returnDescriptionText,
  returnWeatherIcon,
} from '../utils/weatherHelpers';

const Description = () => {
  const result = useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({ city: 'stockholm' }),
    retry: 1,
  });

  if (result.isLoading) {
    return null;
  }

  const weather = result.data;

  if (result.isError || !weather) {
    return null;
  }

  const { name } = weather;
  const { main } = weather.weather[0];

  return (
    <div className="my-8">
      <img
        src={returnWeatherIcon(main)}
        className="h-20 origin-left-top animate-scale mb-8"
      />
      <h2 className="text-4xl font-bold">
        {returnDescriptionText(name, main)}
      </h2>
    </div>
  );
};

export default Description;
