const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[2].name} exercises={parts[2].exercises} />
        </div>
    )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Total = ({parts}) => {
    return (
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <>
        <Header course = {course} />
        <Content parts = { [part1, part2, part3] } />
        <Total parts = { [part1, part2, part3] } />
        </>
    )
}

export default App