import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Home = () => {
  const navigate = useNavigate();

  // Click handlers
  const handleNewFeedbackClick = () => {
    navigate('/feedback/new');
  };

  const handleViewFeedbackClick = () => {
    navigate('/feedback');
  };

  return (
    <div className="dashboard">
      <div className="weather-update">
        <p>RATE US!</p>
        <p>HOW'S WAS YOUR EXPERIENCE?</p>

      </div>
      <div className="tiles">
        <div className="tile feedback" onClick={handleNewFeedbackClick}>
          <p>Leave Feedback</p>
        </div>
        <div className="tile feedback" onClick={handleViewFeedbackClick}>
          <p>View Feedback</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
