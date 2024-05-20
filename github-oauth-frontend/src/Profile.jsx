import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/Profile.module.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(response => {
        console.log('Profile data:', response.data); // Log the response data
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.profileContainer}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {user ? (
        <div className={styles.profileInfo}>
          <p>ID: {user.id}</p>
          <p>Name: {user.displayName}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.profileUrl}</p> {/* Check if this property exists */}
        </div>
      ) : (
        <p>Unable to load profile data. Please try logging in again.</p>
      )}
    </div>
  );
}

export default Profile;
