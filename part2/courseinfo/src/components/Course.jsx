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

export default Course;