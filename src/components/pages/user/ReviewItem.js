import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { firestore } from '../../../firebase/firebase';

const ReviewItem = ({ userId, review }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userDocRef = doc(firestore, 'users', userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username);
                } else {
                    setUsername('User not found');
                }
            } catch (error) {
                console.error(error);
                setUsername('Error fetching username');
            }
        };

        fetchUsername();
    }, [userId]);

    return (
        <h3>{username} said {review}</h3>
    );
};

export default ReviewItem;
