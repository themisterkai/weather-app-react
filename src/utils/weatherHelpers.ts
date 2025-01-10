export const getWeatherType = (description: string) => {
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
};

export const returnDescriptionText = (city: string, description: string) => {
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

export const returnWeatherIcon = (description: string) => {
  switch (description) {
    case 'Clear':
      return '/icons/sunglasses.svg';
    case 'Clouds':
      return '/icons/clouds.svg';
    case 'Rain':
    case 'Thunderstorm':
    case 'Drizzle':
      return '/icons/umbrella.svg';
    case 'Snow':
      return '/icons/snow.svg';
    case 'Fog':
    case 'Mist':
    default:
      return '/icons/other.svg';
  }
};
