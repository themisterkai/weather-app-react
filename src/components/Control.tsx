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
    <div className="control">
      <span
        onClick={handleSetToC}
        className={tempSetting === 'C' ? 'bold' : 'underlined'}
      >
        °C
      </span>{' '}
      |{' '}
      <span
        onClick={handleSetToF}
        className={tempSetting === 'F' ? 'bold' : 'underlined'}
      >
        °F
      </span>
    </div>
  );
};

export default Control;
