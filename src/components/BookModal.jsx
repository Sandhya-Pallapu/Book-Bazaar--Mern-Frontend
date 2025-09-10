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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative max-h-[90vh] flex flex-col">

        <div className="flex justify-between items-center border-b px-4 py-3 sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-lg font-semibold text-slate-800">
            {initialData._id ? '✏️ Edit Book' : '➕ Add Book'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✖
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-auto px-6 py-4 space-y-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Genre"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Condition"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Seller Name"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Seller Email"
              className="w-full border border-slate-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
            />

            {image && (
              <div className="flex justify-center">
                <img
                  src={image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md shadow transition"
              >
                {initialData._id ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;


