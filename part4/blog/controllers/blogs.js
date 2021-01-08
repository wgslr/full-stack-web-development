const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const auth = require("../utils/auth");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let client;
  const args = request.body;

  if (!args["title"] || !args["author"]) {
    response.status(400).end();
    return;
  }

  try {
    client = await auth.verifyToken(request.token);
  } catch (error) {
    logger.debug("caught", { error });
    response.status(401).json({ error: error.message });
    return;
  }

  args.likes = args.likes ?? 0;
  args.user = client._id;

  const blog = new Blog(args);

  const saved = await blog.save();
  client.blogs.push(saved._id);
  await client.save();
  response.status(201).json(saved);
});

blogsRouter.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  let client;
  try {
    client = await auth.verifyToken(req.token);
  } catch (error) {
    resp.status(401).json({ error: error.message });
    return;
  }

  const blog = await Blog.findById(id);

  if (blog) {
    logger.debug({ blog });
    if (blog.user.toString() != client._id.toString()) {
      resp.status(403).end();
      return;
    }

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
