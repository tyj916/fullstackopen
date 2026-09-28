import { useEffect, useRef, useState } from 'react'
import personService from './services/person';
import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);

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

  const timerRef = useRef(null);

  const setNotification = (content, type = 'notification') => {
    setMessage({
      content,
      type,
    });

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search search={search} setSearch={setSearch} />
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} 
        persons={persons}
        setPersons={setPersons} 
        setNotification={setNotification} 
      />
    </div>
  )
}

export default App
