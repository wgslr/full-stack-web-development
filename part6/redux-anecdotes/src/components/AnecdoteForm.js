import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    dispatch(addAnecdote({ content: e.target.content.value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="content" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AnecdoteForm;
