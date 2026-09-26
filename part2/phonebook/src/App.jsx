import { useEffect, useState } from 'react'
import personService from './services/person';
import Search from './components/Search';
import PersonForm from './components/PersonForm';

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
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App
