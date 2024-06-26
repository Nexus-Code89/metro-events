import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, signIn } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Logging in...')
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signIn(auth, email, password);
      const user = userCredential.user;

      console.log('User signed in:', user);
      // Get user data from Firestore
      const docRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(docRef);
      const userData = userDoc.data();
      userData.userId = user.uid;
      
      if (userData) {

        setUser(userData)

        // Redirect based on user role
        switch (userData.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'organizer':
            navigate('/organizer-dashboard');
            break;
          default:
            console.log(user)
            navigate('/user-dashboard');
            break;
        }
      } else {
        console.error('Error signing in:', error.message);
        setError('Account Does Not Exist');
        // Display error message using toast notification
        toast.error('Account Does Not Exist', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Incorrect Email/Password');
      // Display error message using toast notification
      toast.error('Incorrect Email/Password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
