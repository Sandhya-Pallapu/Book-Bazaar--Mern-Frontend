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

  const backendURL = 'https://book-bazaar-mern-backend.onrender.com';
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch users and books
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, booksRes] = await Promise.all([
        axios.get(`${backendURL}/api/admin/users`, { headers }),
        axios.get(`${backendURL}/api/admin/books`, { headers }),
      ]);

      setUsers(usersRes.data || []);
      setBooks(booksRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setUsers([]);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${backendURL}/api/admin/users/${userId}`, { headers });
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Delete user error:', err);
      alert('Failed to delete user.');
    }
  };

  // Delete book
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await axios.delete(`${backendURL}/api/admin/books/${bookId}`, { headers });
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Delete book error:', err);
      alert('Failed to delete book.');
    }
  };

  // Open edit book modal
  const handleUpdateBook = (book) => {
    setEditBook(book);
  };

  // Submit updated book data
  const handleBookUpdateSubmit = async (updatedData) => {
    try {
      await axios.put(`${backendURL}/api/admin/books/${editBook._id}`, updatedData, { headers });
      setBooks((prev) =>
        prev.map((book) => (book._id === editBook._id ? { ...book, ...updatedData } : book))
      );
      setEditBook(null);
    } catch (err) {
      console.error('Update book error:', err);
      alert('Failed to update book.');
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Users ({users.length})</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center border-b pb-1">
                <span>{user.name || user.username} - {user.email}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Books Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Books ({books.length})</h3>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
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
        )}
      </div>

      {/* Edit Book Modal */}
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



























