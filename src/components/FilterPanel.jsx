import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const genres = ['Fiction', 'Competitive', 'Science', 'History', ' Electrical Enginnering'];
  const conditions = ['New', 'Used'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter By</h2>

      {/* Genre */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Genre</label>
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block font-medium mb-1">Condition</label>
        <select
          name="condition"
          value={filters.condition}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">All</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-1/2 border rounded p-2"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-1/2 border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
