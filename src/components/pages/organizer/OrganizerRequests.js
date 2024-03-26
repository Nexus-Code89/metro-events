import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import OrganizerNav from './OrganizerNav';

const OrganizerRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = collection(firestore, 'eventRequests');
        const querySnapshot = await getDocs(requestsRef);
        const requestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestsList);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };

    fetchRequests();
  }, []);

  const notifyUser = async (userId, eventId, status) => {
    const notificationCollectionRef = collection(firestore, 'notifications');

    let message = `Your request to join the ${eventId.name} has been ${status === 'success' ? 'accepted' : 'declined'}.`;

    const newNotification = {
      message: message,
      timestamp: new Date(),
      userId: userId,
    }

    try {
      const docRef = await addDoc(notificationCollectionRef, newNotification);
      console.log('Notification added with ID:', docRef.id);
    } catch(e) {
      console.error('Error adding notification:', e.message)
    }
  }

  const handleAcceptRequest = async (requestId, eventId, userId) => {
    try {
      const requestDocRef = doc(firestore, 'eventRequests', requestId);
      await updateDoc(requestDocRef, { status: 'Accepted' });

      // Add user to the attendees list of the event
      const eventDocRef = doc(firestore, 'events', eventId);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        await updateDoc(eventDocRef, { attendees: [...eventData.attendees, userId] });
      }

      console.log('Request accepted successfully.');

      notifyUser(userId, eventId, 'success');
 
    } catch (error) {
      console.error('Error accepting request:', error.message);
    }
  };

  const handleDeclineRequest = async (requestId, userId, eventId) => {
    try {
      const requestDocRef = doc(firestore, 'eventRequests', requestId);
      await updateDoc(requestDocRef, { status: 'Declined' });
      console.log('Request declined successfully.');

      notifyUser(userId, eventId, 'failed')
    
    } catch (error) {
      console.error('Error declining request:', error.message);
    }
  };

  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Requests</h2>
        <OrganizerNav />
      </div>
      <div>
        <h3>Event Requests:</h3>
        <ul>
          {requests.map(request => (
            <li key={request.id}>
              <strong>Event ID:</strong> {request.eventId} <br />
              <strong>Event Name:</strong> {request.eventName} <br />
              <strong>Event Date:</strong> {request.eventDate} <br />
              <strong>Event Location:</strong> {request.eventLocation} <br />
              <strong>Organizer ID:</strong> {request.organizerId} <br />
              <strong>Organizer Email:</strong> {request.organizerEmail} <br />
              <strong>User ID:</strong> {request.userId} <br />
              <strong>Message:</strong> {request.message} <br />
              <strong>Status:</strong> {request.status} <br />
              {request.status === 'Pending' && (
                <>
                  <button onClick={() => handleAcceptRequest(request.id, request.eventId, request.userId)}>Accept</button>
                  <button onClick={() => handleDeclineRequest(request.id, request.eventId, request.userId)}>Decline</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrganizerRequests;
