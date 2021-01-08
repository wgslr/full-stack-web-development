const dummy = (_blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
