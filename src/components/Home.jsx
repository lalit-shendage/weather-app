// Home.jsx
import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather'; 
import Forecast from './Forecast';

require('dotenv').config();

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [showFiveDayForecast, setShowFiveDayForecast] = useState(false); 


  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&timezone=19800`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setWeatherData(null);
      setError('An error occurred while fetching data');
    }
  };

  const handleShowForecast = () => {
    setShowFiveDayForecast(!showFiveDayForecast);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weatherData && (
        <div>
          <CurrentWeather weatherData={weatherData} />
          <button onClick={handleShowForecast}>Show 5-day Forecast</button>
          {showFiveDayForecast && <Forecast city={city} apiKey={apiKey} />}
        </div>
      )}
      
    </div>
  );
};

export default Home;
