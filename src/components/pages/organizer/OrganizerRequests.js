import React from 'react';
import { Link } from 'react-router-dom';

const OrganizerRequests = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Requests</h2>
        <nav>
          <ul>
            <li><Link to="/organizer-dashboard">Home</Link></li>
            <li><Link to="/organizer-profile">Profile</Link></li>
            <li><Link to="/organizer-events">Events</Link></li>
            <li><Link to="/organizer-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default OrganizerRequests;