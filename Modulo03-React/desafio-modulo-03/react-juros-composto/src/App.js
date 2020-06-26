import React, { useState } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';

export default function App() {
  const [capital, setCapital] = useState(0);
  const [tax, setTax] = useState(0);
  const [period, setPeriod] = useState(1);

  const handleCapitalChange = (newCapital) => {
    setCapital(newCapital);
  };

  const handleTaxChange = (newTax) => {
    setTax(newTax);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="container">
      <h1 className="center">React - Juros Composto!</h1>
      <Form
        onCapitalChange={handleCapitalChange}
        onTaxChange={handleTaxChange}
        onPeriodChange={handlePeriodChange}
        capital={capital}
        tax={tax}
        period={period}
      />
      <Installments capital={capital} tax={tax} period={period} />
    </div>
  );
}
