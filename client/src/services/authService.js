import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register user
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data; // { message, user }
};

// Login user
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data; // { message, token, user }
};

const authService = { register, login };
export default authService;
