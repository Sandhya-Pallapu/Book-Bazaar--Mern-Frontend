import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const ProfilePage = () => {
  const [listings, setListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://book-bazaar-mern-backend.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setListings(res.data.listings || []);
        setWishlist(res.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="p-6">
     
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">My Listings</h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't posted any books yet.</p>
        )}
      </div>

    
      <div>
        <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;



