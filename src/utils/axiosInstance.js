
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://book-bazaar-mern-backend.onrender.com/',
  withCredentials: true, 
});

export default instance;
