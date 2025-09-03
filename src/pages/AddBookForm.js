import React from 'react';
import BookForm from '../components/BookForm';

const AddBookForm = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post New Book</h1>
      <BookForm />
    </div>
  );
};

export default AddBookForm;
