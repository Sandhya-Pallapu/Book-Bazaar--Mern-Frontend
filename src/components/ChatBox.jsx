import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBox = ({ senderEmail, receiverEmail }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/messages/${senderEmail}/${receiverEmail}`
      );

      // Ensure messages is always an array
      const msgs = Array.isArray(res.data) ? res.data : [];
      setMessages(msgs);
    } catch (err) {
      console.error('Failed to fetch messages:', err.response || err.message);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (senderEmail && receiverEmail) fetchMessages();
  }, [senderEmail, receiverEmail]);

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/messages`, {
        senderEmail,
        receiverEmail,
        content,
      });
      setContent('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err.response || err.message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error('Failed to delete message:', err.response || err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded p-4 h-64 overflow-y-auto bg-white">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm">
                  <strong>{msg.senderEmail === senderEmail ? 'You' : msg.senderEmail}:</strong>{' '}
                  {msg.content}
                </p>
                <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
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

