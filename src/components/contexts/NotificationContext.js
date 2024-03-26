import { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { UserContext } from './UserContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (user) {
          const userRef = doc(firestore, 'users', user.username);
          const requestsRef = collection(userRef, 'notifications');
          const querySnapshot = await getDocs(requestsRef);
          const requestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNotifications(requestsList);
        }
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };
  
    fetchRequests();
  }, [user]);

  useEffect(() => {
    const count = notifications.filter(notification => !notification.data.read).length;
    setUnreadCount(count);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};