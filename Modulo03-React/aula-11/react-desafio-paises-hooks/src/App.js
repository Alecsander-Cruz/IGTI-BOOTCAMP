import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const allCountries = json.map(
        ({ name, flag, numericCode, population }) => {
          return {
            id: numericCode,
            name,
            flag,
            population,
            loweredName: name.toLowerCase(),
          };
        }
      );
      console.log(allCountries);

      const filteredPopulation = calculateTotalPopulation(allCountries);
      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilteredPopulation(filteredPopulation);
    };

    fetchCountries();
  }, []);

  const calculateTotalPopulation = (countries) => {
    const filteredPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return filteredPopulation;
  };

  const handleChangeFilter = (newText) => {
    setFilter(newText);

    const filteredLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter((country) => {
      return country.loweredName.includes(filteredLowerCase);
    });

    const filteredPopulation = calculateTotalPopulation(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  };

  return (
    <div className="container">
      <h1 className="center">React Países</h1>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        populationCount={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
