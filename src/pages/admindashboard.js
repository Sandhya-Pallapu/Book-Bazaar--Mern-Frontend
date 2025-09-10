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

  const backendURL = 'https://book-bazaar-mern-backend-updated.onrender.com';
  const headers = { Authorization: `Bearer ${token}` };

  
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

  const handleUpdateBook = (book) => setEditBook(book);

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
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <p className="text-slate-600 text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Users ({users.length})</h3>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user._id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-slate-800">{user.name || user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>


          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Books ({books.length})</h3>
            {books.length === 0 ? (
              <p className="text-gray-500">No books found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {books.map((book) => (
                  <li key={book._id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-slate-800">{book.title}</p>
                      <p className="text-sm text-gray-500">
                        {book.author} — ₹{book.price}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-sm transition"
                        onClick={() => handleUpdateBook(book)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
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





























