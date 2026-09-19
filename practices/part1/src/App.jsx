const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  );
}

const PracticeThis = () => {
  const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
      return 'Hello, my name is ' + this.name;
    }
  }

  return (
    <p>{arto.greet()}</p>
  );
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  );
}

const App = () => {
  const friends = [
    { name: 'Peter', age:4 },
    { name: 'Maya', age:10 },
  ]

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={friends[0].name} age={friends[0].age} />
      <Hello name={friends[1].name} age={friends[1].age} />
      <PracticeThis />
      <Footer />
    </div>
  );
}

export default App
