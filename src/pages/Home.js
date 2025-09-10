import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/Searchbar";
import FilterPanel from "../components/FilterPanel";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
      const booksArray = Array.isArray(res.data)
        ? res.data
        : res.data.books || [];
      setBooks(booksArray);
      setFilteredBooks(booksArray);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setFilteredBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let updatedBooks = [...books];

    if (searchQuery.trim()) {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.genre) {
      updatedBooks = updatedBooks.filter((book) => book.genre === filters.genre);
    }

    if (filters.condition) {
      updatedBooks = updatedBooks.filter(
        (book) => book.condition === filters.condition
      );
    }

    if (filters.minPrice) {
      updatedBooks = updatedBooks.filter(
        (book) => book.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      updatedBooks = updatedBooks.filter(
        (book) => book.price <= parseFloat(filters.maxPrice)
      );
    }

    setFilteredBooks(updatedBooks);
  }, [searchQuery, filters, books]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
  <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">


 

      <div className="flex flex-col md:flex-row gap-6">
        

        <div className="w-full md:w-1/4">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

      
        <div className="flex-1">
          <div className="mb-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-full text-center text-gray-600">
                Loading books...
              </p>
            ) : Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No books found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



