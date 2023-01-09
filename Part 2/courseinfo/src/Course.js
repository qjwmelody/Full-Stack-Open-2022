const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return(
        parts.map(part=> <Part part={part} key={part.id}/>)
    )
}

const Total = ({ parts }) =>{ 
    const total = parts.reduce((s, p) => s + p.exercises, 0);
    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    )
}

const Course = ({course}) =>{
    return(
        course.map(course1=>
            <div key={course1.id}>
                <Header course={course1.name} />
                <Content parts={course1.parts} />
                <Total parts={course1.parts} />
            </div>
        )
    )
}

export default Course