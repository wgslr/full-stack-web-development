const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const testingRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../utils/auth");
const logger = require("../utils/logger");

testingRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).end();
});

module.exports = testingRouter;
