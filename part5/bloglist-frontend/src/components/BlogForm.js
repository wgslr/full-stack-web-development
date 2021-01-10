import React, { useState } from "react";
import axios from "axios";

const addBlogPost = async (data, user) => {
  const resp = await axios.post("/api/blogs", data, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return resp.data;
};

const BlogForm = ({ onCreated, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addBlogPost({ title, author, url }, user).then(
      (created) => onCreated(created),
      (e) => console.error(e)
    );
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
