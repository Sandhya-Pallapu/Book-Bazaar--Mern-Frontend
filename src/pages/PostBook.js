import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PostBook = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    price: '',
    image: '',
    sellerName: '',
    sellerEmail: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        sellerName: user.name || '',
        sellerEmail: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://book-bazaar-mern-backend.onrender.com/api/books/create',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Book posted:', res.data);
      toast.success('Book posted successfully!');
      // Optionally reset form
      setFormData({
        title: '',
        author: '',
        genre: '',
        condition: '',
        price: '',
        image: '',
        sellerName: user.name || '',
        sellerEmail: user.email || '',
      });
    } catch (err) {
      console.error('Error posting book:', err);
      toast.error(err.response?.data?.message || 'Failed to post book');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Post a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'author', 'genre', 'condition', 'price', 'image', 'sellerName', 'sellerEmail'].map((field) => (
          <input
            key={field}
            type={field === 'price' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={field !== 'image'}
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Post Book
        </button>
      </form>
    </div>
  );
};

export default PostBook;


