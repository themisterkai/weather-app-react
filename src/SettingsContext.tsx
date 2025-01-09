import React, { createContext, useContext, useReducer } from 'react';

type TemperatureUnit = 'C' | 'F';

type SettingsAction = { type: 'SET_TO_C' } | { type: 'SET_TO_F' };

type SettingsContextType = [TemperatureUnit, React.Dispatch<SettingsAction>];

const settingsReducer = (
  state: TemperatureUnit,
  action: SettingsAction
): TemperatureUnit => {
  switch (action.type) {
    case 'SET_TO_F':
      return 'F';
    case 'SET_TO_C':
      return 'C';
    default:
      return state;
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const initialState: TemperatureUnit = 'C';

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, settingsDispatch] = useReducer(
    settingsReducer,
    initialState
  );

  return (
    <SettingsContext.Provider value={[settings, settingsDispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsValue = (): TemperatureUnit => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsValue must be used within a SettingsContextProvider'
    );
  }
  return context[0];
};

export const useSettingsDispatch = (): React.Dispatch<SettingsAction> => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsDispatch must be used within a SettingsContextProvider'
    );
  }
  return context[1];
};

export const setToCelcius = (): SettingsAction => {
  return {
    type: 'SET_TO_C',
  };
};

export const setToFahrenheit = (): SettingsAction => {
  return {
    type: 'SET_TO_F',
  };
};

export default SettingsContext;
