import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';


const HeartButton = ({ book }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleWishlist = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
      "https://book-bazaar-mern-backend.onrender.com//wishlist/add",
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Book added to wishlist!');
      setAdded(true);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info('Book is already in your wishlist.');
        setAdded(true);
      } else if (err.response?.status === 401) {
        toast.error('Unauthorized. Please login again.');
        navigate('/login');
      } else {
        toast.error('Failed to add to wishlist.');
        console.error('Error:', err);
      }
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className="absolute top-2 right-2 text-xl transition-transform hover:scale-110"
    >
      {added ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-red-500" />}
    </button>
  );
};

export default HeartButton;
