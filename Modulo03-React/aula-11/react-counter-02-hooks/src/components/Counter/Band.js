import React, { useState } from 'react';

const BAND_MEMBERS = [
  {
    id: 1,
    name: 'Tyler Joseph',
    instrument: 'Vocal',
  },
  {
    id: 2,
    name: 'Josh Dun',
    instrument: 'Bateria',
  },
];

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState('Twenty One Pilots');

  return (
    <div>
      <h4>{bandName}</h4>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
