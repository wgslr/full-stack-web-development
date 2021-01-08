const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("express-async-errors");
const app = express();

const { PORT, MONGODB_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/users");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
