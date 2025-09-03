import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWishlist(res.data);
    } catch (err) {
      toast.error("Failed to fetch wishlist");
      console.error("Fetch wishlist error:", err);
    }
  };

  const addToWishlist = async (bookId) => {
    try {
      const res = await axios.post(
        "/api/wishlist",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setWishlist((prev) => [...prev, res.data]);
      toast.success("Book added to wishlist");
    } catch (err) {
      toast.error("Failed to add to wishlist");
      console.error("Add to wishlist error:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWishlist((prev) => prev.filter((book) => book._id !== id));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove from wishlist");
      console.error("Remove from wishlist error:", err);
    }
  };

  return (
    <WishListContext.Provider
      value={{ wishlist, fetchWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
