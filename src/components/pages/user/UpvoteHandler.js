import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../../../firebase/firebase';

const UpvoteHandler = ({ userId, event }) => {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);

    useEffect(() => {
        if (event) {
            setIsUpvoted(event.upvotes.includes(userId));
            setIsDownvoted(event.downvotes.includes(userId));
            setNumberOfUpvotes(event.numberOfUpvotes);
        } else {
            console.log('No event passed');
        }
    }, [userId, event]);

    const handleUpvote = async () => {
        try {
            const eventDocRef = doc(firestore, 'events', event.id);
            const eventDoc = await getDoc(eventDocRef);
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                if (!isUpvoted) {
                    if (isDownvoted) {
                        const newDownvoteList = eventData.downvotes.filter(downvote => downvote !== userId);
                        await updateDoc(eventDocRef, { downvotes: newDownvoteList });
                        console.log(userId + ' has removed his downvote on ' + eventData.eventName + ' event');
                        setIsDownvoted(false);
                    }
                    await updateDoc(eventDocRef, { upvotes: [...eventData.upvotes, userId] });
                    console.log(userId + ' has upvoted to ' + eventData.eventName + ' event');
                    setIsUpvoted(true);
                } else {
                    const newUpvoteList = eventData.upvotes.filter(upvote => upvote !== userId);
                    await updateDoc(eventDocRef, { upvotes: newUpvoteList });
                    console.log(userId + ' has removed his upvote on ' + eventData.eventName + ' event');
                    setIsUpvoted(false);
                }
                const updatedEventDoc = await getDoc(eventDocRef);
                if (updatedEventDoc.exists()) {
                    const updatedEventData = updatedEventDoc.data();
                    setNumberOfUpvotes(updatedEventData.upvotes.length - updatedEventData.downvotes.length);
                    setIsUpvoted(updatedEventData.upvotes.includes(userId));
                    setIsDownvoted(updatedEventData.downvotes.includes(userId));
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDownvote = async () => {
        try {
            const eventDocRef = doc(firestore, 'events', event.id);
            const eventDoc = await getDoc(eventDocRef);
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                if (!isDownvoted) {
                    if (isUpvoted) {
                        const newUpvoteList = eventData.upvotes.filter(upvote => upvote !== userId);
                        await updateDoc(eventDocRef, {upvotes: newUpvoteList});
                        console.log(userId + 'has removed his upvote on ' + eventData.eventName + ' event');
                    }
                    await updateDoc(eventDocRef, { downvotes: [...eventData.downvotes, userId]});
                    console.log(userId + ' has downvoted to ' + eventData.eventName + ' event');
                } else {
                    const newDownvoteList = eventData.downvotes.filter(upvote => upvote !== userId);
                    await updateDoc(eventDocRef, {downvotes: newDownvoteList});
                    console.log(userId + 'has removed his downvote on ' + eventData.eventName + ' event');
                }
                const updatedEventDoc = await getDoc(eventDocRef);
                if (updatedEventDoc.exists()) {
                    const updatedEventData = updatedEventDoc.data();
                    setNumberOfUpvotes(updatedEventData.upvotes.length - updatedEventData.downvotes.length);
                    setIsUpvoted(updatedEventData.upvotes.includes(userId));
                    setIsDownvoted(updatedEventData.downvotes.includes(userId));
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div style={{ width: '110px', height: '35px' }}>
            <button
                className="upvote"
                onClick={handleUpvote}
                style={{
                    backgroundColor: isUpvoted ? '#FF5400' : '#f5f5f5',
                    color: isUpvoted ? '#f5f5f5' : '#000000',
                    border: isUpvoted ? '1px solid #f5f5f5' : ''
                }}
            >
                ↑
            </button>&nbsp;&nbsp;
            <span style={{
                color: isUpvoted ? '#FF5400' : (isDownvoted ? '#ac8bff' : '#000000')
            }}>
                {numberOfUpvotes}
            </span>&nbsp;&nbsp;
            <button
                className="downvote"
                onClick={handleDownvote}
                style={{
                    backgroundColor: isDownvoted ? '#ac8bff' : '#f5f5f5',
                    color: isDownvoted ? '#f5f5f5' : '#000000',
                    border: isDownvoted ? '1px solid #f5f5f5' : ''
                }}
            >
                ↓
            </button>
        </div>
    )
}

export default UpvoteHandler;
