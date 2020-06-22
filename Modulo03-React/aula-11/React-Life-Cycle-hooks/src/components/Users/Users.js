import React, { useState, useEffect } from 'react';
import User from './User';

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsVisible]);

  return (
    <div>
      <p>Componente Users vísivel por {secondsVisible}</p>
      <ul>
        {users.map((user) => {
          const { login, name, picture } = user;
          return (
            <li key={login.uuid}>
              <User name={name} picture={picture} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
