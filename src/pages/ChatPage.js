import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { sellerEmail, sellerName } = useParams();
  const { user } = useAuth();

  if (!user) return <p>Please login to chat.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Chat with {sellerName || sellerEmail}</h2>

      <ChatBox senderEmail={user.email} receiverEmail={sellerEmail} />
    </div>
  );
};

export default ChatPage;
