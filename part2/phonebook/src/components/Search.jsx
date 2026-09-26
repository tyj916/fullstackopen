const Search = ({search, setSearch}) => {
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Filter shown with </label>
      <input id='search' type="text" onChange={handleChangeSearch} value={search} />
    </div>
  )
}

export default Search;
