
const [editingBook, setEditingBook] = useState(null);
const [showForm, setShowForm] = useState(false);

const handleEditBook = (book) => {
  setEditingBook(book);
  setShowForm(true);
};

const handleCloseForm = () => {
  setEditingBook(null);
  setShowForm(false);
};
