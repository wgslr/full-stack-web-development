const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./blog_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()));
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("all blogs have id property", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  expect(blogs.length).toBeTruthy();
  blogs.forEach((b) => {
    expect(b).toHaveProperty("id");
    expect(b).not.toHaveProperty("_id");
  });
});

test("post creates a blog post", async () => {
  const body = {
    title: "New blog",
    author: "Some author",
    url: "/some-url",
    likes: 2,
  };
  const response = await api
    .post("/api/blogs")
    .send(body)
    .expect("Content-Type", /json/)
    .expect(201);
  const createdBlog = response.body;

  // prepare object for comparison
  const stripped = Object.assign({}, createdBlog);
  delete stripped.id;

  expect(stripped).toEqual(body);
  expect(await helper.getAllBlogsFromDb()).toHaveLength(
    helper.initialBlogs.length + 1
  );
});

test("likes number default is 0", async () => {
  const body = {
    title: "New blog",
    author: "Some author",
    url: "/some-url",
  };
  const response = await api
    .post("/api/blogs")
    .send(body)
    .expect("Content-Type", /json/)
    .expect(201);
  const createdBlog = response.body;

  expect(await helper.getAllBlogsFromDb()).toHaveLength(
    helper.initialBlogs.length + 1
  );
  expect(createdBlog.likes).toBe(0);
});

test("title is a required property", async () => {
  const body = {
    author: "Some author",
    url: "/some-url",
  };
  await api.post("/api/blogs").send(body).expect(400);

  expect(await helper.getAllBlogsFromDb()).toHaveLength(
    helper.initialBlogs.length
  );
});

test("author is a required property", async () => {
  const body = {
    title: "Some title",
    url: "/some-url",
  };
  await api.post("/api/blogs").send(body).expect(400);

  expect(await helper.getAllBlogsFromDb()).toHaveLength(
    helper.initialBlogs.length
  );
});

afterAll(() => {
  mongoose.connection.close();
});
