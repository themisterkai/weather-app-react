# Weather App - React & React Query

A simple weather application built with **React**, **React Query**, and the OpenWeather API. This app allows users to search for current weather information by city, and by geolocation.

## Demo

You can view the live demo of the app at:

[Weather App Demo](https://weatherapp-reactquery.netlify.app/)

## Features

- Search for weather by city.
- View current temperature, weather description, and weather forecast.
- Use geolocation to get weather in current location.
- Use React Query for efficient data fetching and caching.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Query**: Data fetching and caching for React.
- **Tailwind CSS**: Styling for the app.
- **OpenWeatherMap API**: API to fetch weather data.
- **Vercel**: Deployed the app to Vercel.

## Installation

To run this app locally, follow the steps below:

1. **Clone the repository and install dependencies**:
```bash
git clone https://github.com/themisterkai/weather-app-react.git
cd weather-app-react
npm install
```

2. **Set up your environment variable**:
Create a .env file in the root directory and add your API key from OpenWeatherMap.
```bash
VITE_OPEN_WEATHER_API_KEY=your_api_key_here
```
3. **Start the development server**:
```bash
npm run dev
```