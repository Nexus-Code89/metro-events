import React from 'react';
import { Link } from 'react-router-dom';

const OrganizerNav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/organizer-dashboard">Home</Link></li>
                <li><Link to="/organizer-profile">Profile</Link></li>
                <li><Link to="/organizer-events">Events</Link></li>
                <li><Link to="/organizer-requests">Requests</Link></li>
                <li><Link to="/organizer-notifications">Notifications</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default OrganizerNav;