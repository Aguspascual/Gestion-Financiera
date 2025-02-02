import React from 'react';

export function MissionCard({ title, description }) {
  return (
    <div className="mission-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}