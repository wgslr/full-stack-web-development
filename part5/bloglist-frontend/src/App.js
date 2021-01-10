import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const LoginForm = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <label>
            username{" "}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </label>
        </p>
        <p>
          <label>
            password{" "}
            <input
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </label>
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <LoginForm />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
