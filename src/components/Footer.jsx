import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        
        
        <div className="flex flex-col space-y-1">
          <Link to="/" className="text-xl font-bold text-white hover:text-gray-200">
            Book Bazaar
          </Link>
          <p className="text-xs text-gray-400 max-w-xs">
            Book Bazaar – Your friendly peer-to-peer book exchange platform. Buy, sell, and share knowledge with ease.
          </p>
        </div>


        <div className="flex flex-col space-y-1 text-sm">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/post-book" className="hover:text-white transition">Post a Book</Link>
          <Link to="/inbox" className="hover:text-white transition">Inbox</Link>
          <Link to="/wishlist" className="hover:text-white transition">Wishlist</Link>
          <Link to="/admin" className="hover:text-white transition">Admin</Link>
        </div>

 
        <div className="flex space-x-3 mt-2 md:mt-0 text-sm">
          <a href="#" className="hover:text-white transition"><FaFacebookF size={14} /></a>
          <a href="#" className="hover:text-white transition"><FaTwitter size={14} /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram size={14} /></a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-4 border-t border-gray-700 pt-2 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Book Bazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


