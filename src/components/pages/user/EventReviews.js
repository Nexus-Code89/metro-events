import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../../css/UserEvents.css';
import { firestore } from '../../../firebase/firebase';
import EventRequestForm from './EventRequestForm';
import ReviewItem from './ReviewItem';
import UpvoteHandler from './UpvoteHandler';
import UserNav from './UserNav';

const EventReview = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [currentReview, setCurrentReview] = useState('');
    const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    const fetchReviews = async () => {
        try {
            const eventDocRef = doc(firestore, 'events', eventId);
            const eventDoc = await getDoc(eventDocRef);
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                const reviewsList = eventData.reviews;
                const numberOfUpvotes = eventData.upvotes.length - eventData.downvotes.length;
                const newEventData = { id: eventDoc.id, ...eventData, numberOfUpvotes: numberOfUpvotes };
                setReviews(reviewsList);
                setEvent(newEventData);
                console.log(event.id, eventData.eventName);
            }
            console.log("No event found");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleRequestPopup = () => {
        setIsRequestPopupOpen(false);
    };

    const handleReview = async () => {
        try {
            const eventDocRef = doc(firestore, 'events', eventId);
            const eventDoc = await getDoc(eventDocRef);
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                const reviewData = { userId: user.uid, review: currentReview };
                const newReviewsList = [...eventData.reviews, reviewData];
                await updateDoc(eventDocRef, { reviews: newReviewsList });
                setReviews(newReviewsList);
                setCurrentReview('');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <section>
            <div className="menu-header">
                <h2>User Events</h2>
                <UserNav />
            </div>
            {isRequestPopupOpen && event && (
                <div
                    style={{
                        position: 'absolute',
                        width: '30%',
                        height: '250px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        backgroundColor: '#E2E2E2',
                    }}
                >
                    <h1>Request to Join</h1>
                    <EventRequestForm
                        eventId={event.id}
                        organizerId={event.organizerId}
                        organizerEmail={event.eventEmail}
                        eventName={event.eventName}
                        eventDate={event.eventDate}
                        eventLocation={event.eventLocation}
                        onClick={() => handleRequestPopup()}
                    />
                    <button onClick={() => handleRequestPopup()}>Cancel</button>
                </div>
            )}
            <div>
                {event && (
                    <>
                        <h3>Event:</h3>
                        <strong>Event Name:</strong> {event.eventName} <br />
                        <strong>Date:</strong> {event.eventDate} <br />
                        <strong>Location:</strong> {event.eventLocation} <br />
                        <strong>Start Time:</strong> {event.startTime} <br />
                        <strong>End Time:</strong> {event.endTime} <br />
                        <strong>Description:</strong> {event.eventDescription} <br />
                        <strong>Organizer:</strong> {event.eventEmail} <br />
                        <div>
                            {/* Upvote Component */}
                            <UpvoteHandler userId={user.uid} event={event}/>

                            {/* Button to show EventRequestFormPopup */}
                            <button
                                style={{
                                    width: '100px',
                                    height: '35px',
                                    padding: '0',
                                }}
                                onClick={() => {
                                    setIsRequestPopupOpen(true);
                                }}
                            >
                                Request to join
                            </button>
                        </div>
                    </>
                )}
                <textarea 
                cols='50'
                rows='5'
                placeholder='Enter Review'
                value={currentReview}
                onChange={(e) => setCurrentReview(e.target.value)}
                />
                
                <button onClick={() => handleReview()}>Submit Review</button>

                <h3>Reviews:</h3>
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <ReviewItem userId={review.userId} review={review.review} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default EventReview;
