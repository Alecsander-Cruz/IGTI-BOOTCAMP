import React from 'react';
import Installment from './Installment';

function calculateAmount(capital, tax, period) {
  const realTax = tax / 100;
  const amount = +(capital * Math.pow(1 + realTax, period));

  return +amount;
}

function calculateAdditionalCapital(amount, capital) {
  const additionalCapital = amount - capital;
  return +additionalCapital;
}

function calculatePercentage(capital, additionalCapital) {
  let percentage = 0;
  if (capital === 0 || additionalCapital === 0) {
    return (percentage = 0);
  }
  percentage = +(additionalCapital * 100) / capital;
  percentage = +percentage.toFixed(2);
  return +percentage;
}

export default function Installments({ capital, tax, period }) {
  // const [installments, setInstalments] = useState([]);

  const installments = [];

  for (let i = 1; i <= period; i++) {
    const amount = calculateAmount(capital, tax, i);
    const additionalCapital = calculateAdditionalCapital(amount, capital);
    const percentage = calculatePercentage(capital, additionalCapital);

    installments.push({
      id: i,
      amount,
      additionalCapital,
      percentage,
    });
  }

  return (
    <div>
      <Installment installments={installments} tax={tax} />
    </div>
  );
}
