import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookModal from '../components/BookModal';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [usersRes, booksRes] = await Promise.all([
        axios.get('/api/admin/users', { headers }),
        axios.get('/api/admin/books', { headers }),
      ]);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.users || []);
      setBooks(Array.isArray(booksRes.data) ? booksRes.data : booksRes.data.books || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch data. Please try again later.');
      setUsers([]);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`, { headers });
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Delete user error:', err);
      alert('Failed to delete user.');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await axios.delete(`/api/admin/books/${bookId}`, { headers });
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Delete book error:', err);
      alert('Failed to delete book.');
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
      alert('Failed to update book.');
    }
  };

  if (loading) return <p className="p-6">Loading admin dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Users ({users?.length || 0})</h3>
        {users?.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center border-b pb-1">
                <span>{user.username || user.name || 'Unknown'} - {user.email}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Books ({books?.length || 0})</h3>
        {books?.length > 0 ? (
          <ul className="space-y-2">
            {books.map((book) => (
              <li key={book._id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{book.title}</strong> by {book.author || 'Unknown'} — ₹{book.price || 0}
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
        ) : (
          <p>No books found.</p>
        )}
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




























