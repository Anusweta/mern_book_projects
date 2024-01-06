import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import AuthProvider from './contects/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Wrap your entire application in BrowserRouter */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);