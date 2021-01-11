import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    dispatch(addAnecdoteAction({ content: e.target.content.value }));
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
