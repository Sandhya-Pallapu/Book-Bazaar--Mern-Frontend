import React, { useState } from 'react';

const BookModal = ({ onSubmit, onClose, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [genre, setGenre] = useState(initialData.genre || '');
  const [condition, setCondition] = useState(initialData.condition || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [image, setImage] = useState(initialData.image || '');

  const [sellerName, setSellerName] = useState(initialData.sellerName || '');
  const [sellerEmail, setSellerEmail] = useState(initialData.sellerEmail || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !genre || !condition || !price || !sellerName || !sellerEmail) {
      alert('Please fill all fields');
      return;
    }

    const bookData = {
      title,
      author,
      genre,
      condition,
      price,
      image,
      sellerName,
      sellerEmail,
    };

    onSubmit(bookData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{initialData._id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          className="w-full p-2 border rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Condition"
          className="w-full p-2 border rounded"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

       
        <input
          type="text"
          placeholder="Seller Name"
          className="w-full p-2 border rounded"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seller Email"
          className="w-full p-2 border rounded"
          value={sellerEmail}
          onChange={(e) => setSellerEmail(e.target.value)}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mx-auto"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {initialData._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookModal;
