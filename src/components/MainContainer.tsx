import Weather from './Weather';
import Description from './Description';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import { useQuery } from '@tanstack/react-query';
import { WeatherResponse } from '../utils/types';
import weatherService from '../services/weather';
import { getWeatherClassname } from '../utils/weatherHelpers';
import Footer from './Footer';
import Geolocation from './Geolocation';
import Notification from './Notification';
import Control from './Control';

const MainContainer = () => {
  const result = useQuery<WeatherResponse>({
    queryKey: ['weather'],
    queryFn: () => weatherService.fetchWeather({}),
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const weather = result.data;

  if (result.isError || !weather) {
    return (
      <div>weather service is not available due to problems in server</div>
    );
  }

  const { main } = weather.weather[0];

  return (
    <div
      className={`${getWeatherClassname(
        main
      )} max-w-full min-h-full  flex items-start justify-center`}
    >
      <div className="max-w-lg max-h-full my-4 md:my-8 mx-6 lg:mx-0">
        <Control />
        <Weather />
        <Description />
        <Forecast />
        <SearchBar />
        <Geolocation />
        <Notification />
        <Footer />
      </div>
    </div>
  );
};
export default MainContainer;
