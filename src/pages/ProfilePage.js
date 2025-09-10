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
        const res = await axios.get("https://book-bazaar-mern-backend-updated.onrender.com/api/users/profile", {
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-slate-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-300 pb-2">
          My Listings
        </h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((book) => (
              <div
                key={book._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 italic">You haven't posted any books yet.</p>
        )}
      </div>

   
      <div>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-300 pb-2">
          My Wishlist
        </h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((book) => (
              <div
                key={book._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 italic">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;




