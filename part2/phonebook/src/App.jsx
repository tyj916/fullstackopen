import { useEffect, useState } from 'react'
import personService from './services/person';
import Search from './components/search';

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

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
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

const Person = ({persons, person, setPersons}) => {
  const handleDeletePerson = () => {
    const isConfirmed = confirm(`Delete ${person.name}?`);

    if (isConfirmed) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
        });
    }
  }

  return (
    <div>
      <p>
        {person.name} {person.number}  
        <button 
          type='button' 
          onClick={handleDeletePerson}
        >Delete</button>
      </p>
    </div>
  )
}

const Persons = ({persons, setPersons}) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person 
            key={person.id} 
            persons={persons} 
            person={person} 
            setPersons={setPersons} 
          />
        )
      })}
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
      <Search search={search} setSearch={setSearch} />
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App
