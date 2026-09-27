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

const Country = ({country}) => {
  const languages = Object.entries(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {languages.map(([key, language]) => {
          return <li key={key}>{language}</li>
        })}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <Weather country={country} />
    </div>
  )
}

const Countries = ({countries, setSearch}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <ul>
      {countries.map(country => {
        const handleShow = () => {
          setSearch(country.name.common);
        }

        return (
          <li key={country.cca2}>
            <p>
              {country.name.common}
              <button type="button" onClick={handleShow}>Show</button>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export default Countries;
