'use strict';

let tabSearched = null;
let tabSummary = null;

let allPeople = [];
let searchedPeople = [];

let searchInput = null;
let searchedInput = '';

window.addEventListener('load', () => {
  tabSearched = document.querySelector('#tabSearched');
  tabSummary = document.querySelector('#tabSummary');
  let form = document.querySelector('form');

  form.addEventListener('submit', preventSubmit);

  fetchAPI();
  activeInput();
});

async function fetchAPI() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await res.json();

  allPeople = json.results.map((person) => {
    const { name, gender, dob, picture } = person;

    return {
      name: name.first + ' ' + name.last,
      gender,
      age: dob.age,
      picture: picture.thumbnail,
    };
  });
  console.log(allPeople);
}

function activeInput() {
  searchInput = document.querySelector('#searchInput');
  searchInput.focus();

  const handleTyping = (event) => {
    const button = document.querySelector('#search-button');

    if (event.key !== '' && event.target.value.trim() !== '') {
      button.disabled = false;
      searchedInput = event.target.value;

      if (event.key === 'Enter' /*&& event.target.value.trim() !== ''*/) {
        searchedPeople = allPeople.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        });

        render();
        clearInput();
        button.disabled = true;
      }
    } else {
      button.disabled = true;
    }
  };

  searchInput.addEventListener('keyup', handleTyping);
}

function render() {
  renderSearched();
  renderSummary();
  console.log(searchedPeople);
}

function renderSearched() {
  let hList = document.querySelector('#h-list');

  if (searchedPeople.length === 0) {
    tabSearched.innerHTML = '';
    hList.textContent = `Nenhum usuário encontrado com o filtro '${searchedInput}'`;
    return;
  }

  hList.textContent = `${searchedPeople.length} usuário(s) encontrado(s) com o filtro '${searchedInput}'`;

  let searchedPeopleHTML = '<div>';

  searchedPeople.forEach((person) => {
    const { name, gender, age, picture } = person;
    let searchedPersonHTML = `
      <div class="data">
        <div>
          <img src="${picture}">
        </div>
        <div>
          <span>${name},</span>
        </div>
        <div id="age">
          <span> ${age} anos</span>
        </div>
      </div>
    `;
    searchedPeopleHTML += searchedPersonHTML;
  });

  searchedPeopleHTML += '</div>';
  tabSearched.innerHTML = searchedPeopleHTML;
}

function renderSummary() {
  let hSummary = document.querySelector('#h-summary');

  if (searchedPeople.length === 0) {
    tabSummary.innerHTML = '';
    hSummary.textContent = `Nada a ser exibido`;
    return;
  }

  hSummary.textContent = `Estatísticas`;

  let countFemale = 0;
  let countMale = 0;

  const totalAge = searchedPeople.reduce((accumulator, current) => {
    if (current.gender === 'female') {
      countFemale++;
    }
    if (current.gender === 'male') {
      countMale++;
    }
    return accumulator + current.age;
  }, 0);

  const avgAge = totalAge / searchedPeople.length;

  tabSummary.innerHTML = `
    <div>
      <div>
        <ul>
          <li>Sexo masculino: ${countMale}</li>
          <li>Sexo feminino: ${countFemale}</li>
          <li>Soma das idades: ${totalAge}</li>
          <li>Média das idades: ${avgAge}</li>
        </ul>
      </div>  
    </div>  
  `;
}

function preventSubmit() {
  event.preventDefault();
}

function clearInput() {
  searchInput.value = '';
  searchInput.focus();
}

// function totalAge() {
//   const totalAge = searchedPeople.reduce(
//     (accumulator, current) => accumulator + current.age,
//     0
//   );
//   return totalAge;
// }

// function avgAge() {
//   const avgAge = totalAge() / searchedPeople.length;
//   return avgAge;
// }
