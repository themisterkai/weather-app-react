import { errorGeoCode1, errorGeoCodeOthers } from './constants';
import {
  ErrorLatLong,
  ForecastList,
  ForecastListByDate,
  ForecastResponseList,
} from './types';

// getUserLocation calls the browser built-in geolocation functionality
// to return the user's current geolcation information
const getUserLocation = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

// getUserLatLong is a helper function to get the user's geolocation information.
// It return the coordinates on success, and displays and returns errors on failure.
export const getUserLatLong = async (): Promise<GeolocationCoordinates> => {
  try {
    const position = await getUserLocation();
    return position.coords;
  } catch (e) {
    const u = e as ErrorLatLong;
    if (u.code === 1) {
      throw new Error(errorGeoCode1);
    }
    throw new Error(errorGeoCodeOthers);
  }
};

// celsiusToFahrenheit is a helper function to convert celcius to fahrenheit.
export const celsiusToFahrenheit = (celsius: number): number =>
  (celsius * 9) / 5 + 32;

// round is a helper function to return the temperature with 1 decimal place.
export const round = (value: number): string => {
  const multiplier = Math.pow(10, 1);
  return (Math.round(value * multiplier) / multiplier).toFixed(1);
};

// getTime is a helper function that takes in the time and timezone information
// so we can display time in the local time of a place selected.
export const getTime = (time: number, timezone: number): string => {
  const timeFromAPI = new Date((time + timezone) * 1000);
  // we need to get the timezone offset so we can show it in the local time
  // instead of GMT
  const timezoneOffset = timeFromAPI.getTimezoneOffset() * 60000;
  return (
    new Date(timeFromAPI.getTime() + timezoneOffset)
      //set locale to 'en-uk' so we get it in the 24-hour format
      .toLocaleTimeString(['en-uk'], { hour: '2-digit', minute: '2-digit' })
      .replace(':', '.')
  );
};

// formatFutureForecast reduces the list of future forecast to return
// the high and low temperatures for the upcoming days.
export const formatFutureForecast = (
  forecastList: Array<ForecastResponseList>
): Array<ForecastList> => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const forecastCombined: ForecastListByDate = forecastList.reduce(
    (acc, forecast) => {
      const systemDate = new Date();
      const forecastDateReadable = new Date(forecast.dt * 1000);
      const forecastDate = forecast.dt_txt.split(' ')[0];

      if (!(forecastDate in acc)) {
        acc[forecastDate] = {
          highC: round(forecast.main.temp_max),
          lowC: round(forecast.main.temp_min),
          highF: round(celsiusToFahrenheit(forecast.main.temp_max)),
          lowF: round(celsiusToFahrenheit(forecast.main.temp_min)),
          date: forecastDate,
          day:
            systemDate.getDay() === forecastDateReadable.getDay()
              ? 'Today'
              : days[forecastDateReadable.getDay()],
        };
      }
      if (forecast.main.temp_max > Number(acc[forecastDate].highC)) {
        acc[forecastDate].highC = round(forecast.main.temp_max);
        acc[forecastDate].highF = round(
          celsiusToFahrenheit(forecast.main.temp_max)
        );
      }
      if (forecast.main.temp_min < Number(acc[forecastDate].lowC)) {
        acc[forecastDate].lowC = round(forecast.main.temp_min);
        acc[forecastDate].lowF = round(
          celsiusToFahrenheit(forecast.main.temp_min)
        );
      }
      return acc;
    },
    {} as ForecastListByDate
  );

  // we want to return the object above as an array of object
  // sorted by date.
  return Object.keys(forecastCombined)
    .map(key => forecastCombined[key])
    .sort((a, b) => {
      return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });
};
