import Weather from './Weather';
import Control from './Control';
import Description from './Description';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import { useQuery } from '@tanstack/react-query';
import { WeatherResponse } from '../utils/types';
import weatherService from '../services/weather';
import { getWeatherType } from '../utils/weatherHelpers';
import Footer from './Footer';
import Geolocation from './Geolocation';
import Notification from './Notification';

const MainContainer = () => {
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
    return (
      <div>weather service is not available due to problems in server</div>
    );
  }

  const { main } = weather.weather[0];

  return (
    <div className={'main ' + getWeatherType(main)}>
      <div className="container">
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
