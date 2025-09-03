import axios from 'axios';
export const sendMessage = async (data) => {
  return await axios.post('/api/messages', data);
};

export const getMessages = async (senderEmail, receiverEmail) => {
  return await axios.get(`/api/messages/${senderEmail}/${receiverEmail}`);
};
export const getInbox = async (email) => {
  return await axios.get(`/api/messages/inbox/${email}`);
};
