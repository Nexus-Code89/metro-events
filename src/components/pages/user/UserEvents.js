import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import EventRequestForm from './EventRequestForm'; // Import EventRequestForm component
import '../../../css/UserEvents.css'
import UserNav from './UserNav';

const UserEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(firestore, 'events');
        const querySnapshot = await getDocs(eventsRef);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <div className="menu-header">
        <h2>User Events</h2>
        <UserNav />
      </div>
      <div>
        <h3>All Events:</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>Event Name:</strong> {event.eventName} <br />
              <strong>Date:</strong> {event.eventDate} <br />
              <strong>Location:</strong> {event.eventLocation} <br />
              <strong>Start Time:</strong> {event.startTime} <br />
              <strong>End Time:</strong> {event.endTime} <br />
              <strong>Description:</strong> {event.eventDescription} <br />
              <strong>Organizer:</strong> {event.eventEmail} <br />

              {/* Pass event details to EventRequestForm component */}
              <EventRequestForm
                eventId={event.id}
                organizerId={event.organizerId}
                organizerEmail={event.eventEmail}
                eventName={event.eventName}
                eventDate={event.eventDate}
                eventLocation={event.eventLocation}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserEvents;
