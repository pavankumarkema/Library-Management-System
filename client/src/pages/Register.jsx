import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const { register, authError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register({ name, email, password });
    if (result.error) {
      setFormError(result.error);
      return;
    }
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join LibraTech and start your reading journey</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {(formError || authError) && (
            <div className="form-error">{formError || authError}</div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="register-btn">Create Account</button>
        </form>

        <div className="login-link">
          Already have an account? <button onClick={handleLogin} className="login-link-btn">Sign in here</button>
        </div>
      </div>
    </div>
  );
};

export default Register;