const Countries = ({countries}) => {
  return (
    <div>
      {countries.map(country => {
        return <p>{country.name}</p>
      })}
    </div>
  )
}

export default Countries;
