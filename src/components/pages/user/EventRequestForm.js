import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';

const EventRequestForm = ({ eventId, organizerId, organizerEmail, eventName, eventDate, eventLocation }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      // Add request to eventRequests collection
      await addDoc(collection(firestore, 'eventRequests'), {
        eventId,
        organizerId,
        organizerEmail,
        userId,
        message,
        status: 'Pending', // Initial status of the request
        eventName,
        eventDate,
        eventLocation,
      });

      setMessage('Request sent successfully!');
    } catch (error) {
      console.error('Error sending request:', error.message);
      setMessage('Error sending request. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default EventRequestForm;
