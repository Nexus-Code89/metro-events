import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';
// Organizer Access Request
const UserRequests = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [userRequests, setUserRequests] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);
  const [editMode, setEditMode] = useState(false);

  
  const fetchUserRequests = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const requestsQuery = query(collection(firestore, 'adminRequests'), where('userId', '==', userId));
          const querySnapshot = await getDocs(requestsQuery);
          const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserRequests(requests);

          // Check if user has pending/declined request
          const hasPendingOrDeclinedRequest = requests.some(request => ['pending', 'declined'].includes(request.status));
          setDisplayForm(!hasPendingOrDeclinedRequest);
        }
      } catch (error) {
        console.error('Error fetching user requests:', error.message);
      }
  };
  
  useEffect(() => {
      fetchUserRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        if (editMode) {
          // If in edit mode, update the existing request
          const requestDoc = doc(firestore, 'adminRequests', userRequests[0].id); // Assuming only one request is displayed at a time
          await updateDoc(requestDoc, {
            name,
            email,
            reason,
            status: 'pending', 
          });
          console.log('Request updated successfully');
        } else {
          // If not in edit mode, submit a new request
          await addDoc(collection(firestore, 'adminRequests'), {
            userId,
            name,
            email,
            reason,
            status: 'pending',
          });
          console.log('Request submitted successfully');
          setName('');
          setEmail('');
          setReason('');
        }
          setDisplayForm(false);
          fetchUserRequests();
      }
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };


  const handleResubmit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && userRequests.length > 0) { 
        const declinedRequest = userRequests.find(request => request.status === 'declined'); 
        if (declinedRequest) { // show previous state of request
          setName(declinedRequest.name);
          setEmail(declinedRequest.email);
          setReason(declinedRequest.reason);
          setEditMode(true);
          setDisplayForm(true);
        } else {
          console.error('No declined request found');
        }
      }
    } catch (error) {
      console.error('Error resubmitting request:', error.message);
    }
  };

  return (
    <section>
      <div className="menu-header">
        <h2>User Requests</h2>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Home</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
            <li><Link to="/user-events">Events</Link></li>
            <li><Link to="/user-requests">Requests</Link></li>
            <li><Link to="/user-notifications">Notifications</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      {displayForm ? ( // displayed when has no existing request
        <div>
          <h2>User Requests</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Reason for the request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button type="submit">Submit Request</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>User Already Submitted a Request</h2>
          <h3>Organizer Access Request</h3>
          <ul>
            {userRequests.map((request) => ( // displayed when request is pending
              <li key={request.id}>
                <strong>Reason:</strong> {request.reason} <br />
                <strong>Status:</strong> {request.status} <br />
              </li>
            ))}
          </ul>
          {userRequests[0].status === 'declined' && ( // displayed when request is declined
            <button onClick={handleResubmit}>Edit and Resubmit Request</button>
          )}
        </div>
      )}
    </section>
  );
};

export default UserRequests;
