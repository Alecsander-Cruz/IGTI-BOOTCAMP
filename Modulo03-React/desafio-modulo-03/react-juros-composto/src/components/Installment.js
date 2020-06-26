import React from 'react';
import css from './styles.module.css';
import { formatNumber } from '../helpers/formatHelpers';

export default function Installment({ installments, tax }) {
  let value = '';
  return (
    <div className={css.installments}>
      {installments.map(({ id, amount, additionalCapital, percentage }) => {
        tax >= 0
          ? (value = `+${formatNumber(additionalCapital)}`)
          : (value = formatNumber(additionalCapital));
        return (
          <div key={id} className={css.flexRow}>
            <span className={css.installment}>{id}</span>
            <span className={css.installment}>
              <span className={tax >= 0 ? css.goodValue : css.badValue}>
                {formatNumber(amount)} <br />
              </span>
              <span className={tax >= 0 ? css.goodValue : css.badValue}>
                {value} <br />
              </span>
              <span
                className={tax >= 0 ? css.goodPercentage : css.badPercentage}
              >
                {percentage}% <br />
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
