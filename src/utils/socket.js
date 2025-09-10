import { io } from 'socket.io-client';

const socket = io('https://book-bazaar-mern-backend-updated.onrender.com', {
  withCredentials: true,
});

export default socket;
