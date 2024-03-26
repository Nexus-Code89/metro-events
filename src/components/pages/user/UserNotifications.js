import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './UserNotifications.css';


const UserNotifications= () => {
  const notifs_test = [
    {
      id: '1',
      data: {
        title: "Your new event is coming up!",
        event: "Event Name",
        message: 'This is a test message for the notification.',
        timestamp: "1 day ago",
        read: false
      }
    },
    {
      id: '2',
      data: {
        title: "Another Notification",
        event: "Another Event",
        timestamp: "8 hours ago",
        message: 'This is a test message for the notification.',
        read: true
      }
    },
  ];

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, data: {...notification.data, read: !notification.data.read}} : notification
    ));
  }

  const [ permissionStatus, setPermissionStatus ] = useState(Notification.permission);

  // change when there are events
  const [ notifications, setNotifications ] = useState(notifs_test);
  const [unreadCount, setUnreadCount] = useState(0); // New state variable for unread count

  

  useEffect(() => {
    const count = notifications.filter(notification => !notification.data.read).length;
    setUnreadCount(count);
  }, [notifications]);
  
  function askPermission() {
    if(!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if(Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        setPermissionStatus(permission);
        if(permission === "granted") {
          alert("You have granted permission to show push notifications")
        } else {
          alert("You have denied permission to show push notifications")
        }
      });
    }
  }

  return (
    <section>
      <div className="menu-header">
        <h2>User Notifications</h2>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">Home</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
            <li><Link to="/user-events">Events</Link></li>
            <li><Link to="/user-requests">Requests</Link></li>
            <li><Link to="/user-notifications">Notifications</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <h3>Notifications ({unreadCount})</h3>
        
        {(permissionStatus === "default") ? (
          <button onClick={() => askPermission()}>Enable Push Notifications</button>
        ) : (
          (permissionStatus === "granted") ? (
            <h1>Push Notifications are enabled.</h1>
          ) : (
            <h1> Push Notifications are disabled.</h1>
          )
        )}

        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <h4 className="notification-title">{notification.data.title}</h4>
              <p className="notification-event">{notification.data.event}</p>
              <p className="notification-timestamp">{notification.data.timestamp}</p>
              <p className="notification-status">Status: {notification.data.read ? 'Read' : 'Unread'}</p>
              <p className="notification-message">{notification.data.message}</p>
              {notification.data.read ? 
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

export default UserNotifications;