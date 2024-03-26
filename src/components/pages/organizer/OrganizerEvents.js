import React from 'react';
import OrganizerNav from './OrganizerNav';

const OrganizerEvents = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Events</h2>
        <OrganizerNav />
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default OrganizerEvents;