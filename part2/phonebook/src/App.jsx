import { useState } from 'react'

const NewPersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isNameRepeated = persons.some(person => person.name === newName);

    if (isNameRepeated) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <form>
      <p>
        <label htmlFor="name">Name: </label>
        <input id='name' type='text' onChange={handleChangeName} value={newName} />
      </p>
      <p>
        <label htmlFor="number">Number: </label>
        <input id='number' type="text" onChange={handleChangeNumber} value={newNumber} />
      </p>
      <div>
        <button type="submit" onClick={handleAddPerson}>Add</button>
      </div>
    </form>
  )
}

const Person = ({person}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => {
        return <Person key={person.name} person={person} />
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
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
