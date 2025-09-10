
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://book-bazaar-mern-backend-updated.onrender.com",
  withCredentials: true,
});


instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default instance;

