export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mockenv.com"
    : import.meta.env.VITE_API_URL;
