import React, { createContext, useContext, useReducer } from 'react';

type WeatherType = string;

type WeatherAction =
  | { type: 'SET_TO_CLEAR' }
  | { type: 'SET_TO_CLOUDS' }
  | { type: 'SET_TO_RAIN' }
  | { type: 'SET_TO_SNOW' };

type WeatherContextType = [WeatherType, React.Dispatch<WeatherAction>];

const WeatherReducer = (
  state: WeatherType,
  action: WeatherAction
): WeatherType => {
  switch (action.type) {
    case 'SET_TO_CLEAR':
      return 'sunny';
    case 'SET_TO_CLOUDS':
      return 'grey';
    case 'SET_TO_RAIN':
      return 'rain';
    case 'SET_TO_SNOW':
      return 'snow';
    default:
      return state;
  }
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const initialState: WeatherType = 'default';

export const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, weatherDispatch] = useReducer(WeatherReducer, initialState);

  return (
    <WeatherContext.Provider value={[weather, weatherDispatch]}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherValue = (): WeatherType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      'useWeatherValue must be used within a WeatherContextProvider'
    );
  }
  return context[0];
};

export const useWeatherDispatch = (): React.Dispatch<WeatherAction> => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      'useWeatherDispatch must be used within a WeatherContextProvider'
    );
  }
  return context[1];
};

export const getType = (description: string) => {
  switch (description) {
    case 'Clear':
      return 'sunny';
    case 'Clouds':
      return 'grey';
    case 'Rain':
    case 'Thunderstorm':
    case 'Drizzle':
      return 'wet';
    case 'Snow':
      return 'snow';
    case 'Fog':
    case 'Mist':
    default:
      return 'default';
  }

  // switch (description) {
  //   case 'Clear':
  //     return 'SET_TO_CLEAR';
  //   case 'Clouds':
  //     return 'SET_TO_CLOUDS';
  //   case 'Rain':
  //   case 'Thunderstorm':
  //   case 'Drizzle':
  //     return 'SET_TO_RAIN';
  //   case 'Snow':
  //     return 'SET_TO_SNOW';
  //   case 'Fog':
  //   case 'Mist':
  //   default:
  //     return 'SET_TO_OTHER';
  // }
};

export default WeatherContext;
