import React, { useEffect, useState } from 'react';
import OrganizerNav from './OrganizerNav';
import './Organizer.css';
import { firestore } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(firestore, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => doc.data());
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Events</h2>
        <OrganizerNav />
        <div className='Events'>
          {events.map((event, index) => (
            <div key={index} className="event">
              <h3>{event.eventName}</h3>
              <p>{event.eventDate}</p>
              <p>{event.startTime} - {event.endTime}</p>
              <p>{event.eventLocation}</p>
              <p>{event.eventDescription}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default OrganizerEvents;