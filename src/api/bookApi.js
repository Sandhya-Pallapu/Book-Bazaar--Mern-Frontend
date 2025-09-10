import axios from "axios";

const API = axios.create({
  baseURL: "https://book-bazaar-mern-backend-updated.onrender.com/api",
});

export const getAllBooks = () => API.get("/books");

export const addBook = (data, token) =>
  API.post("/books/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBook = (id, data, token) =>
  API.put(`/books/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  


export const deleteBook = (id, token) =>
  API.delete(`/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
