import React from 'react';

export function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="service-card">
      <div className="icon-wrapper">
        <Icon className="icon" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}