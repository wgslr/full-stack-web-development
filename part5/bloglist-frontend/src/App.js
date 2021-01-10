import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import axios from "axios";
import { usePersistedState } from "./hooks/usePersistedState";

const logIn = async (username, password) => {
  // will throw on non-200 error code
  const resp = await axios.post("http://127.0.0.1:3001/api/login", {
    username,
    password,
  });
  const { name, token } = resp.data;
  return { username, name, token };
};

const LoginForm = ({ onLoggedIn }) => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    logIn(username, password)
      .then((userData) => {
        onLoggedIn(userData);
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && <p>Error: {error}</p>}
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
  const [user, setUser] = usePersistedState("user", null);

  console.log("local storage:", window.localStorage);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const onLoggedIn = (userData) => {
    // window.localStorage.setItem("user", JSON.stringify(userData));
    // console.log("Updated local storage with", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      {user ? (
        <>
          <p>
            Logged in as {user.name}{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm onLoggedIn={onLoggedIn} />
      )}
    </div>
  );
};

export default App;
