import React from "react";
import ReactDOM from "react-dom";
const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ course: { parts } }) =>
  parts.map((part) => <Part key={part.id} {...part} />);

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((acc, { exercises }) => acc + exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
