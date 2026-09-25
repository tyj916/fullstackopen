import { useEffect, useState } from 'react'
import personService from './services/person';

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
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Add New Person</h2>
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
    </div>
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
        return <Person key={person.id} person={person} />
      })}
    </div>
  )
}

const SearchByName = ({search, setSearch}) => {
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

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const [search, setSearch] = useState('');
  const personsToShow = search 
    ? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())) 
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchByName search={search} setSearch={setSearch} />
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
