import React from 'react';
import OrganizerNav from './OrganizerNav';

const OrganizerProfile = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>Organizer Profile</h2>
        <OrganizerNav />
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default OrganizerProfile;