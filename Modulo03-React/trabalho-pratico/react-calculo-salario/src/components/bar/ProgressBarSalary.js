import React, { Component } from 'react';
import Bar from './Bar';

export default class ProgressBarSalary extends Component {
  constructor() {
    super();

    this.state = {
      bar1: 0,
      bar2: 0,
      bar3: 0,
    };
  }

  handleChangeBar1 = () => {
    const { fullSalary, discountINSS } = this.props;

    const bar1 = [(discountINSS * 100) / fullSalary];

    this.setState({ bar1 });
  };

  handleChangeBar2 = () => {
    const { fullSalary, discountIRPF } = this.props;

    const bar2 = [(discountIRPF * 100) / fullSalary];

    this.setState({ bar2 });
  };

  handleChangeBar3 = () => {
    const { fullSalary, netSalary } = this.props;

    const bar3 = [(netSalary * 100) / fullSalary];

    this.setState({ bar3 });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleChangeBar1();
      this.handleChangeBar2();
      this.handleChangeBar3();
    }
  }

  render() {
    const { bar1, bar2, bar3 } = this.state;
    // const { fullSalary, discountINSS, discountIRPF, netSalary } = this.props;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bar value={bar1} color="#e67e22" />
          <Bar value={bar2} color="#c0392b" />
          <Bar value={bar3} color="#16a085" />
        </div>
      </div>
    );
  }
}
