import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const allScores = good + neutral + bad;
  if (allScores === 0) {
    return <p>No feedback given</p>;
  }
  const avg = (good * 1 + bad * -1) / allScores;
  const positive = good / allScores;
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={allScores} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive * 100 + "%"} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((v) => v + 1)} text="good" />
      <Button onClick={() => setNeutral((v) => v + 1)} text="neutral" />
      <Button onClick={() => setBad((v) => v + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
