const info = (...args) => console.log(...args);
const debug = (...args) => console.debug(...args);
const error = (...args) => console.error(...args);

module.exports = {
  info,
  debug,
  error,
};
