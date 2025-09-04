import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      localStorage.removeItem('user');
      return null;
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser === 'undefined') {
      localStorage.removeItem('user');
    }
  }, []);

  const login = async (email, password) => {
    try {
      if (typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Email and password must be strings');
      }

      console.log('login() called with:', email, password);

     
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email: email.trim(), password: password.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = res.data;

      if (token) {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Login failed: token not received');
      }

      return { token, user }; // return data for immediate use
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



