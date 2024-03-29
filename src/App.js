import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login.js';
import Logout from './components/auth/Logout';
import Register from './components/auth/Register.js';
// user
import UserRoutes from './UserRoutes';
import { UserProvider } from './components/contexts/UserContext.js';
// admin
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminAccounts from './components/pages/admin/AdminAccounts.js';
import AdminEvents from './components/pages/admin/AdminEvents.js';
import AdminRequests from './components/pages/admin/AdminRequests.js';
// organizer
import OrganizerDashboard from './components/dashboard/OrganizerDashboard';
import OrganizerCreateEvents from './components/pages/organizer/CreateEvent.js';
import OrganizerEvents from './components/pages/organizer/OrganizerEvents.js';
import OrganizerProfile from './components/pages/organizer/OrganizerProfile.js';
import OrganizerRequests from './components/pages/organizer/OrganizerRequests.js';
// css
import { NotificationProvider } from './components/contexts/NotificationContext.js';
import OrganizerNotifications from './components/pages/organizer/OrganizerNotifications.js';
import './css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route to Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          {/* Protected routes for user */}
          <Route path="/*" element={<UserRoutes />} />
          {/* Protected routes for admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-manage-accounts" element={<AdminAccounts />} />
          <Route path="/admin-manage-events" element={<AdminEvents />} />
          <Route path="/admin-manage-requests" element={<AdminRequests />} />
          {/* Protected routes for organizer */}
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer-profile" element={<OrganizerProfile />} />
          <Route path="/organizer-events" element={<OrganizerEvents />} />
          <Route path="/create-event" element={<OrganizerCreateEvents />} />
          <Route path="/organizer-requests" element={<OrganizerRequests />} />
          <Route path="/organizer-notifications" element={<OrganizerNotifications />}></Route>
        </Routes>
      </NotificationProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
