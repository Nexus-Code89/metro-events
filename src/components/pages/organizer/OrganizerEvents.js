import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== reenteredPassword) {
        setError('Passwords do not match.');
        return; // Exit early if passwords don't match
      }

      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        username: username,
        email: email,
        role: 'user', // Set default role as 'user'
      });

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.message); // Set error message based on Firebase error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          value={reenteredPassword}
          onChange={(e) => setReenteredPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
