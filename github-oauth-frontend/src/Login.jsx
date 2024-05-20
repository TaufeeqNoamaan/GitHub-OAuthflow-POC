import React from 'react';
import styles from './styles/Login.module.css';

function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <button onClick={handleLogin} className={styles.loginButton}>Login with GitHub</button>
    </div>
  );
}

export default Login;
