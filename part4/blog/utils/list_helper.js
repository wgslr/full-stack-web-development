var _ = require("lodash");

const dummy = (_blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const max = (list, keyExtractor = _.identity) =>
  list.reduce(
    (best, curr) => (keyExtractor(best) > keyExtractor(curr) ? best : curr),
    list[0]
  );

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return max(blogs, (b) => b.likes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = _.countBy(blogs, (b) => b.author);
  const authors = Object.entries(counts).map((c) => ({
    author: c[0],
    blogs: c[1],
  }));
  return max(authors, (x) => x.blogs);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
