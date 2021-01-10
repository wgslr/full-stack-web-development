import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import axios from "axios";
import { usePersistedState } from "./hooks/usePersistedState";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = usePersistedState("user", null);

  console.log("local storage:", window.localStorage);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const onLoggedIn = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

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
