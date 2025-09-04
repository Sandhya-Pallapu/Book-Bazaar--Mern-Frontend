import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ChatBox = ({ senderEmail, receiverEmail }) => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `https://book-bazaar-mern-backend.onrender.com/api/messages/${senderEmail}/${receiverEmail}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      toast.error('Failed to load messages.');
    }
  };

  useEffect(() => {
    if (senderEmail && receiverEmail) fetchMessages();
  }, [senderEmail, receiverEmail]);

  // Send message
  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      await axios.post(
        'https://book-bazaar-mern-backend.onrender.com/api/messages',
        { senderEmail, receiverEmail, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
      toast.error('Failed to send message.');
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(
        `https://book-bazaar-mern-backend.onrender.com/api/messages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success('Message deleted');
    } catch (err) {
      console.error('Failed to delete message:', err);
      toast.error('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded p-4 h-64 overflow-y-auto bg-white">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm">
                  <strong>{msg.senderEmail === senderEmail ? 'You' : msg.senderEmail}:</strong>{' '}
                  {msg.content}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              {msg.senderEmail === senderEmail && (
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;


