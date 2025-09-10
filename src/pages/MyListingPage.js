import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyListingsPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('https://book-bazaar-mern-backend-updated.onrender.com/api/books/user', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(res.data);
    };
    fetchBooks();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Book Listings</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ₹{book.price}</p>
            <Link to={`/edit-book/${book._id}`} className="text-blue-500 underline">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListingsPage;
