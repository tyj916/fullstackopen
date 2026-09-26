import { useState } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([
    { name: 'a', capital: 'abc' },
    { name: 'b', capital: 'def' },
  ]);
  const [search, setSearch] = useState('');

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  } 

  const countriesToShow = search 
    ? countries.filter(country => country.name.toLowerCase() === search.toLowerCase())
    : countries;

  return (
    <div>
      <h1>Data for countries</h1>
      <label htmlFor="search">Find countries: </label>
      <input id='search' type="text" onChange={handleChangeSearch} value={search} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App
