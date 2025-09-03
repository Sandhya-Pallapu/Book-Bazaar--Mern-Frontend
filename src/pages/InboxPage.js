import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InboxPage = () => {
  const { user } = useAuth();
  const [inbox, setInbox] = useState([]);
  const navigate = useNavigate();

  const fetchInbox = async () => {
    try {
      const res = await axios.get(`/api/messages/inbox/${user.email}`);
      console.log('Fetched Inbox:', res.data);
      setInbox(res.data);
    } catch (err) {
      console.error('Failed to load inbox:', err);
    }
  };

  const handleDeleteConversation = async (contactEmail) => {
    if (!window.confirm(`Delete conversation with ${contactEmail}?`)) return;
    try {
      await axios.delete(`/api/messages/conversation/${user.email}/${contactEmail}`);
      setInbox(inbox.filter(item => item.email !== contactEmail));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const openChat = (email, name) => {
    const safeName = name || email.split('@')[0]; // fallback if name is undefined
    navigate(`/chat/${email}/${encodeURIComponent(safeName)}`);
  };

  useEffect(() => {
    if (user?.email) fetchInbox();
  }, [user]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      {inbox.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-3">
          {inbox.map((item) => {
            const displayName = item.name || item.email.split('@')[0]; // fallback
            return (
              <li key={item.email} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                <div className="cursor-pointer w-full">
                  <p className="font-semibold">{displayName} ({item.email})</p>
                  <p className="text-gray-600 text-sm truncate">{item.lastMessage}</p>
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
