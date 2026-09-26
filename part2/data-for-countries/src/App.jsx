import { useState } from "react"

const App = () => {
  const [search, setSearch] = useState('');

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  } 

  return (
    <div>
      <h1>Data for countries</h1>
      <label htmlFor="search">Find countries: </label>
      <input id='search' type="text" onChange={handleChangeSearch} value={search} />
      <p>{search}</p>
    </div>
  )
}

export default App
