
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookForm = ({ books = [] }) => {
  const { token } = useAuth(); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = books.some(
      (book) =>
        book.title.toLowerCase().trim() === formData.title.toLowerCase().trim() &&
        book.author.toLowerCase().trim() === formData.author.toLowerCase().trim()
    );

    if (isDuplicate) {
      alert('This book already exists!');
      return;
    }

    try {
      const res = await axios.post(
        "https://book-bazaar-mern-backend-updated.onrender.com/api/books/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Book posted successfully:', res.data);
      alert('Book added successfully!');
      setFormData({
        title: '',
        author: '',
        genre: '',
        condition: '',
        price: '',
        image: '',
        sellerName:"",
        sellerEmail:''

      });
    } catch (error) {
      console.error('Error posting book:', error);
      alert('Failed to post book.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded"
    >
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
      />
      <input
        name="condition"
        placeholder="Condition"
        value={formData.condition}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
        required
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="mb-2 p-2 w-full border"
      />
      <input
  type="text"
  placeholder="Your Name"
  value={formData.sellerName}
  onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
/>

<input
  type="email"
  placeholder="Your Email"
  value={formData.sellerEmail}
  onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
/>

    <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Book
      </button>
    </form>
  );
};

export default BookForm;









