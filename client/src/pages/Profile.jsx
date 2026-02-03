import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account details and library info</p>
        </div>

        <div className="profile-card">
          <div className="profile-card-header">
            <div className="avatar">📚</div>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-role">{user?.role}</p>
          </div>

          <div className="profile-body">
            <div className="profile-info">
              <div className="info-group">
                <div className="info-label">Full Name</div>
                <div className="info-value">{user?.name}</div>
              </div>
              <div className="info-group">
                <div className="info-label">Email Address</div>
                <div className="info-value">{user?.email}</div>
              </div>
              <div className="info-group">
                <div className="info-label">Role</div>
                <div className="info-value">{user?.role}</div>
              </div>
              <div className="info-group">
                <div className="info-label">User ID</div>
                <div className="info-value">{user?.id}</div>
              </div>
            </div>

            <div className="divider" />

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Books Borrowed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1</div>
                <div className="stat-label">Pending Requests</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Total Reads</div>
              </div>
            </div>

            <div className="profile-actions">
              <Link className="action-btn primary-btn" to="/books">Browse Books</Link>
              <Link className="action-btn secondary-btn" to="/my-books">My Books</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
