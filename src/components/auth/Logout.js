import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
        // Handle sign-out error if needed
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h2>Logging out...</h2>
      {/* Optional: Display a message while the sign-out process is in progress */}
    </div>
  );
};

export default Logout;
