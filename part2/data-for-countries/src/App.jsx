import { useEffect, useState } from "react";
import axios from 'axios';
import Countries from "./components/Countries";
import Search from "./components/Search";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const [search, setSearch] = useState('');
  const countriesToShow = search 
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries;

  return (
    <div>
      <h1>Data for countries</h1>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={countriesToShow} setSearch={setSearch} />
    </div>
  )
}

export default App
