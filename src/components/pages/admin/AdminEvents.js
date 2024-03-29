import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebase/firebase';
import AdminNav from './AdminNav';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [deletionReason, setDeletionReason] = useState('');

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(firestore, 'events');
      const querySnapshot = await getDocs(eventsRef);
      const eventsList = querySnapshot.docs.map((doc) => {
        const eventData = doc.data();
        const numberOfUpvotes = eventData.upvotes.length - eventData.downvotes.length;
        return ({ id: doc.id, ...eventData, numberOfUpvotes})
      });
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const notifyUser = async () => {

    console.log('Notifying User')

    const event = events.find((e) => selectedEventId === e.id);
    const message = `The ${event.eventName} event was cancelled ${deletionReason !== '' ? 'due to ' + deletionReason : ''}`;
    const newNotification = {
      message: message,
      timestamp: new Date(),
      read: false,
      userId: event.organizerId,
    };
    let newNotifications = [newNotification];

    event.attendees.map((attendee) => {
      const newNotification = {
        message: message,
        timestamp: new Date(),
        read: false,
        userId: attendee,
      };
      newNotifications.push(newNotification);
    })

    console.log('Adding Notifications')

    try {
      const notificationCollectionRef = collection(firestore, 'notifications');
      newNotifications.map( async (newNotification) => {
        const docRef = await addDoc(notificationCollectionRef, newNotification);
        console.log('Notification added with ID:', docRef.id);
      })
    } catch(e) {
      console.error('Error adding notification:', e.message)
    }
  }

  const deleteEvent = async (id) => {
    try {
      const eventDoc = doc(firestore, 'events', id);
      await deleteDoc(eventDoc);
      console.log('Successfully deleted event:', id, (deletionReason !== '' ? 'due to ' + deletionReason : ''));
      fetchEvents();
      notifyUser();
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
    setIsDeletePopupOpen(false);
    setSelectedEventId(null);
    setDeletionReason('');
  };

  const handleDeleteButtonClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEventId) {
      deleteEvent(selectedEventId);
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setSelectedEventId(null);
    setDeletionReason('');
  };

  return (
    <>
    {isDeletePopupOpen && (
      <div
      className="delete-confirmation-popup" 
      style={{
        position: 'fixed',
        width: '30%',
        height: '35%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: '#E2E2E2'
      }}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to cancel "{selectedEventId && events.find((e) => e.id === selectedEventId)?.eventName}"?</p>
        <textarea
          cols="50"
          rows="6"
          value={deletionReason}
          onChange={(e) => setDeletionReason(e.target.value)}
          placeholder="Please provide a reason for deletion (optional)"
        />
        <div className="popup-buttons">
          <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </div>
    )}

    <section>
      <div className="menu-header">
        <h2>Admin Events</h2>
        <AdminNav />
      </div>
      <div>
        <h3>All Events:</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>Event Name:</strong> {event.eventName} <br />
              <strong>Upvotes: </strong> {event.numberOfUpvotes} <br />
              <strong>Date:</strong> {event.eventDate} <br />
              <strong>Location:</strong> {event.eventLocation} <br />
              <strong>Start Time:</strong> {event.startTime} <br />
              <strong>End Time:</strong> {event.endTime} <br />
              <strong>Description:</strong> {event.eventDescription} <br />
              <strong>Organizer:</strong> {event.eventEmail} <br />
              <button onClick={() => handleDeleteButtonClick(event.id)}>
                X Cancel Event
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Your dashboard content goes here */}
    </section>
    </>
  );
};

export default AdminEvents;

