import React from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter2(props) {
  const handleClick = (typeButton) => {
    props.onCount(typeButton);
  };

  const { countValue, currentSteps } = props;

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleClick} />
      <Value value={countValue} />
      <IncrementButton onIncrement={handleClick} />
      <Steps currentSteps={currentSteps} />
    </div>
  );
}
