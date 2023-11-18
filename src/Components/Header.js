import React from 'react';

const Header = ({ companyName }) => {
  return (
    <div className="header">
      <h1>{companyName}</h1>
    </div>
  );
};

export default Header;
