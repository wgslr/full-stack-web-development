const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const auth = require("../utils/auth");
const helper = require("./user_helper");

const api = supertest(app);

const USERNAME = "root";
const PASSWORD = "somepassword";

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await helper.addUser(USERNAME, PASSWORD);
  });

  test("user can log in with correct password", async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: USERNAME,
        password: PASSWORD,
      })
      .expect("Content-Type", /json/);
    expect(200);
    const { token, username } = response.body;

    expect(auth.verifyToken(token)).toBeTruthy();
  });

  test("user can't log in with incorrect password", async () => {
    await api
      .post("/api/login")
      .send({
        username: USERNAME,
        password: "wrongpassword",
      })
      .expect(401);
  });

  test("post creates a user", async () => {
    const body = {
      username: "someusername",
      name: "Some User",
      password: "password123",
    };
    const response = await api
      .post("/api/users")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(201);
    const createdUser = response.body;

    expect(createdUser.username).toEqual(body.username);
    expect(createdUser.name).toEqual(body.name);
    expect(createdUser).not.toHaveProperty("password");
    expect(createdUser).not.toHaveProperty("passwordHash");

    expect(await helper.getAllUsersFromDb()).toHaveLength(2);
  });

  test("too short username is rejected", async () => {
    const body = {
      username: "so",
      name: "Some User",
      password: "password123",
    };
    const response = await api
      .post("/api/users")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();

    expect(await helper.getAllUsersFromDb()).toHaveLength(1);
  });

  test("missing username is rejected", async () => {
    const body = {
      name: "Some User",
      password: "password123",
    };
    const response = await api
      .post("/api/users")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();

    expect(await helper.getAllUsersFromDb()).toHaveLength(1);
  });

  test("too short password is rejected", async () => {
    const body = {
      username: "someuser",
      name: "Some User",
      password: "pa",
    };
    const response = await api
      .post("/api/users")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();

    expect(await helper.getAllUsersFromDb()).toHaveLength(1);
  });

  test("missing password is rejected", async () => {
    const body = {
      username: "someuser",
      name: "Some User",
    };
    const response = await api
      .post("/api/users")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();

    expect(await helper.getAllUsersFromDb()).toHaveLength(1);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
