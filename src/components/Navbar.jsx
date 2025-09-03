import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import SearchBar from './Searchbar';  

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="bg-yellow-400 text-black h-16 shadow-md flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">

        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Book Bazaar" 
            className="h-20 w-auto object-contain"
          />
        </Link>

        

        <div className="flex items-center space-x-6 relative text-sm md:text-base font-medium">
          <Link to="/" className="hover:text-gray-700 transition">Home</Link>

          {user && user.role !== 'admin' && (
            <Link to="/post-book" className="hover:text-gray-700 transition">Post</Link>
          )}

          {user && user.role !== 'admin' && (
            <Link to="/wishlist" className="hover:text-gray-700 flex items-center space-x-1 transition">
              <FaHeart className="text-red-500" />
              <span>Wishlist</span>
            </Link>
          )}

          {user && (
            <Link to="/inbox" className="hover:text-gray-700 transition">Inbox</Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className="font-semibold hover:text-gray-700 transition">
              Admin Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-700 transition">Login</Link>
              <Link to="/register" className="hover:text-gray-700 transition">Register</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-white text-red-600 w-9 h-9 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 shadow-sm"
              >
                {firstLetter || <FaUserCircle />}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

