const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const auth = require("../utils/auth");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;
    const { token, user } = await auth.authenticateWithPassword(
      username,
      password
    );
    return response
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    return response.status(401).json({
      error: error.message,
    });
  }
});

module.exports = loginRouter;
