import React from 'react';
import './Skelaton.css';

const Skelaton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
};

export default Skelaton;

