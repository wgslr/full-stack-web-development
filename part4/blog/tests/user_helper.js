const bcrypt = require("bcrypt");
const User = require("../models/user");

const getAllUsersFromDb = async () => await User.find({});

const addUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const name = username.toUpperCase();
  const user = new User({ username, name, passwordHash });
  return await user.save();
};

module.exports = {
  addUser,
  getAllUsersFromDb,
};
