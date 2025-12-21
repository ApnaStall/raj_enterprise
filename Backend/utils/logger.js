const log = (...args) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(...args);
  }
};

const error = (...args) => {
  console.error(...args);
};

module.exports = { log, error };
