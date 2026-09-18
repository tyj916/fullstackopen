function Header({ course }) {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => {
        return <p key={part.title}>{part.title} {part.exercises}</p>
      })}
    </>
  )
}

function Footer({ parts }) {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <footer>
      <p>Number of exercises {totalExercises}</p>
    </footer>
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
      <Footer parts={parts} />
    </div>
  )
}

export default App
