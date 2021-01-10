import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import axios from "axios";
import { usePersistedState } from "./hooks/usePersistedState";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = usePersistedState("user", null);
  const [notification, setNotificationState] = useState(null);

  const setNotification = (message, isGood) => {
    setNotificationState({ message, isGood });
  };
  useEffect(() => {
    const timer = setTimeout(() => setNotificationState(null), 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const onLoggedIn = (userData) => {
    setUser(userData);
    setNotification("Logged in", true);
  };
  const handleError = (message) => setNotification(message, false);
  const handleLogout = () => setUser(null);
  const onBlogCreated = (created) => {
    setBlogs((old) => old.concat(created));
    setNotification(`Blog '${created.title}' created`, true);
  };

  return (
    <div>
      {notification && <Notification {...notification} />}
      <h2>blogs</h2>
      {user ? (
        <>
          <p>
            Logged in as {user.name}{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <BlogForm
            user={user}
            onCreated={onBlogCreated}
            onError={handleError}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm onLoggedIn={onLoggedIn} onError={handleError} />
      )}
    </div>
  );
};

export default App;
