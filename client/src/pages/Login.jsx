import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const { login, authError, demoCredentials } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login({ email, password, rememberMe });
    if (result.error) {
      setFormError(result.error);
      return;
    }

    navigate('/', { replace: true });
  };

  const handleUseDemo = () => {
    setEmail(demoCredentials.member.email);
    setPassword(demoCredentials.member.password);
  };

  const handleUseAdminDemo = () => {
    setEmail(demoCredentials.admin.email);
    setPassword(demoCredentials.admin.password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {(formError || authError) && (
            <div className="error-message">{formError || authError}</div>
          )}
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
            <span className="forgot-link">Demo mode only</span>
          </div>

          <button type="submit" className="login-btn">Sign In</button>

          <div className="demo-buttons">
            <button type="button" className="demo-btn" onClick={handleUseDemo}>
              Use Demo Login
            </button>
            <button type="button" className="demo-btn" onClick={handleUseAdminDemo}>
              Use Admin Demo
            </button>
          </div>
        </form>

        <div className="register-link">
          Don&apos;t have an account? <Link to="/register">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;