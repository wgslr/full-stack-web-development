import React, { useState } from "react";
import axios from "axios";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addBlog({ title, author, url });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <label>
            title{" "}
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            author{" "}
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            url{" "}
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </label>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </div>
  );
};

export default BlogForm;
