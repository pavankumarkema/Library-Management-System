import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleBooks = () => {
    navigate('/books');
  };

  const handleMyBooks = () => {
    navigate('/my-books');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleIssue = () => {
    navigate('/issue');
  };

  return (
    <div className="dashboard">
      {/* Removed duplicate dashboard header - using main Navbar component */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">LibraTech</span></h1>
          <p>Your gateway to endless knowledge and literary adventures</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleBooks}>Explore Books</button>
            <button className="btn-secondary" onClick={isAuthenticated ? handleMyBooks : handleRegister}>
              {isAuthenticated ? 'My Books' : 'Get Started'}
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-books">
            <div className="book book-1"></div>
            <div className="book book-2"></div>
            <div className="book book-3"></div>
          </div>
        </div>
      </section>

   
      <section className="stats">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Books Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5,000+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50,000+</div>
          <div className="stat-label">Books Issued</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Access</div>
        </div>
      </section>

  
      <section className="features">
        <h2>Why Choose LibraTech?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Extensive Collection</h3>
            <p>Access thousands of books across all genres and subjects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Access</h3>
            <p>Borrow and return books with just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Manage your library anywhere, anytime</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find books quickly with our advanced search features</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your reading history and due dates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notifications</h3>
            <p>Get reminders for due dates and new arrivals</p>
          </div>
        </div>
      </section>


      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={isAuthenticated ? handleMyBooks : handleLogin}>
            {isAuthenticated ? 'My Books' : 'Login to View Books'}
          </button>
          <button className="action-btn" onClick={isAuthenticated ? handleIssue : handleLogin}>
            {isAuthenticated ? 'Issue a Book' : 'Login to Issue'}
          </button>
          <button className="action-btn" onClick={handleBooks}>Browse Books</button>
          <button className="action-btn" onClick={isAuthenticated ? handleProfile : handleRegister}>
            {isAuthenticated ? 'My Profile' : 'Create Account'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;