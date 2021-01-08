const User = require("../models/user");

const getAllUsersFromDb = async () => await User.find({});

module.exports = {
  getAllUsersFromDb,
};
