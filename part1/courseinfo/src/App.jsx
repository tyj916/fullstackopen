function Header({ course }) {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
}

function Part({ title, exercises }) {
  return (
    <p>{title} {exercises}</p>
  )
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => {
        return <Part 
          key={part.title} 
          title={part.title} 
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
  const course = 'Half Stack application development'
  const parts = [
    { title: 'Fundamentals of React', exercises: 10 },
    { title: 'Using props to pass data', exercises: 7 },
    { title: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
