import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const { BrowserRouter } = require('react-router-dom');
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


