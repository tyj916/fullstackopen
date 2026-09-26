import { useEffect, useState } from 'react'
import personService from './services/person';
import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const Person = ({persons, person, setPersons, setNotification}) => {
  const handleDeletePerson = () => {
    const isConfirmed = confirm(`Delete ${person.name}?`);

    if (isConfirmed) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
          setNotification(`Deleted ${deletedPerson.name}`);
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

const Persons = ({persons, setPersons, setNotification}) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person 
            key={person.id} 
            persons={persons} 
            person={person} 
            setPersons={setPersons} 
            setNotification={setNotification}
          />
        )
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');

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

  const setNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search search={search} setSearch={setSearch} />
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}

export default App
