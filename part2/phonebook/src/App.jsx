import { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <p>
          <label htmlFor="name">Name: </label>
          <input id='name' type='text' onChange={handleChangeName} value={newName} />
        </p>
        <div>
          <button type="submit" onClick={handleAddPerson}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
