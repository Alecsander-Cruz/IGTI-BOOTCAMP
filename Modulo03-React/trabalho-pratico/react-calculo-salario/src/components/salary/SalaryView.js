import React, { Component } from 'react';
import { calculateSalaryFrom } from './salary.js';
import { formatNumber } from '../../helpers/formatHelpers.js';
import BarShower from '../bar/ProgressBarSalary.js';
import css from './salary.module.css';

export default class SalaryView extends Component {
  constructor() {
    super();

    this.state = {
      baseINSS: '',
      discountINSS: '',
      baseIRPF: '',
      discountIRPF: '',
      netSalary: '',
    };
  }

  handleInput = (event) => {
    const newSalary = event.target.value;
    this.props.onChange(newSalary);

    const calculatedSalary = calculateSalaryFrom(newSalary);

    this.setState({
      baseINSS: calculatedSalary.baseINSS,
      discountINSS: calculatedSalary.discountINSS,
      baseIRPF: calculatedSalary.baseIRPF,
      discountIRPF: calculatedSalary.discountIRPF,
      netSalary: calculatedSalary.netSalary,
    });
  };

  showPercentage = (value1, value2) => {
    let result = 0;
    if (value1 === '') {
      return result;
    }

    result = value2 * 100;
    result = result / value1;
    result = +result.toFixed(2);
    return result;
  };

  render() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = this.state;

    const { fullSalary } = this.props;

    return (
      <div className="row">
        <div className="col s12">
          <div className={css.flexColumn}>
            <span className={css.lightGray}>Salário bruto:</span>
            <input
              type="number"
              placeholder={'Insira o valor'}
              onChange={this.handleInput}
              value={fullSalary}
            />
          </div>

          <div className="col s12">
            <span className="col s3">
              Base INSS:
              <input
                className={css.bold}
                type="text"
                readOnly
                value={formatNumber(baseINSS)}
              />
            </span>

            <span className="col s3">
              Desconto INSS:
              <input
                className={css.discountINSS}
                type="text"
                readOnly
                value={`${formatNumber(discountINSS)} (${this.showPercentage(
                  fullSalary,
                  discountINSS
                )}%) `}
              />
            </span>

            <span className="col s3">
              Base IRPF:
              <input
                className={css.bold}
                type="text"
                readOnly
                value={formatNumber(baseIRPF)}
              />
            </span>

            <span className="col s3">
              Desconto IRPF:
              <input
                className={css.discountIRPF}
                type="text"
                readOnly
                value={`${formatNumber(discountIRPF)} (${this.showPercentage(
                  fullSalary,
                  discountIRPF
                )}%)`}
              />
            </span>
          </div>

          <div className="col s12">
            <div className={`${css.flexColumn} col s3`}>
              <span>Salário líquido:</span>
              <input
                className={css.netSalary}
                type="text"
                readOnly
                value={`${formatNumber(netSalary)} (${this.showPercentage(
                  fullSalary,
                  netSalary
                )}%)`}
              />
            </div>
          </div>

          <div className="col s12">
            <BarShower
              fullSalary={fullSalary}
              discountINSS={discountINSS}
              discountIRPF={discountIRPF}
              netSalary={netSalary}
            />
          </div>
        </div>
      </div>
    );
  }
}
