import React from 'react';
import OrganizerNav from '../pages/organizer/OrganizerNav';

const OrganizerDashboard = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Dashboard</h2>
        <OrganizerNav />
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default OrganizerDashboard;
