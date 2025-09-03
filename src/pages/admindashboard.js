import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookModal from '../components/BookModal'; 

const AdminDashboard = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [usersRes, booksRes] = await Promise.all([
        axios.get('/api/admin/users', { headers }),
        axios.get('/api/admin/books', { headers }),
      ]);
      setUsers(usersRes.data);
      setBooks(booksRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`, { headers });
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Delete user error:', err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await axios.delete(`/api/admin/books/${bookId}`, { headers });
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Delete book error:', err);
    }
  };

  const handleUpdateBook = (book) => {
    setEditBook(book);
  };

  const handleBookUpdateSubmit = async (updatedData) => {
    try {
      await axios.put(`/api/admin/books/${editBook._id}`, updatedData, { headers });
      setBooks((prev) =>
        prev.map((book) => (book._id === editBook._id ? { ...book, ...updatedData } : book))
      );
      setEditBook(null);
    } catch (err) {
      console.error('Update book error:', err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
<div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Users ({users.length})</h3>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center border-b pb-1">
              <span>{user.username} - {user.email}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteUser(user._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Books ({books.length})</h3>
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book._id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{book.title}</strong> by {book.author} — ₹{book.price}
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-yellow-400 text-black px-3 py-1 rounded"
                    onClick={() => handleUpdateBook(book)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
{editBook && (
        <BookModal
          initialData={editBook}
          onClose={() => setEditBook(null)}
          onSubmit={handleBookUpdateSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;



























