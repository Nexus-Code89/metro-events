import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'adminRequests'));
      const requestList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const pendingRequests = requestList.filter(request => request.status === 'pending');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error.message);
    }
  };
  

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleConfirm = async (requestId, userId) => {
    try {
      // Update the status of the request to 'confirmed'
      await updateDoc(doc(firestore, 'adminRequests', requestId), {
        status: 'confirmed',
      });

      // Update the user's role to 'organizer'
      await updateDoc(doc(firestore, 'users', userId), {
        role: 'organizer',
      });

      // Refresh the requests list after updating
      fetchRequests();
    } catch (error) {
      console.error('Error confirming request:', error.message);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await updateDoc(doc(firestore, 'adminRequests', requestId), {
        status: 'declined', // Update status to declined for the request
      });
      // Refresh the requests list after updating
      fetchRequests();
    } catch (error) {
      console.error('Error declining request:', error.message);
    }
  };

  return (
    <section>
      <div className="menu-header">
        <h2>Admin Requests</h2>
        <nav>
          <ul>
            <li><Link to="/admin-dashboard">Home</Link></li>
            <li><Link to="/admin-manage-accounts">Accounts</Link></li>
            <li><Link to="/admin-manage-events">Events</Link></li>
            <li><Link to="/admin-manage-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      <div>
        <h3>All Requests:</h3>
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <strong>User ID:</strong> {request.userId} <br />
              <strong>Name:</strong> {request.name} <br />
              <strong>Email:</strong> {request.email} <br />
              <strong>Reason:</strong> {request.reason} <br />
              <strong>Status:</strong> {request.status} <br />
              {/* Confirm and Decline buttons */}
              {request.status === 'pending' && (
                <>
                  <button onClick={() => handleConfirm(request.id, request.userId)}>Confirm</button>
                  <button onClick={() => handleDecline(request.id)}>Decline</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdminRequests;
