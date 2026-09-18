function Header({course}) {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
}

function Content({parts}) {
  return (
    <>
      {parts.map((part) => {
        return <p key={part.title}>{part.title} {part.exercises}</p>
      })}
    </>
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
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  )
}

export default App
