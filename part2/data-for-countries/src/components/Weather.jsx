import { useEffect, useState } from "react";
import axios from "axios";
const weatherKey = import.meta.env.VITE_WEATHER_KEY;

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null);
  const [lat, lon] = country.latlng;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
      .then(response => {
        setWeather(response.data);
      })
  }, [country]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <div>
        <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="" />
      </div>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather;