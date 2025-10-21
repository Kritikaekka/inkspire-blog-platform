import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleStartWritingClick = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">
        Welcome to my Blog Platform
      </h1>

      <div className="homepage-right" onClick={handleStartWritingClick}>
        <img
          src="/write.png"
          alt="Hand with pen"
          className="homepage-image"
        />
        <span className="homepage-start-btn">
          Start Writing
        </span>
      </div>
    </div>
  );
}
export default HomePage;
