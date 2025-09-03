
import React from 'react';
import { Link } from 'react-router-dom';
import HeartButton from './HeartButton'; 

const BookCard = ({ book }) => {
  return (
    <div className="relative border p-4 rounded shadow-md bg-white">
     
      <HeartButton book={book} />

      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-sm text-gray-700">Author: {book.author}</p>
      <p className="text-sm text-gray-700">Genre: {book.genre}</p>
      <p className="text-sm text-gray-700">Condition: {book.condition}</p>
      <p className="text-sm text-gray-700">Price: ₹{book.price}</p>

      <Link to={`/chat/${book.sellerEmail}/${book.sellerName}`}>
        <button className="bg-yellow-500 text-black px-3 py-1 rounded mt-2">
          Message Seller
        </button>
      </Link>
    </div>
  );
};
export default BookCard;