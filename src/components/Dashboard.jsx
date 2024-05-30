// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Click handlers
  const handleBookingClick = () => {
    navigate('/booking'); 
  };

  const handleTrackingClick = () => {
    navigate('/tracking'); 
  };

  const handleSafetyClick = () => {
    navigate('/safety'); 
  };

  const handleFeedbackClick = () => {
    navigate('/home'); 
  };

  const handleRestaurantClick = (island) => {
    navigate(`/restaurants/${island}`); 
  };

return (
  <div className="dashboard">
    <div className="weather-update">
        <p>MONDAY</p>
        <p>Partly Cloudy</p>
        <p>21°C</p>
      </div>
    <div className="tiles">
      <div className="tile booking" onClick={handleBookingClick}>
        <p>Booking & Scheduling</p>
        <p>Book your trip</p>
      </div>
      <div className="tile tracking" onClick={handleTrackingClick}>
        <p>Real-Time Tracking</p>
        <p>Navigate your Trip status</p>
      </div>
      <div className="tile safety" onClick={handleSafetyClick}>
        <p>Emergency & Safety Measures</p>
        <p>Safety Aboard</p>
      </div>
      <div className="tile feedback" onClick={handleFeedbackClick}>
        <p>Feedback & Ratings</p>
      </div>
    </div>
  </div>
);

};

export default Dashboard;
