import { formatFutureForecast } from '../utils/helpers';
import { useSettingsValue } from '../SettingsContext';
import { useForecast } from '../hooks/hooks';

const Forecast = () => {
  const tempSetting = useSettingsValue();
  const result = useForecast();

  if (result.isLoading) {
    return null;
  }

  const forecast = result.data;

  if (result.isError || !forecast) {
    return null;
  }

  const futureForecast = formatFutureForecast(forecast.list);

  return (
    <>
      {futureForecast.map(forecast => (
        <div
          className="flex justify-between border-b border-dashed border-current"
          key={forecast.day}
        >
          <div>{forecast.day}</div>
          {tempSetting === 'C' && (
            <div className="flex justify-between space-x-2">
              <span className="pr-2 min-w-16 text-left">
                <span>↓</span>
                <span className="float-right">{forecast.lowC} °C</span>
              </span>
              <span className="pl-1 min-w-16 text-left">
                <span>↑ </span>
                <span className="float-right">{forecast.highC} °C</span>
              </span>
            </div>
          )}
          {tempSetting === 'F' && (
            <div className="flex justify-between space-x-2">
              <span className="pr-2 min-w-16 text-left">
                <span>↓</span>
                <span className="float-right">{forecast.lowF} °F</span>
              </span>
              <span className="pl-1 min-w-16 text-left">
                <span>↑</span>
                <span className="float-right">{forecast.highF} °F</span>
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Forecast;
