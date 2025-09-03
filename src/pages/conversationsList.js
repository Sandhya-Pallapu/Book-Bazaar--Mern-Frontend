import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ConversationsList = () => {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`https://book-bazaar-mern-backend.onrender.com/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };

    if (user?._id) {
      fetchConversations();
    }
  }, [user, token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => {
          const otherUserId = conv.members.find((id) => id !== user._id);
          return (
            <li key={conv._id}>
              <Link to={`/chat/${otherUserId}`} className="block p-3 bg-gray-100 rounded shadow">
                Chat with User ID: {otherUserId}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationsList;
