import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, signIn } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signIn(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const docRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(docRef);
      const userData = userDoc.data();

      // Redirect based on user role
      switch (userData.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'organizer':
          navigate('/organizer-dashboard');
          break;
        default:
          navigate('/user-dashboard');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Metro Events</h2> {/* App name added */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Not registered? <Link to="/register">Register here</Link></p>
      <p className="footer">© 2024 Metro Events. All rights reserved.</p> {/* Footer with app name */}
    </div>
  );
};

export default Login;
