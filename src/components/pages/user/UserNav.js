import { Link } from 'react-router-dom';
import { NotificationContext } from '../../contexts/NotificationContext';
import { useContext } from 'react';

const UserNav = () => {
  const { unreadCount } = useContext(NotificationContext);

  return (
    <nav>
      <ul>
        <li><Link to="/user-dashboard">Home</Link></li>
        <li><Link to="/user-profile">Profile</Link></li>
        <li><Link to="/user-events">Events</Link></li>
        <li><Link to="/user-requests">Requests</Link></li>
        <li><Link to="/user-notifications">Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default UserNav;