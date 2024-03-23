import React from 'react';
import { Link } from 'react-router-dom';

const AdminEvents = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>Admin Events</h2>
        <nav>
          <ul>
            <li><Link to="/admin-dashboard">Home</Link></li>
            <li><Link to="/admin-manage-accounts">Accounts</Link></li>
            <li><Link to="/admin-manage-events">Events</Link></li>
            <li><Link to="/admin-manage-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default AdminEvents;
