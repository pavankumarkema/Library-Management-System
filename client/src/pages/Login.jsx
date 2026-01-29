import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Login attempt:', { email, password, rememberMe });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <div className="signup-link">
          Don't have an account? <button onClick={handleRegister} className="register-link-btn">Sign up here</button>
        </div>
      </div>
    </div>
  );
};

export default Login;