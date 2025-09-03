import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ChatListPage = () => {
  const { token, user } = useAuth();
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const res = await axios.get('https://book-bazaar-mern-backend.onrender.com/api/messages/chat-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch chat users:', err.response?.data || err.message);
      }
    };

    fetchChatUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Your Conversations</h2>

      {chatUsers.length === 0 ? (
        <p className="text-gray-500">No chats found. Start a conversation!</p>
      ) : (
        <ul className="space-y-3">
          {chatUsers.map((userEmail) => (
            <li key={userEmail}>
              <Link
                to={`/chat/${encodeURIComponent(userEmail)}`}
                className="block px-4 py-2 border rounded hover:bg-blue-50"
              >
                💬 {userEmail}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatListPage;
