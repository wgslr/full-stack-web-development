import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ course: { parts } }) =>
  parts.map((part) => <Part {...part} />);

const Total = ({ course: { parts } }) => {
  let total = 0;
  parts.forEach(({ exercises }) => (total += exercises));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
