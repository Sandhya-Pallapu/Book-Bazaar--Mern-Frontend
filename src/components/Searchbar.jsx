import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search by book title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-xl px-4 py-2 border rounded shadow"
      />
    </div>
  );
};

export default SearchBar;





