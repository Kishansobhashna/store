import axios from "axios";

// Set base URL
const API_URL = "http://localhost:3000/api";

// Set Auth Token
const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"];
};

// User Login
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", res.data.token);
  setAuthToken(res.data.token);
  return res.data;
};

// Fetch Users
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

// Add Product
export const addProduct = async (product) => {
  const res = await axios.post(`${API_URL}/products`, product);
  return res.data;
};

// Place Order
export const placeOrder = async (order) => {
  const res = await axios.post(`${API_URL}/orders`, order);
  return res.data;
};
