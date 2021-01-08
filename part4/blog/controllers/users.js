const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");

const usersRouter = express.Router();

usersRouter.get("/", async (req, resp) => {
  const users = await User.find({});
  resp.json(users);
});

usersRouter.post("/", async (req, resp) => {
  const body = req.body;
  const { username, password, name } = body;

  if (!(username && password && username.length >= 3 && password.length >= 3)) {
    resp
      .status(400)
      .json({ error: "Name and password must be at least 3 characters long" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    resp.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return resp.status(400).json({ error: error.message });
    } else {
      throw error;
    }
  }
});

module.exports = usersRouter;
