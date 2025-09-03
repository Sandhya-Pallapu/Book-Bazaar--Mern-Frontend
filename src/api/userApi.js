// frontend/src/api/userApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://book-bazaar-mern-backend.onrender.com/api", // change to your backend URL in production
});

// Automatically attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Get user profile (listings + wishlist)
export const getUserProfile = async () => {
  const { data } = await API.get("/users/profile");
  return data;
};
