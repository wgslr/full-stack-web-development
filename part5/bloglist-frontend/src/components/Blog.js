import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => (
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
        {blog.likes} <button>Like</button>
      </p>
    </Togglable>
  </div>
);

export default Blog;
