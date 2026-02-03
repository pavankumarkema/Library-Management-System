import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h2 className="page-title">My Profile</h2>
      <div className="card" style={{ maxWidth: '600px' }}>
        <h3>User Information</h3>
        <div style={{ marginBottom: '12px' }}>
          <p><strong>Name:</strong> {user?.name}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p><strong>Role:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{user?.role}</span></p>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p><strong>Member ID:</strong> {user?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
