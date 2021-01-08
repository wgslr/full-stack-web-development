const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const auth = require("../utils/auth");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;
    const { token, user } = await auth.authenticate(username, password);
    logger.debug({ token, user });
    return response
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    logger.info("Authentication error", error);
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
});

module.exports = loginRouter;
