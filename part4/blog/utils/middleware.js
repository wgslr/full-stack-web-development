const tokenExtractor = (req, resp, next) => {
  const auth = req.header("Authorization");

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
  }
  next();
};

module.exports = { tokenExtractor };
