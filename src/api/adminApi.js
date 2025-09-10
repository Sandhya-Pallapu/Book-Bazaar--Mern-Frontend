import axios from 'axios';

const API_BASE = 'https://book-bazaar-mern-backend-updated.onrender.com/api/admin';

export const getAdminStats = async (token) => {
  const res = await axios.get(`${API_BASE}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllBooks = async (token) => {
  const res = await axios.get(`${API_BASE}/books`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteBookById = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
