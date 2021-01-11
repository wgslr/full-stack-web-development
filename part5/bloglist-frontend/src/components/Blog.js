import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, handleLike, handleDelete, canBeRemoved }) => (
  <div
    style={{
      border: "solid 1px black",
      margin: "0.3em 0",
    }}
    className="blog"
  >
    {blog.title} {blog.author}
    <Togglable name="View">
      <p>{blog.url}</p>
      <p className="likes">{blog.likes} likes</p>
      <button onClick={handleLike}>Like</button>
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
