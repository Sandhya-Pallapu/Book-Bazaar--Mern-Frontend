import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const WishListPage = () => {
  const { user, token } = useAuth();
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get('https://book-bazaar-mern-backend-updated.onrender.com/api/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlistBooks(res.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, token, navigate]);

  const removeFromWishlist = async (bookId) => {
    try {
      await axios.delete(`https://book-bazaar-mern-backend-updated.onrender.com/api/wishlist/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistBooks((prevBooks) => prevBooks.filter((book) => book && book._id !== bookId));
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">My Wishlist</h2>

      {loading ? (
        <p className="text-slate-600">Loading wishlist...</p>
      ) : wishlistBooks.length === 0 ? (
        <p className="text-slate-600">No books in wishlist</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistBooks.filter(Boolean).map((book) => (
            <li
              key={book._id}
              className="border p-4 rounded-xl shadow bg-white hover:shadow-lg transition"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold text-slate-800">{book.title}</h3>
              <p className="text-slate-600">Author: {book.author}</p>
              <p className="text-sm text-slate-500">Genre: {book.genre}</p>
              <p className="text-sm text-slate-500">Condition: {book.condition}</p>
              <p className="text-sm text-slate-700 font-medium mb-3">Price: ₹{book.price}</p>
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishListPage;


