import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import { voteAction } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAction(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;