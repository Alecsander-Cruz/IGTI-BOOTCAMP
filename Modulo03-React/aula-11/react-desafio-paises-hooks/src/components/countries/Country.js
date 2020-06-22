import React from 'react';
import css from './countries.module.css';

export default function Country({ country }) {
  return (
    <div className={`${css.border} ${css.country} `}>
      <img className={css.flagSize} src={country.flag} alt={country.name} />
      <span className="center">{country.name}</span>
    </div>
  );
}
