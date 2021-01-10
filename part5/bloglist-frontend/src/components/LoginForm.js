import { logIn } from "../services/auth.js";
import React, { useState } from "react";

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
export default LoginForm;
