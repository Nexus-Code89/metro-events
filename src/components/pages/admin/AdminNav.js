import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav>
          <ul>
            <li><Link to="/admin-dashboard">Home</Link></li>
            <li><Link to="/admin-manage-accounts">Accounts</Link></li>
            <li><Link to="/admin-manage-events">Events</Link></li>
            <li><Link to="/admin-manage-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
    );
};

export default AdminNav;