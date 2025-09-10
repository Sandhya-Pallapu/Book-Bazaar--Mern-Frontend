
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full md:w-4/6 border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-slate-500 transition">
        <input
          type="text"
          placeholder=" Search books, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 focus:outline-none bg-white"
        />
        <button className="bg-slate-400 px-5 text-white font-medium hover:bg-slate-700 transition flex items-center gap-2">
          <FaSearch />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;





