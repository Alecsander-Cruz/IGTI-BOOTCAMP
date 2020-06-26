import React from 'react';
import css from './styles.module.css';

export default function Form({
  capital,
  onCapitalChange,
  tax,
  onTaxChange,
  period,
  onPeriodChange,
}) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  const handleCapitalChangeForm = (event) => {
    const newCapital = +event.target.value;
    onCapitalChange(newCapital);
  };

  const handleTaxChangeForm = (event) => {
    const newTax = +event.target.value;
    onTaxChange(newTax);
  };

  const handlePeriodChangeForm = (event) => {
    const newPeriod = +event.target.value;
    onPeriodChange(newPeriod);
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="input-field">
        <input
          id="inputCapital"
          type="number"
          value={capital}
          onChange={handleCapitalChangeForm}
          min={0}
          max={100000}
        />
        <label htmlFor="inputCapital" className="active">
          Montante inicial:
        </label>
      </div>
      <div className="input-field">
        <input
          id="inputTax"
          type="number"
          value={tax}
          onChange={handleTaxChangeForm}
          min={-12}
          max={12}
          step="0.1"
        />
        <label htmlFor="inputTax" className="active">
          Taxa de juros mensal:
        </label>
      </div>
      <div className="input-field">
        <input
          id="inputPeriod"
          type="number"
          value={period}
          onChange={handlePeriodChangeForm}
          min={1}
          max={36}
        />
        <label htmlFor="inputPeriod" className="active">
          Período (meses):
        </label>
      </div>
      {/* </form> */}
    </div>
  );
}
