import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ChatBox = ({ senderEmail, receiverEmail }) => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `https://book-bazaar-mern-backend-updated.onrender.com/api/messages/${senderEmail}/${receiverEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err.response?.data || err.message);
      toast.error("Failed to load messages.");
    }
  };

  useEffect(() => {
    if (senderEmail && receiverEmail) fetchMessages();
  }, [senderEmail, receiverEmail]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    try {
      await axios.post(
        "https://book-bazaar-mern-backend-updated.onrender.com/api/messages",
        { senderEmail, receiverEmail, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err.response?.data || err.message);
      toast.error("Failed to send message.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await axios.delete(`https://book-bazaar-mern-backend-updated.onrender.com/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success(res.data.message || "Message deleted successfully!");
    } catch (err) {
      console.error("Failed to delete message:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to delete message.");
    }
  };

  const deleteConversation = async () => {
    try {
      const res = await axios.delete(
        `https://book-bazaar-mern-backend-updated.onrender.com/api/messages/conversation/${senderEmail}/${receiverEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([]);
      toast.success(res.data.message || "Conversation deleted successfully!");
    } catch (err) {
      console.error("Failed to delete conversation:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to delete conversation.");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-gray-50 shadow-md rounded-xl overflow-hidden">
     
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No messages yet 💬</p>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderEmail === senderEmail;
            return (
              <div
                key={msg._id}
                className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl shadow 
                    ${isSender ? "bg-blue-500 text-white" : "bg-white text-gray-800"}
                  `}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[11px] mt-1 text-gray-300">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {isSender && (
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-[11px] text-red-300 hover:text-red-500 mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className="p-3 bg-white border-t flex items-center gap-2">
        <input
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      <div className="p-2 bg-gray-50 border-t text-center">
        <button
          onClick={deleteConversation}
          className="text-red-600 text-sm hover:underline"
        >
          🗑 Delete Conversation
        </button>
      </div>
    </div>
  );
};

export default ChatBox;




