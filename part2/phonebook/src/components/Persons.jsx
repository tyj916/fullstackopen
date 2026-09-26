import personService from '../services/person';

const Person = ({person, persons, setPersons, setNotification}) => {
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

const Persons = ({personsToShow, persons, setPersons, setNotification}) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <Person 
            key={person.id} 
            person={person} 
            persons={persons} 
            setPersons={setPersons} 
            setNotification={setNotification}
          />
        )
      })}
    </div>
  )
}

export default Persons;
