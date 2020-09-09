import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => (
  <div>
    {parts.map((part, idx) => (
      <Part part={part} key={idx} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((acc, { exercises }) => acc + exercises, 0)}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
