import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import {
  setNotificationAction,
  unsetNotificationAction,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteAction(id));
    dispatch(setNotificationAction("Voted"));
    setTimeout(() => {
      dispatch(unsetNotificationAction());
    }, 5000);
  };

  return (
    <>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
