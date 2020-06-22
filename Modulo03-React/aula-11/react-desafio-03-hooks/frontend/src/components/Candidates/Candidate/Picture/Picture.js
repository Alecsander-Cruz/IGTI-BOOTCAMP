import React from 'react';
import css from './picture.module.css';

export default function Picture({ imgSource, description }) {
  return (
    <div>
      <img
        className={css.picture}
        src={imgSource}
        alt={description}
        title={description}
      />
    </div>
  );
}
