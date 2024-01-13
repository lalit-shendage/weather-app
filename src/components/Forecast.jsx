import React, { useState, useEffect } from 'react';
import ForecastCard from './ForcastCard';
import '../assets/css/Forecast.css';

const Forecast = ({ city, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setForecastData(data);
        } else {
          setForecastData(null);
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setForecastData(null);
      }
    };

    fetchForecastData();
  }, [city, apiKey]);

  const formatDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const convertUTCToIST = (utcTime) => {
    const utcDate = new Date(utcTime);
    const istOffset = 5.5 * 60 * 60 * 1000; 
    const istTime = new Date(utcDate.getTime() + istOffset);
    return istTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const groupForecastByDate = () => {
    if (!forecastData || !forecastData.list) {
      return [];
    }

    const groupedForecast = {};

    forecastData.list.forEach((forecast) => {
      console.log(forecastData)
      const date = formatDateString(forecast.dt);
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push({
        time: convertUTCToIST(forecast.dt_txt), 
        temperature: forecast.main.temp,
        description: forecast.weather[0].description,
        condition: forecast.weather[0].main
      });
    });

    return Object.entries(groupedForecast).map(([date, forecasts]) => ({
      date,
      forecasts,
    }));
  };

  return (
    <div>
      <h2>5-Day Weather Forecast for {city}</h2>
      {groupForecastByDate().map((group, index) => (
        <div key={index} className="forecast-group">
          <h3>{group.date}</h3>
          <div className="forecast-row">
            {group.forecasts.map((forecast, forecastIndex) => (
              <ForecastCard key={forecastIndex} {...forecast} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
