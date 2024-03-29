import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/UserEvents.css';
import { firestore } from '../../../firebase/firebase';
import ReviewIcon from '../../img/review-icon.png';
import EventRequestForm from './EventRequestForm'; // Import EventRequestForm component
import UpvoteHandler from './UpvoteHandler';
import UserNav from './UserNav';


const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(firestore, 'events');
      const querySnapshot = await getDocs(eventsRef);
      const eventsList = querySnapshot.docs.map(doc => {
        const eventData = doc.data();
        const numberOfUpvotes = eventData.upvotes.length - eventData.downvotes.length; // Assuming upvotes is an array
        return { id: doc.id, ...eventData, numberOfUpvotes };
      });
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRequestPopup = () => {
    setCurrentEvent(null);
    setIsRequestPopupOpen(false);
  }

  return (
    <section>
      <div className="menu-header">
        <h2>User Events</h2>
        <UserNav />
      </div>
      {isRequestPopupOpen &&
      <div style={{
        position: 'absolute',
        width: '30%',
        height: '250px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: '#E2E2E2'
      }}>
        <h1>Request to Join</h1>
        {currentEvent !== null &&
        <EventRequestForm
          eventId={currentEvent.id}
          organizerId={currentEvent.organizerId}
          organizerEmail={currentEvent.eventEmail}
          eventName={currentEvent.eventName}
          eventDate={currentEvent.eventDate}
          eventLocation={currentEvent.eventLocation}
          onClick={() => handleRequestPopup()}
        />
        }
        <button onClick={() => handleRequestPopup()}>Cancel</button>
      </div>}
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
              <div style={{ display: "flex", textAlign: "center"}}>

                {/* Upvote Component */}
                <UpvoteHandler userId={user.uid} event={event}/>

                {/* Redirect to Review Event */}
                <Link to={`/event-reviews/${event.id}`}>
                  <button style={{ backgroundColor: '#f5f5f5' }}>
                    <img 
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                    src={ReviewIcon}/>
                  </button>
                </Link>

                {/* Button to show EventRequestFormPopup */}
                <button 
                style={{
                  width: '100px',
                  height: '35px',
                  padding: '0'
                }}
                onClick={() => {
                  setCurrentEvent(event);
                  setIsRequestPopupOpen(true);
                  }}>Request to join</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserEvents;
