const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

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

afterAll(() => {
  mongoose.connection.close();
});
