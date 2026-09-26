const Search = ({search, setSearch}) => {
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  } 

  return (
    <div>
    <label htmlFor="search">Find countries: </label>
      <input id='search' type="text" onChange={handleChangeSearch} value={search} />
    </div>
  )
}

export default Search;
