import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import {
  setNotificationAction,
  unsetNotificationAction,
} from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(({ anecdotes, filter }) => ({
    anecdotes,
    filter,
  }));
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
      <Filter />
      {sorted
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
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
