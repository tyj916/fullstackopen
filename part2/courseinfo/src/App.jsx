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
    <>
      {parts.map((part) => {
        return <Part 
          key={part.name} 
          name={part.name} 
          exercises={part.exercises} 
        />
      })}
    </>
  )
}

function Total({ parts }) {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
