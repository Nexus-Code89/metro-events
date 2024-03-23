import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>User Profile</h2>
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
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default UserProfile;
