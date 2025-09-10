import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const genres = [
    'Fiction',
    'Competitive',
    'Science',
    'History',
    'Electrical Engineering',
  ];
  const conditions = ['New', 'Used'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-sky-10  p-6 rounded-2xl shadow-lg border border-gray-200 w-64">
      <h2 className="text-lg font-semibold mb-5 text-gray-800 border-b pb-2">
        Filter Books
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Genre
        </label>
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="w-full border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg p-2 text-sm"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>


      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Condition
        </label>
        <select
          name="condition"
          value={filters.condition}
          onChange={handleChange}
          className="w-full border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg p-2 text-sm"
        >
          <option value="">All</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-1/2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg p-2 text-sm"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-1/2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

