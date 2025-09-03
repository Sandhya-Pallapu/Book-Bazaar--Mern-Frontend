
import axios from "axios";

const API = axios.create({
  baseURL: "https://book-bazaar-mern-backend.onrender.com/api",
  withCredentials: true,
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getUserProfile = async () => {
  const { data } = await API.get("/users/profile");
  return data;
};
