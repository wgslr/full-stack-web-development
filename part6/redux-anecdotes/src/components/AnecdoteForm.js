import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdoteAction, asObject } from "../reducers/anecdoteReducer";
import {
  setNotificationAction,
  unsetNotificationAction,
} from "../reducers/notificationReducer";
import axios from "axios";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const newAnecdote = asObject(content);
    axios.post("/anecdotes", newAnecdote).then(() => {
      dispatch(addAnecdoteAction(newAnecdote));
      dispatch(setNotificationAction("Anecdote added"));
      setTimeout(() => {
        dispatch(unsetNotificationAction());
      }, 5000);
    });
  };

  return (
    <>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input name="content" />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default AnecdoteForm;
