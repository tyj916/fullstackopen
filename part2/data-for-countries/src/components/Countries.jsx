const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      {countries.map(country => {
        return <p>{country.name}</p>
      })}
    </div>
  )
}

export default Countries;
