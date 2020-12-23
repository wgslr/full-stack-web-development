import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const length = anecdotes.length;

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(() => {
    const votesBuilder = {};
    anecdotes.forEach((_, index) => {
      votesBuilder[index] = 0;
    });
    return votesBuilder;
  });

  console.log({ votes });
  const randomize = () => {
    let newNumber = selected;
    while (newNumber == selected) {
      newNumber = Math.floor(Math.random() * length);
    }

    setSelected(newNumber);
  };

  const vote = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1,
    };
    setVotes(newVotes);
  };

  let bestAnecdoteIdx = 0;
  let bestAnecdoteVotes = votes[0];
  for (const key in votes) {
    if (Object.hasOwnProperty.call(votes, key)) {
      const element = votes[key];
      console.log({ key, element, bestAnecdoteIdx, bestAnecdoteVotes });
      if (element > bestAnecdoteVotes) {
        bestAnecdoteIdx = key;
        bestAnecdoteVotes = element;
      }
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={vote}>vote</button>
      <button onClick={randomize}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestAnecdoteIdx]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
