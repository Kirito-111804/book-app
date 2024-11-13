// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this to react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Use createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> {/* Wrapping App with BrowserRouter */}
    <App />
  </BrowserRouter>
);
