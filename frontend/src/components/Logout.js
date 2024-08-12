import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; 

const Logout = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); 
  };

  return (
    <div className="form-container">
      <h2>You have been logged out</h2>
      <button onClick={handleHome}>Home</button> {/* Home button */}
    </div>
  );
};

export default Logout;
