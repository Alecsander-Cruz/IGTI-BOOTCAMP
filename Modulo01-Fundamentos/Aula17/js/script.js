'use strict';

let tabCountries = null;
let tabFavorites = null;
let numberFormat = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let totalPopulationList = 0;

let countFavorites = 0;
let totalPopulationFavorites = 0;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  // prettier-ignore
  totalPopulationFavorites = 
  document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  console.log(json);
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population,
      formatedPopulation: formatNumber(population),
      flag,
    };
  });
  console.log(allCountries);

  render();
}

function render() {
  renderCountyList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountyList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, population, formatedPopulation } = country;
    const countryHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class='waves-effect waves-light btn'>+</a>
      </div> 
      <div>
        <img src="${flag}" alt="${name}">
      </div> 
      <div>
        <ul>
          <li>${name}</li>
          <li>${formatedPopulation}</li>
        </ul>
      </div> 
    </div> 
    `;

    countriesHTML += countryHTML;
  });

  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoriteCountries.forEach((favorite) => {
    const { name, flag, id, population, formatedPopulation } = favorite;

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class='waves-effect waves-light btn purple darken-4'>-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formatedPopulation}</li>
          </ul>
        </div>
      </div>
    `;
    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += '</div>';

  tabFavorites.innerHTML = favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButttons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButttons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButttons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButttons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);

  favoriteCountries = [...favoriteCountries, countryToAdd];

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(
    (country) => country.id === id
  );

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
// restcountries.eu/rest/v2/all
