import React from 'react';

const ForecastCard = ({ time, temperature, description, condition }) => {
  
    return (
        <div className="forcast-c">
      <div className={`forecast-card`} data-weather={condition}>
      
        <p className='time'>{time}</p>
        <p className='temp'>{Math.round(temperature - 273.15)} °C</p>
        <p className='desc'>{description}</p>
      </div>
      </div>
    );
  };
  
  export default ForecastCard;