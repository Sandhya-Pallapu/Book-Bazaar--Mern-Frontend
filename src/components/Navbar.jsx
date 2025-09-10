import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaInbox, FaHeart, FaBars, FaTimes, FaUserCircle, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="bg-slate-800 text-white shadow-sm w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 h-16">
   
        <div className="text-2xl md:text-3xl font-bold tracking-wide">
          <Link to="/">Book Bazaar</Link>
        </div>


        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 hover:text-gray-500">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/post-book" className="flex items-center space-x-1 hover:text-gray-500">
            <FaBook /> <span>Post</span>
          </Link>
          <Link to="/inbox" className="flex items-center space-x-1 hover:text-gray-500">
            <FaInbox /> <span>Inbox</span>
          </Link>

    
          {user?.role !== "admin" && (
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-gray-500">
              <FaHeart /> <span>Wishlist</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="flex items-center space-x-1 hover:text-gray-500">
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          )}


          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-gray-200 text-black w-9 h-9 rounded-full flex items-center justify-center font-bold hover:bg-gray-300 transition"
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
          ) : (
            <Link to="/login" className="px-3 py-1 border border-black rounded hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          {user && (
            <button
              onClick={toggleDropdown}
              className="bg-gray-200 text-black w-9 h-9 rounded-full flex items-center justify-center font-bold hover:bg-gray-300 transition"
            >
              {firstLetter || <FaUserCircle />}
            </button>
          )}
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-4 flex flex-col space-y-4 border-t border-gray-200">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-500" onClick={toggleMenu}>
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/post-book" className="flex items-center space-x-2 hover:text-gray-500" onClick={toggleMenu}>
            <FaBook /> <span>Post</span>
          </Link>
          <Link to="/inbox" className="flex items-center space-x-2 hover:text-gray-500" onClick={toggleMenu}>
            <FaInbox /> <span>Inbox</span>
          </Link>

          {user?.role !== "admin" && (
            <Link to="/wishlist" className="flex items-center space-x-2 hover:text-gray-500" onClick={toggleMenu}>
              <FaHeart /> <span>Wishlist</span>
            </Link>
          )}

        
          {user?.role === "admin" && (
            <Link to="/admin" className="flex items-center space-x-2 hover:text-gray-500" onClick={toggleMenu}>
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          )}

          {user && (
            <>
              <Link to="/profile" className="hover:text-gray-500" onClick={toggleMenu}>
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-500 text-left">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



















