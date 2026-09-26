import { useState } from "react";
import personService from '../services/person';

const PersonForm = ({persons, setPersons, setNotification}) => {
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

    // if name already exists, ask if the user wants to update the phone number
    if (isNameRepeated && newNumber) {
      const isConfirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if (isConfirmed) {
        const currentPerson = persons.find(person => person.name === newName);
        const updatedPerson = { ...currentPerson, number: newNumber };

        personService
          .update(currentPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
            setNewName('');
            setNewNumber('');
            setNotification(`Updated ${returnedPerson.name} number to ${returnedPerson.number}`);
          })
          .catch(err => {
            setNotification(`Information of ${currentPerson.name} has already been removed from server`);
            setPersons(persons.filter(person => person.id !== currentPerson.id));
          });
      }

      return;
    }

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
        setNotification(`Added ${returnedPerson.name}`);
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

export default PersonForm;
