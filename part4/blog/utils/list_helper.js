const dummy = (_blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const max = (list, keyExtractor = (x) => x) =>
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
