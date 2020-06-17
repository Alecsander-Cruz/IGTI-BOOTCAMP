import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filter: '',
      filteredCountries: [],
      filteredPopulation: 0,
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({ name, flag, numericCode, population }) => {
      return {
        id: numericCode,
        name,
        flag,
        population,
        loweredName: name.toLowerCase(),
      };
    });

    const filteredPopulation = this.calculateTotalPopulation(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulation = (countries) => {
    const filteredPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return filteredPopulation;
  };

  handleChangeFilter = (newText) => {
    this.setState({ filter: newText });

    const filteredLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.loweredName.includes(filteredLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulation(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    const { filter, filteredCountries, filteredPopulation } = this.state;
    return (
      <div className="container">
        <h1 className="center">React Países</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          populationCount={filteredPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
