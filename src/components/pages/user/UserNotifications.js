import { Link } from 'react-router-dom';
import { useState } from 'react';



const UserNotifications= () => {
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
        <h3>Notifications</h3>
        
        {(permissionStatus === "default") ? (
          <button onClick={() => askPermission()}>Enable Push Notifications</button>
        ) : (
          (permissionStatus === "granted") ? (
            <h1>Push Notifications are enabled.</h1>
          ) : (
            <h1> Push Notifications are disabled.</h1>
          )
        )}

        <p>There are no notifications.</p>
      </div>
    </section>
  );
};

export default UserNotifications;