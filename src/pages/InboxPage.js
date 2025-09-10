import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const InboxPage = () => {
  const { user, token } = useAuth();
  const [inbox, setInbox] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_API_URL;

  const fetchInbox = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${BACKEND_URL}/messages/inbox/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInbox(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load inbox:", err.response?.data || err.message);
      setInbox([]);
    }
  };

  const handleDeleteConversation = async (contactEmail) => {
    if (!window.confirm(`Delete conversation with ${contactEmail}?`)) return;
    try {
      await axios.delete(
        `${BACKEND_URL}/messages/conversation/${user.email}/${contactEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInbox(inbox.filter((item) => item.email !== contactEmail));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const openChat = (email, name) => {
    const safeName = name || email.split("@")[0];
    navigate(`/chat/${email}/${encodeURIComponent(safeName)}`);
  };

  useEffect(() => {
    fetchInbox();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📩 Inbox</h2>

      {inbox.length === 0 ? (
        <div className="bg-gray-100 rounded-xl p-8 text-center shadow">
          <p className="text-lg text-gray-600">No conversations yet 📭</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {inbox.map((item) => {
            const displayName = item.name || item.email.split("@")[0];
            const lastMessage = item.lastMessage || "No messages yet.";
            return (
              <li
                key={item.email}
                className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 flex justify-between items-center"
              >

                <div
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => openChat(item.email, displayName)}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold text-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {displayName}
                    </p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                    <p className="text-gray-600 text-sm truncate mt-1">
                      {lastMessage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => openChat(item.email, displayName)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleDeleteConversation(item.email)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default InboxPage;
