const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

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

module.exports = blogsRouter;
