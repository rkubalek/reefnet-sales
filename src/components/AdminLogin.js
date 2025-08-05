import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check (in production, this would be server-side)
    if (password === 'reefnet2024') {
      // Store admin session
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      onLogin(true);
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h2>🔐 Admin Access</h2>
          <p>Enter password to access wholesale pricing and catch tracking</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Checking...' : 'Login'}
          </button>
        </form>
        
        <div className="login-note">
          <p><strong>Note:</strong> This area contains sensitive business information.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 