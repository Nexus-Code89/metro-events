  import { useContext } from 'react';
  import { NotificationContext } from '../../contexts/NotificationContext';
  import '../../../css/UserNotifications.css'
  import UserNav from './UserNav';


  const UserNotifications= () => {
    
    const { unreadCount, notifications, toggleReadStatus} = useContext(NotificationContext);
    

    //const [ permissionStatus, setPermissionStatus ] = useState(Notification.permission);
    // function askPermission() {
    //   if(!("Notification" in window)) {
    //     alert("This browser does not support desktop notification");
    //   } else if(Notification.permission === "default") {
    //     Notification.requestPermission().then(permission => {
    //       setPermissionStatus(permission);
    //       if(permission === "granted") {
    //         alert("You have granted permission to show push notifications")
    //       } else {
    //         alert("You have denied permission to show push notifications")
    //       }
    //     });
    //   }
    // }

    return (
      <section>
        <div className="menu-header">
          <h2>User Notifications</h2>
          <UserNav />
        </div>
        <div className="content">
          <h3>Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}</h3>
          
          {/* {(permissionStatus === "default") ? (
            <button onClick={() => askPermission()}>Enable Push Notifications</button>
          ) : (
            (permissionStatus === "granted") ? (
              <h1>Push Notifications are enabled.</h1>
            ) : (
              <h1> Push Notifications are disabled.</h1>
            )
          )} */}

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-card">
                <p className="notification-timestamp">{notification.timestamp}</p>
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

  export default UserNotifications;