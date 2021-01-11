import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";
import {
  setNotificationAction,
  unsetNotificationAction,
} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    dispatch(addAnecdoteAction({ content: e.target.content.value }));
    dispatch(setNotificationAction("Anecdote added"));
    setTimeout(() => {
      dispatch(unsetNotificationAction());
    }, 5000);
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
