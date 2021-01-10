import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import axios from "axios";
import { usePersistedState } from "./hooks/usePersistedState";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const addBlogPost = async (data, user) => {
  const resp = await axios.post("/api/blogs", data, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return resp.data;
};

const likeBlog = async (blog) => {
  await axios.patch(`/api/blogs/${blog.id}`, {
    likes: blog.likes + 1,
  });
  return {
    ...blog,
    likes: blog.likes + 1,
  };
};

const deleteBlog = async (blog, user) => {
  await axios.delete(`/api/blogs/${blog.id}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
};

const updateInArray = (arr, oldobj, newobj, keyExtractor = (x) => x) => {
  const needle = keyExtractor(oldobj);
  return arr.map((x) => (keyExtractor(x) == needle ? newobj : x));
};

const sortBlogs = (bs) => bs.sort((a, b) => b.likes - a.likes);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = usePersistedState("user", null);
  const [notification, setNotificationState] = useState(null);
  const formTogglableRef = useRef();

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
  const addBlog = async (blogData) => {
    try {
      const created = await addBlogPost(blogData, user);
      setBlogs((old) => old.concat(created));
      setNotification(`Blog '${created.title}' created`, true);
      formTogglableRef.current.toggle();
    } catch (e) {
      setNotification(e.message, false);
    }
  };

  const handleLike = (blog) => {
    console.log(`Liking blog ${blog.id} ${blog.title}`);
    likeBlog(blog).then(
      (updated) => {
        setNotification(`Blog ${updated.title} liked`, true);
        setBlogs((old) => updateInArray(old, blog, updated, (x) => x.id));
      },
      (failed) => setNotification(failed.message, false)
    );
  };

  const handleDelete = (blog) => {
    deleteBlog(blog, user).then(
      () => {
        setBlogs((old) => old.filter((x) => x.id != blog.id));
        setNotification(`Blog ${blog.id} ${blog.title} removed`, true);
      },
      (failed) => setNotification(failed.message, false)
    );
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
          <Togglable name={"Add blog"} ref={formTogglableRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {sortBlogs(blogs).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleDelete={() => handleDelete(blog)}
              canBeRemoved={blog.user && blog.user.id === user.id}
            />
          ))}
        </>
      ) : (
        <LoginForm onLoggedIn={onLoggedIn} onError={handleError} />
      )}
    </div>
  );
};

export default App;
