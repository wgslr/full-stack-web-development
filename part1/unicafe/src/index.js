import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const allScores = good + neutral + bad;
  const avg = (good * 1 + bad * -1) / allScores;
  const positive = good / allScores;
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allScores}</p>
      <p>average {avg}</p>
      <p>positive {positive * 100}%</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((v) => v + 1)}>good</button>
      <button onClick={() => setNeutral((v) => v + 1)}>neutral</button>
      <button onClick={() => setBad((v) => v + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
