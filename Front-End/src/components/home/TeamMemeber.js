import React from 'react';

export function TeamMember({ image, name, role }) {
  return (
    <div className="team-member">
      <img src={image} alt={name} />
      <div className="overlay" />
      <div className="content">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
    </div>
  );
}