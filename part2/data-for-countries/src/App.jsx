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

  return (
    <div>
      <h1>Data for countries</h1>
      <label htmlFor="search">Find countries: </label>
      <input id='search' type="text" onChange={handleChangeSearch} value={search} />
      <Countries countries={countries} />
    </div>
  )
}

export default App
