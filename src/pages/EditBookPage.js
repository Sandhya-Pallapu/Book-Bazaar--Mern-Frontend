import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EditBookPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/books/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/profile');
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update book.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          ✏️ Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['title', 'author', 'genre', 'condition', 'price', 'image'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'price' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;

