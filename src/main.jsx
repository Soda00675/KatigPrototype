import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './axiosConfig'; // Import the Axios configuration

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
