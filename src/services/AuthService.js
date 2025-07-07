
import axios from "axios";

const API_URL = "http://localhost:8081/auth";

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

const authService = {
  register,
  login,
};

export default authService;
