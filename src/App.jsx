// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Home from './components/home';
import Feedback from './components/feedback';
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
              <Link to="/register" className="link-button">Register</Link>
              <Link to="/login" className="link-button">Login</Link>
            </div>
          } />
          <Route path="/register" element={<Signup onSignupSuccess={handleBack} />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleBack} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feedback/*" element={<Feedback />} />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
