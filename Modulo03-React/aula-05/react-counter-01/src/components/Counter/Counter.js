import React, { Component } from 'react';
import css from './counter.module.css';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 2,
    };
  }

  handleClickMinus = () => {
    let newCurrentCounter = Object.assign(this.state.currentCounter);
    newCurrentCounter--;
    this.setState({ currentCounter: newCurrentCounter });
  };

  handleClickPlus = () => {
    let newCurrentCounter = Object.assign(this.state.currentCounter);
    newCurrentCounter++;
    this.setState({ currentCounter: newCurrentCounter });
  };

  render() {
    const { currentCounter } = this.state;
    return (
      <div className={css.counterContainer}>
        <button
          onClick={this.handleClickMinus}
          className="waves-effect waves-light btn red darken"
        >
          -
        </button>
        <span className={css.counterValue}>{currentCounter}</span>
        <button
          onClick={this.handleClickPlus}
          className="waves-effect waves-light btn green darken"
        >
          +
        </button>
      </div>
    );
  }
}
