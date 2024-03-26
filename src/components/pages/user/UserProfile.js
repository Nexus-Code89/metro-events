import React from 'react';
import UserNav from './UserNav';

const UserProfile = () => {
  return (
    <section>
      <div className="menu-header">
        <h2>User Profile</h2>
        <UserNav />
      </div>
      {/* Your dashboard content goes here */}
    </section>
  );
};

export default UserProfile;
