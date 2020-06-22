import React from 'react';
import css from './users.module.css';

export default function User({ name, picture }) {
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.thumbnail} alt={name.first} />
      <span>{name.first}</span>
    </div>
  );
}
