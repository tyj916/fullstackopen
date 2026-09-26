import personService from '../services/person';

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

export default Persons;
