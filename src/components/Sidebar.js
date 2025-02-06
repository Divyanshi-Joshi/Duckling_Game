// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside style={sidebarStyle}>
      {/* Sidebar content like settings or stats */}
      <p>Sidebar Content</p>
    </aside>
  );
};

const sidebarStyle = {
  width: '200px',
  backgroundColor: '#ddd',
  padding: '20px',
};

export default Sidebar;