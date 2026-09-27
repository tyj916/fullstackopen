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

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => {
        return <p key={country.cca2}>{country.name.common}</p>
      })}
    </div>
  )
}

export default Countries;
