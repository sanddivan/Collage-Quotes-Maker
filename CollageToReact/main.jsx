import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importing your logic
import './index.css';       // Global styles (reset, etc.)

// This finds the <div id="root"> from your index.html
const rootElement = document.getElementById('root');

// This "activates" React inside that div
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);