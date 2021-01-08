const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
