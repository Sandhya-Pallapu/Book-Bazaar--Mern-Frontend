import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatInbox = ({ userEmail, setActiveChat }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.get(`/api/messages/inbox/${userEmail}`);
        setContacts(res.data);
      } catch (err) {
        console.error('Inbox fetch failed:', err);
      }
    };

    fetchInbox();
  }, [userEmail]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Inbox</h2>
      <ul>
        {contacts.map((contact, idx) => (
          <li
            key={idx}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => setActiveChat(contact.email)}
          >
            {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatInbox;