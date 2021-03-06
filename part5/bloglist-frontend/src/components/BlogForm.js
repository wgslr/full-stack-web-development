import React, { useState } from "react";

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
              id="titleInput"
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
              id="authorInput"
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
              id="urlInput"
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
