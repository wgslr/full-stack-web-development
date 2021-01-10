import axios from "axios";

export const logIn = async (username, password) => {
  // will throw on non-200 error code
  const resp = await axios.post("/api/login", {
    username,
    password,
  });
  const { name, token } = resp.data;
  return { username, name, token };
};
