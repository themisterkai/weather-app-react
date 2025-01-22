import {
  setToCelcius,
  setToFahrenheit,
  useSettingsDispatch,
  useSettingsValue,
} from '../SettingsContext';

const Control = () => {
  const tempSetting = useSettingsValue();
  const dispatch = useSettingsDispatch();

  const handleSetToC = () => {
    dispatch(setToCelcius());
  };

  const handleSetToF = () => {
    dispatch(setToFahrenheit());
  };

  return (
    <div className="whitespace-nowrap space-x-2">
      <span
        onClick={handleSetToC}
        className={
          tempSetting === 'C' ? 'font-bold' : 'underline cursor-pointer'
        }
      >
        °C
      </span>
      <span>|</span>
      <span
        onClick={handleSetToF}
        className={
          tempSetting === 'F' ? 'font-bold' : 'underline cursor-pointer'
        }
      >
        °F
      </span>
    </div>
  );
};

export default Control;
