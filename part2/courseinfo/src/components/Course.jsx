const Course = (props) => {
    console.log("prop is ", props)
    const { name, parts } = props.course
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <h1>{name}</h1>
            {parts.map(part => (
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
            <p><strong>total of {totalExercises} exercises</strong></p>
        </div>
    )
}

export default Course