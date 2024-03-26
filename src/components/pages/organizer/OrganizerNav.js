import React from 'react';
import { Link } from 'react-router-dom';
import './OrganizerNav.css';

const OrganizerNav = () => {
    return (
        <ul className="organizer-nav">
            <li><Link to="/organizer-dashboard">Home</Link></li>
            <li><Link to="/organizer-profile">Profile</Link></li>
            <li><Link to="/organizer-events">Events</Link></li>
            <li><Link to="/organizer-requests">Requests</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
    );
};

export default OrganizerNav;