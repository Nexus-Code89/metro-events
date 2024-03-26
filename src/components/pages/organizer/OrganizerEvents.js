import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import OrganizerNav from './OrganizerNav';

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        try {
          const eventsRef = collection(firestore, 'events');
          const eventsQuery = query(eventsRef, where('organizerId', '==', user.uid));
          const querySnapshot = await getDocs(eventsQuery);
          const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEvents(eventsList);
        } catch (error) {
          console.error('Error fetching events:', error.message);
        }
      };

      fetchEvents();
    }
  }, [user]);

  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Events</h2>
        <OrganizerNav />
          <ul>
            <li><Link to="/organizer-dashboard">Home</Link></li>
            <li><Link to="/organizer-profile">Profile</Link></li>
            <li><Link to="/organizer-events">Events</Link></li>
            <li><Link to="/organizer-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      <div>
        <h3>My Events:</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>Event Name:</strong> {event.eventName} <br />
              <strong>Date:</strong> {event.eventDate} <br />
              <strong>Location:</strong> {event.eventLocation} <br />
              <strong>Start Time:</strong> {event.startTime} <br />
              <strong>End Time:</strong> {event.endTime} <br />
              <strong>Description:</strong> {event.eventDescription} <br />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrganizerEvents;
