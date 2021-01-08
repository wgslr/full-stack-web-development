const blogsRouter = require("express").Router();
const { rawListeners } = require("../app");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response) => {
  const args = request.body;

  if (!args["title"] || !args["author"]) {
    response.status(400).end();
    return;
  }

  args.likes = args.likes ?? 0;

  const blog = new Blog(args);

  const saved = await blog.save();
  response.status(201).json(saved);
});

blogsRouter.delete("/:id", async (req, resp) => {
  const id = req.params.id;

  const result = await Blog.findByIdAndDelete(id);
  if (result) {
    logger.info(`Removed blog with id ${id}`);
    resp.status(204).end();
  } else {
    logger.info("Blog to be removed not found");
    resp.status(404).json({ error: "Blog to be removed does not exist" });
  }
});

module.exports = blogsRouter;
