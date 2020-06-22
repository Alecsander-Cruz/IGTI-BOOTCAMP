import React from 'react';
import CountUp from 'react-countup';

export default function Percentage({ value, previous }) {
  return (
    <div style={{ fontSize: '1.5rem' }}>
      <CountUp
        start={previous || 0}
        end={value}
        decimals={2}
        decimal=","
        duration={0.6}
        suffix="%"
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
