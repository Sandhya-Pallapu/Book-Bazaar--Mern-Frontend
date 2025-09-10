
import React from 'react';
import HeartButton from './HeartButton';
import { FaCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="relative border border-gray-200 rounded-lg bg-white p-3 flex flex-col justify-between hover:shadow-md transition-all duration-200">

     
      <img
        src={book.image || "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-32 md:h-36 object-cover mb-3 rounded-md"
      />

     
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-md md:text-lg font-semibold text-gray-800 mb-0.5 truncate">{book.title}</h2>
        <p className="text-sm text-gray-600 truncate">Author: {book.author}</p>
        <p className="text-sm text-gray-600 truncate">Genre: {book.genre}</p>
        <p className="text-sm text-gray-600 truncate">Condition: {book.condition}</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">₹{book.price}</p>
      </div>

      <div className="flex justify-between items-center mt-3">
       
        <div className="flex-shrink-0">
          <HeartButton book={book} />
        </div>

        <div className="flex-shrink-0">
          <Link to={`/chat/${book.sellerEmail}/${book.sellerName}`}>
            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
              <FaCommentDots />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;





