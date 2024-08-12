import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Bussiness Optima</h1>
      <p>Please choose an option to proceed:</p>
      <div className="button-container">
        <button onClick={() => navigate('/register')} className="home-button">
          Register
        </button>
        <button onClick={() => navigate('/login')} className="home-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
