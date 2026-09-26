import { useState } from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";

const App = () => {
  const [countries, setCountries] = useState([
    { name: 'abc', capital: 'abc' },
    { name: 'bcd', capital: 'bcd' },
    { name: 'cde', capital: 'cde' },
    { name: 'def', capital: 'def' },
    { name: 'efg', capital: 'efg' },
    { name: 'fgh', capital: 'fgh' },
    { name: 'ghi', capital: 'ghi' },
    { name: 'hij', capital: 'hij' },
    { name: 'ijk', capital: 'ijk' },
    { name: 'jkl', capital: 'jkl' },
    { name: 'klm', capital: 'klm' },
  ]);
  const [search, setSearch] = useState('');
  const countriesToShow = search 
    ? countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    : countries;

  return (
    <div>
      <h1>Data for countries</h1>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App
