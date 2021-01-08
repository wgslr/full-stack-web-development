const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithThreeBlogs = [
  {
    _id: "6a422aa71b54a676234d17f8",
    title: "Some blog",
    author: "William Shakespeare",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "7a422aa71b54a676234d17f8",
    title: "Rome and Juliet",
    author: "William Shakespeare",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithThreeBlogs);
    expect(result).toBe(11);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test("when list has only one blog, it is favorite", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("blog with most likes is favorite", () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs);
    expect(result).toEqual(listWithThreeBlogs[1]);
  });
});

describe("most blogs author", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test("of one blog is its author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("of many blogs is the most productive author", () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    expect(result).toEqual({ author: "William Shakespeare", blogs: 2 });
  });
});
