import { logIn } from "../services/auth.js";
import React, { useState } from "react";

const LoginForm = ({ onLoggedIn, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    logIn(username, password)
      .then((userData) => {
        onLoggedIn(userData);
      })
      .catch((e) => onError(e.message));
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
export default LoginForm;
