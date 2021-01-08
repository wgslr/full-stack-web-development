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

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  resp.json(savedUser);
});

module.exports = usersRouter;
