import api from "./api";

const authService = {
  signup: (username, email, password) =>
    api.post("/auth/signup", { username, email, password }),

  login: (email, password) => api.post("/auth/login", { email, password }),
};

export default authService;
