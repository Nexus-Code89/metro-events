import { useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import './UserNotifications.css';
import UserNav from './UserNav';


const UserNotifications= () => {
  
  const { unreadCount, notifications, setNotifications } = useContext(NotificationContext);
  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, data: {...notification.data, read: !notification.data.read}} : notification
    ));
  }

  const [ permissionStatus, setPermissionStatus ] = useState(Notification.permission);
 
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
        <UserNav />
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