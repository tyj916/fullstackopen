function Header({ course }) {
  return (
    <h2>{course}</h2>
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
    <p><b>Total of {totalExercises} exercises</b></p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <header>
        <h1>Web Development Curriculum</h1>
      </header>

      {courses.map(course => {
        return <Course key={course.id} course={course} />
      })}
    </div>
  )
}

export default App
