import React, { useState } from 'react';
import Counter from './components/Counter/Counter';
import Counter2 from './components/Counter/Counter2';
import Band from './components/Counter/Band';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (typeButton) => {
    const Counter =
      typeButton === '+'
        ? currentCounter + 1
        : typeButton === '-'
        ? currentCounter - 1
        : currentCounter;

    setCurrentCounter(Counter);
    setSteps(steps + 1);
  };

  return (
    <>
      <h3>BAND</h3>
      <Band />
      <h3>COUNTER</h3>
      <Counter />
      <Counter />
      <Counter />
      <h3>COUNTER 02</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
    </> //pode usar <Fragment></Fragment>, caso queira atribuir alguma classe ou outra coisa...
  );
}
