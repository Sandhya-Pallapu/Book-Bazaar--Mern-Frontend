import React, { useState } from 'react';
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
    sellerName: '',
    sellerEmail: '',
    image: '', 
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      if (files && files[0]) {
        setImageFile(files[0]);
        setFormData({ ...formData, image: '' }); 
      } else {
        setFormData({ ...formData, image: value });
        setImageFile(null); 
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      let payload;
      let headers = { Authorization: `Bearer ${token}` };

      if (imageFile) {
        payload = new FormData();
        Object.keys(formData).forEach((key) => payload.append(key, formData[key]));
        payload.append('image', imageFile);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        payload = formData; 
      }

      const res = await axios.post(
        'https://book-bazaar-mern-backend-updated.onrender.com/api/books/create',
        payload,
        { headers }
      );

      console.log('Book posted:', res.data);
      toast.success('Book posted successfully!');
      setFormData({
        title: '',
        author: '',
        genre: '',
        condition: '',
        price: '',
        sellerName: '',
        sellerEmail: '',
        image: '',
      });
      setImageFile(null);
    } catch (err) {
      console.error('Error posting book:', err);
      toast.error(err.response?.data?.message || 'Failed to post book');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-6 pt-20">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">Post a Book</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['title', 'author', 'genre', 'condition', 'price', 'sellerName', 'sellerEmail'].map(
            (field) => (
              <div key={field}>
                <input
                  type={field === 'price' ? 'number' : 'text'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:outline-none transition"
                  required
                />
              </div>
            )
          )}

          <div>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 mb-2 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:outline-none transition"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg shadow transition"
          >
            Post Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBook;





