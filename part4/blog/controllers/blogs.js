const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const args = request.body;

  if (!args["title"] || !args["author"]) {
    response.status(400).end();
    return;
  }

  args.likes = args.likes ?? 0;
  const creator = await User.findOne({});
  args.user = creator._id;

  const blog = new Blog(args);

  const saved = await blog.save();
  creator.blogs.push(saved._id);
  await creator.save();
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

blogsRouter.patch("/:id", async (req, resp) => {
  const id = req.params.id;
  const { likes } = req.body;
  if (likes === undefined) {
    resp.stats(400).end();
    return;
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    resp.stats(404).end();
    return;
  }

  blog.likes = likes;
  await blog.save();

  logger.info(`Updated blog with id ${id}`);
  resp.status(200).json(blog);
});

module.exports = blogsRouter;
