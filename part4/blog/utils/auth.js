const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("./config");

const authenticateWithPassword = async (username, password) => {
  /**
   * Returnes a JWT token if authentication succeeds, throws otherwise.
   */

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error("invalid username or password");
  }

  const tokenPayload = {
    username: user.username,
    id: user._id,
  };

  return { token: jwt.sign(tokenPayload, config.JWT_SECRET), user };
};

const verifyToken = async (token) => {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  if (!token || !decoded.id) {
    throw new Error("token missing or invalid");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("no matching user for token");
  }

  return user;
};

module.exports = { authenticateWithPassword, verifyToken };
