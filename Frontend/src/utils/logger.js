export const log = (...args) => {
  if (import.meta.env.MODE !== "production") {
    console.log(...args);
  }
};

export const error = (...args) => {
  console.error(...args);
};
