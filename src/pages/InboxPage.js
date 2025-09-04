import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InboxPage = () => {
  const { user, token } = useAuth();
  const [inbox, setInbox] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_API_URL; // use env

  const fetchInbox = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/messages/inbox/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!Array.isArray(res.data)) {
        console.error('Inbox response is not an array:', res.data);
        setInbox([]);
        return;
      }

      setInbox(res.data);
    } catch (err) {
      console.error('Failed to load inbox:', err.response?.data || err.message);
      setInbox([]);
    }
  };

  const handleDeleteConversation = async (contactEmail) => {
    if (!window.confirm(`Delete conversation with ${contactEmail}?`)) return;
    try {
      await axios.delete(`${BACKEND_URL}/messages/conversation/${user.email}/${contactEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInbox(inbox.filter(item => item.email !== contactEmail));
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
    }
  };

  const openChat = (email, name) => {
    const safeName = name || email.split('@')[0]; // fallback
    navigate(`/chat/${email}/${encodeURIComponent(safeName)}`);
  };

  useEffect(() => {
    fetchInbox();
  }, [user]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      {inbox.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-3">
          {inbox.map((item) => {
            const displayName = item.name || item.email.split('@')[0];
            const lastMessage = item.lastMessage || 'No messages yet.';
            return (
              <li key={item.email} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                <div className="cursor-pointer w-full">
                  <p className="font-semibold">{displayName} ({item.email})</p>
                  <p className="text-gray-600 text-sm truncate">{lastMessage}</p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => openChat(item.email, displayName)}
                    className="text-blue-500 hover:underline"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleDeleteConversation(item.email)}
                    className="text-red-500 hover:underline"
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

