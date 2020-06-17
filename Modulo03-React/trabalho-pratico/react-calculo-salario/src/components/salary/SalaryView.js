import React, { Component } from 'react';
import { calculateSalaryFrom } from './salary.js';
import { formatNumber } from '../../helpers/formatHelpers.js';
import BarShower from '../bar/ProgressBarSalary.js';

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
      <div>
        <span>
          Salário bruto:
          <input
            type="number"
            placeholder={'Insira o valor'}
            onChange={this.handleInput}
            value={fullSalary}
          />
        </span>
        <div>
          <span>
            Base INSS:
            <input
              type="text"
              placeholder="R$ 0,00"
              readOnly
              value={formatNumber(baseINSS)}
            />
          </span>
          <span>
            Desconto INSS:
            <input
              type="text"
              placeholder="R$ 0,00"
              readOnly
              value={formatNumber(discountINSS)}
            />
          </span>
          <span>
            Base IRPF:
            <input
              type="text"
              placeholder="R$ 0,00"
              readOnly
              value={formatNumber(baseIRPF)}
            />
          </span>
          <span>
            Desconto IRPF:
            <input
              type="text"
              placeholder="R$ 0,00"
              readOnly
              value={formatNumber(discountIRPF)}
            />
          </span>
        </div>
        <span>
          Salário líquido:
          <input
            type="text"
            placeholder="R$ 0,00"
            readOnly
            value={formatNumber(netSalary)}
          />
        </span>
        <BarShower
          fullSalary={fullSalary}
          discountINSS={discountINSS}
          discountIRPF={discountIRPF}
          netSalary={netSalary}
        />
      </div>
    );
  }
}
