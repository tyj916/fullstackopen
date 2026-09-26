const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
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
        return <p>{country.name.common}</p>
      })}
    </div>
  )
}

export default Countries;
