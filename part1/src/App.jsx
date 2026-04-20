const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            <Part part={parts[0].part} exercises={parts[0].exercises} />
            <Part part={parts[1].part} exercises={parts[1].exercises} />
            <Part part={parts[2].part} exercises={parts[2].exercises} />
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
    const content = {
            course: 'Half Stack application development',
            parts: [
            {part: 'Fundamentals of React', exercises: 10},
            {part: 'Using props to pass data', exercises: 7},
            {part: 'State of a component', exercises: 14}
        ]}

    return (
        <>
        <Header course = {content.course} />
        <Content parts = {content.parts} />
        <Total parts = {content.parts} />
        </>
    )
}

export default App