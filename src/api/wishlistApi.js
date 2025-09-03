import axios from 'axios';

const API = ' process.env.REACT_APP_API_URL, 
  withCredentials: true,';

export const fetchWishlist = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addToWishlist = async (bookId) => {
  const res = await axios.post(`${API}/add`, { bookId });
  return res.data;
};

export const removeFromWishlist = async (bookId) => {
  const res = await axios.post(`${API}/remove`, { bookId });
  return res.data;
};
