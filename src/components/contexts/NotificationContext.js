import { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { UserContext } from './UserContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        console.log('Fetching notifications for user:', user);
        if (user && user.userId) {
          const notificationsRef = collection(firestore, 'notifications');
          const querySnapshot = await getDocs(
            query(notificationsRef, where('userId', '==', user.userId))
          );
          const notificationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNotifications(notificationsList);
          console.log('Notifications:', notificationsList);
        } else {
          console.error('User or userId is undefined');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };
  
    fetchUserNotifications ();
  }, [user]);

  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};