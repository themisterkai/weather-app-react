import {
  returnDescriptionText,
  returnWeatherIcon,
} from '../utils/weatherHelpers';
import { useWeather } from '../hooks/hooks';

const Description = () => {
  const result = useWeather();

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
        className="h-16 md:h-20 origin-left-top animate-scale mb-8"
      />
      <h2 className="text-3xl md:text-4xl font-bold ">
        {returnDescriptionText(name, main)}
      </h2>
    </div>
  );
};

export default Description;
