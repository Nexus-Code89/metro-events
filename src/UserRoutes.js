// UserRoutes.js
import { useRoutes } from 'react-router-dom';
import { NotificationProvider } from './components/contexts/NotificationContext.js';
import UserDashboard from './components/dashboard/UserDashboard.js';
import UserProfile from './components/pages/user/UserProfile'; 
import UserEvents from './components/pages/user/UserEvents'; 
import UserRequests from './components/pages/user/UserRequests';
import UserNotifications from './components/pages/user/UserNotifications.js'

export default function UserRoutes() {
  let element = useRoutes([
    { path: '/user-dashboard', element: <UserDashboard /> },
    { path: '/user-profile', element: <UserProfile /> },
    { path: '/user-events', element: <UserEvents /> },
    { path: '/user-requests', element: <UserRequests /> },
    { path: '/user-notifications', element: <UserNotifications /> },
  ]);

  return <NotificationProvider>{element}</NotificationProvider>;
}