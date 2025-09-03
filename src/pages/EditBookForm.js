import React from 'react';
import BookForm from '../components/BookForm';
import { useParams } from 'react-router-dom';

const EditBookForm = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm bookId={id} />
    </div>
  );
};

export default EditBookForm;
