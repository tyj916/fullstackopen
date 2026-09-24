import { useState } from 'react'

const NewPersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('');

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }
  
  const handleAddPerson = (e) => {
    e.preventDefault();

    const isNameRepeated = persons.some(person => person.name === newName);

    if (isNameRepeated) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <form>
      <p>
        <label htmlFor="name">Name: </label>
        <input id='name' type='text' onChange={handleChangeName} value={newName} />
      </p>
      <div>
        <button type="submit" onClick={handleAddPerson}>Add</button>
      </div>
    </form>
  )
}

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

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
