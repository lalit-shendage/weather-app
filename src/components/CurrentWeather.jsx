import React from "react";
import "../assets/css/Currentweather.css";


const CurrentWeather = ({ weatherData }) => {
  const weatherCondition = weatherData.weather[0].description;
  const weatherIcon = weatherData.weather[0].icon;
  const weatherBg= weatherData.weather[0].main

  const weatherIconLink = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  const convertDegreesToDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directions[index-1];
  };

  return (
    <div className={`container`} data-weather={weatherBg}>
      <div className="overlay"></div>
      <h2>Weather in {weatherData.name}</h2>
      <p className="decs-title">{weatherCondition}</p>
      <p className="temp">{Math.round(weatherData.main.temp - 273.15)} °C  <img src={weatherIconLink} alt="" /></p>
      <p>Min Temp:{Math.round(weatherData.main.temp_min - 273.15)} °C</p>
      <p>Max Temp:{Math.round(weatherData.main.temp_max - 273.15)} °C</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>
        Wind: {Math.round(weatherData.wind.speed * 3.6)} km/hr from {" "}
        {convertDegreesToDirection(weatherData.wind.deg)}
      </p>
      <p>{weatherCondition}</p>
     
    </div>
  );
};

export default CurrentWeather;
