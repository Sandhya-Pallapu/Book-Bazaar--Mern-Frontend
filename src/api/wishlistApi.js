import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const fetchWishlist = async () => {
  const res = await axios.get(`${API}`, { withCredentials: true });
  return res.data;
};

export const addToWishlist = async (bookId) => {
  const res = await axios.post(`${API}/add`, { bookId }, { withCredentials: true });
  return res.data;
};

export const removeFromWishlist = async (bookId) => {
  const res = await axios.post(`${API}/remove`, { bookId }, { withCredentials: true });
  return res.data;
};

