import React, { Component } from 'react';
import Counter from './components/Counter/Counter';
import Counter2 from './components/Counter/Counter2';
import Band from './components/Counter/Band';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 3,
      steps: 0,
    };
  }

  handleCount = (typeButton) => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        typeButton === '+'
          ? currentCounter + 1
          : typeButton === '-'
          ? currentCounter - 1
          : currentCounter,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
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
          onCount={this.handleCount}
          countValue={currentCounter}
          currentSteps={steps}
        />
        <Counter2
          onCount={this.handleCount}
          countValue={currentCounter}
          currentSteps={steps}
        />
        <Counter2
          onCount={this.handleCount}
          countValue={currentCounter}
          currentSteps={steps}
        />
      </> //pode usar <Fragment></Fragment>, caso queira atribuir alguma classe ou outra coisa...
    );
  }
}
