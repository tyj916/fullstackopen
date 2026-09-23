function Header({ course }) {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
}

function Part({ name, exercises }) {
  return (
    <p>{name} {exercises}</p>
  )
}

function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => {
        return <Part 
          key={part.id} 
          name={part.name} 
          exercises={part.exercises} 
        />
      })}
    </div>
  )
}

function Total({ parts }) {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p>Total of {totalExercises} exercises</p>
  )
}

function Course({course}) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return <Course course={course} />
}

export default App
