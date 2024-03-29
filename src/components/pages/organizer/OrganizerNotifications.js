import { useContext } from 'react';
import '../../../css/UserNotifications.css';
import { NotificationContext } from '../../contexts/NotificationContext';
import OrganizerNav from './OrganizerNav';


const OrganizerNotifications= () => {
    
  const { unreadCount, notifications, toggleReadStatus } = useContext(NotificationContext);

  // Function to calculate the time difference between the current time and the notification timestamp
  const calculateTimeDifference = (timestamp) => {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();
    // Convert the notification timestamp to milliseconds
    const notificationTime = timestamp.toMillis();
    // Calculate the time difference in milliseconds
    const difference = currentTime - notificationTime;
  
    // Convert milliseconds to seconds
    const seconds = Math.floor(difference / 1000);
    // Convert seconds to minutes
    const minutes = Math.floor(seconds / 60);
    // Convert minutes to hours
    const hours = Math.floor(minutes / 60);
    // Convert hours to days
    const days = Math.floor(hours / 24);
  
    // Format the time difference based on the duration
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <section>
      <div className="menu-header">
        <h2>User Notifications</h2>
        <OrganizerNav />
      </div>
      <div className="content">
        <h3>Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}</h3>

        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <p className="notification-timestamp">{calculateTimeDifference(notification.timestamp)}</p>
              <p className="notification-message">{notification.message}</p>
              <p className="notification-status">Status: {notification.read ? 'Read' : 'Unread'}</p>
              {notification.read ?
                <button className="mark-unread-button" onClick={() => toggleReadStatus(notification.id)}>Mark as Unread</button> :  
                <button className="mark-read-button" onClick={() => toggleReadStatus(notification.id)}>Mark as Read</button>
              }
            </div>
          ))
        ) : (
          <p>There are no notifications.</p>
        )}

      </div>
    </section>
  );
};

export default OrganizerNotifications;