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
  const BACKEND_URL = process.env.REACT_APP_API_URL;

  const handleWishlist = async () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (!book || !book._id) {
      toast.error("Book data is invalid.");
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/wishlist/add`,
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
      className="text-xl transition-transform hover:scale-110"
    >
      {added ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-red-500" />}
    </button>
  );
};

export default HeartButton;


