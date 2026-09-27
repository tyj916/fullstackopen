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
