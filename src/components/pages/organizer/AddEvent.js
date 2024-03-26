import React from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddEvent() {
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          eventName: e.target.eventName.value,
          eventDate: e.target.eventDate.value,
          startTime: e.target.startTime.value,
          endTime: e.target.endTime.value,
          eventLocation: e.target.eventLocation.value,
          eventDescription: e.target.eventDescription.value,
        };
        
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            const organizerId = user.uid;
            // If not in edit mode, submit a new request
            await addDoc(collection(firestore, 'events'), {
              organizerId,
              eventName: formData.eventName,
              eventDate: formData.eventDate,
              startTime: formData.startTime,
              endTime: formData.endTime,
              eventLocation: formData.eventLocation,
              eventDescription: formData.eventDescription,
              eventEmail: user.email,
              attendees: [],
            });
            
            toast.success('Event successfully created');
          }
        } catch (error) {
          toast.error('Error creating event');
        }
      };

    return (
        <div>
            <ToastContainer />
            <h1>Create an Event</h1>
            <form className="create-event" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Name</label>
                    <input type="text" name="eventName" placeholder="Enter event name" />
                </div>
                <div className="form-group">
                    <label>Event Date</label>
                    <input type="date" name="eventDate" />
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" name="startTime" />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input type="time" name="endTime" />
                </div>
                <div className="form-group">
                    <label>Event Location</label>
                    <input type="text" name="eventLocation" placeholder="Enter event location" />
                </div>
                <div className="form-group">
                    <label>Event Description</label>
                    <textarea name="eventDescription" placeholder="Enter event description"></textarea>
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default AddEvent;