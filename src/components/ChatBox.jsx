import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBox = ({ senderEmail, receiverEmail }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  const fetchMessages = async () => {
    const res = await axios.get(`/api/messages/${senderEmail}/${receiverEmail}`);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [senderEmail, receiverEmail]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    await axios.post('/api/messages', { senderEmail, receiverEmail, content });
    setContent('');
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    await axios.delete(`/api/messages/${id}`);
    fetchMessages();
  };

  return (
    <div className="space-y-4">
      <div className="border rounded p-4 h-64 overflow-y-auto bg-white">
        {messages.map((msg) => (
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
        ))}
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
