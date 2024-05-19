// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard'; // Make sure to create this component
import './App.css';

function App() {
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterPage(true);
    setIsLoginPage(false);
  };

  const handleLoginClick = () => {
    setIsRegisterPage(false);
    setIsLoginPage(true);
  };

  const handleBack = () => {
    setIsRegisterPage(false);
    setIsLoginPage(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={
            <div className="landing-page">
              <h1 className="title">Welcome!</h1>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          } />
          <Route path="/register" element={<Signup onSignupSuccess={handleBack} />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleBack} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
