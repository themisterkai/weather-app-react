import { WeatherResponse } from '../utils/types';
import weatherService from '../services/weather';
import { useQuery } from '@tanstack/react-query';

const returnDescriptionText = (city: string, description: string) => {
  switch (description) {
    case 'Clear':
      return `Get your sunnies on. ${city} is looking rather great today.`;
    case 'Clouds':
      return `Light a fire and get cosy. ${city} is looking grey today.`;
    case 'Rain':
    case 'Thunderstorm':
    case 'Drizzle':
      return `Don't forget your umbrella. It's wet in ${city} today.`;
    case 'Snow':
      return `Light a fire and get cosy. ${city} looks snowy today.`;
    case 'Fog':
    case 'Mist':
    default:
      return `Be careful today in ${city}!`;
  }
};

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
      <h2>{returnDescriptionText(name, main)}</h2>
    </div>
  );
};

export default Description;
