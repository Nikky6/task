import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; 

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8888/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to fetch profile');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8888/api/update', user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/logout'); 
  };

  return (
    <div className="form-container">
      <h2>Profile</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
