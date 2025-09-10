
import React, { createContext, useContext } from 'react';
import socket from '../utils/socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
