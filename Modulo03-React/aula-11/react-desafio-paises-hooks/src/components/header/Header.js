import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header({
  onChangeFilter,
  filter,
  countryCount,
  populationCount,
}) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div className={css.flexRow}>
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        placeholder="Filtro"
      />
      |
      <span className={css.infoCountry}>
        Países: <strong>{countryCount}</strong>{' '}
      </span>
      |
      <span className={css.infoPopulation}>
        População: <strong>{formatNumber(populationCount)}</strong>{' '}
      </span>
    </div>
  );
}
