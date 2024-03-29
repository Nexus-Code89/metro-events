import { addDoc, collection } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { firestore } from '../../../firebase/firebase';
import { UserContext } from '../../contexts/UserContext';

const EventRequestForm = ({ eventId, organizerId, organizerEmail, eventName, eventDate, eventLocation }) => {
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user.userId;

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

      console.log('userId')
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
          cols="50"
          rows="6"
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
