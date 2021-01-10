import React from "react";
import Togglable from "./Togglable";
import axios from "axios";

const Blog = ({ blog, handleLike, handleDelete, canBeRemoved }) => (
  <div
    style={{
      border: "solid 1px black",
      margin: "0.3em 0",
    }}
  >
    {blog.title} {blog.author}
    <Togglable name="View">
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button onClick={handleLike}>Like</button>
      </p>
      {canBeRemoved && (
        <button
          onClick={() => {
            window.confirm(`Delete blog ${blog.title}?`) && handleDelete();
          }}
        >
          Remove
        </button>
      )}
    </Togglable>
  </div>
);

export default Blog;
