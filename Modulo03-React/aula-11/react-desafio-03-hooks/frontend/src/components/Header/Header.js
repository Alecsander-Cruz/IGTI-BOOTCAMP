import React from 'react';

export default function Header({ children }) {
  return (
    <div>
      <h2 className="center">{children}</h2>
    </div>
  );
}
