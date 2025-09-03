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
        const res = await axios.get('https://book-bazaar-mern-backend.onrender.com/api/wishlist', {
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
      await axios.delete(`https://book-bazaar-mern-backend.onrender.com/api/wishlist/remove/${bookId}`, {
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistBooks.length === 0 ? (
        <p>No books in wishlist</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistBooks.filter(Boolean).map((book) => (
            <li key={book._id} className="border p-4 rounded shadow bg-white">
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-sm text-gray-500">Genre: {book.genre}</p>
              <p className="text-sm text-gray-500">Condition: {book.condition}</p>
              <p className="text-sm text-gray-500 mb-2">Price: ₹{book.price}</p>
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
