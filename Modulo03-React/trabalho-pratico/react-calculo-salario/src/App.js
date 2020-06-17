import React, { Component } from 'react';
import SalaryView from './components/salary/SalaryView';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: '',
    };
  }

  handleChangeInput = (newSalary) => {
    this.setState({
      fullSalary: newSalary,
    });
  };

  render() {
    const { fullSalary } = this.state;

    return (
      <div className="container">
        <h2 className="center">React Salário</h2>
        <SalaryView fullSalary={fullSalary} onChange={this.handleChangeInput} />
      </div>
    );
  }
}
