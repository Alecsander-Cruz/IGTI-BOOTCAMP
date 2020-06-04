const fs = require('fs').promises;

let jsonStates = [];
let jsonCities = [];
let cityCount = [];
let allStatesCities = [];
let globalLargestCityName = [];
let globalSmallestCityName = [];

getStatesandCities();
// getStatebyUF();

async function getStatesandCities() {
  try {
    const respStates = await fs.readFile('./Estados.json');
    jsonStates = JSON.parse(respStates);

    const respCities = await fs.readFile('./Cidades.json');
    jsonCities = JSON.parse(respCities);

    jsonStates.forEach(async (state, index) => {
      let states = [];
      let cityCounter = 0;
      jsonCities.forEach(async (city) => {
        if (state.ID === city.Estado) {
          cityCounter++;
          states.push(city.Nome);
        }
      });
      // await fs.writeFile(
      //   `./States_JSON/${state.Sigla}.json`,
      //   JSON.stringify(states)
      // );
      cityCount.push({ UF: state.Sigla, Cidades: cityCounter });

      //prettier-ignore
      allStatesCities = [...allStatesCities,{ State: state.Nome, UF: state.Sigla, Cities: states },];
    });
    getCitiesWithLargestName();
    getCitiesWithSmallestName();
    getLargestCityNameOfAll();
    getSmallestCityNameOfAll();
    getStatesWithMoreCities();
    getStatesWithLessCities();
    // console.log(allStatesCities);
  } catch (err) {
    console.log(err);
  }
}

function getCitiesWithLargestName() {
  console.log('\nLista das cidades com o maior nome de cada estado');
  console.log('-------------------------------------------------');
  allStatesCities.forEach((state) => {
    state.Cities.sort((a, b) => {
      return a.localeCompare(b);
    });
    state.Cities.sort((a, b) => {
      return b.length - a.length;
    });
    globalLargestCityName.push({
      State: state.State,
      UF: state.UF,
      LargestCity: state.Cities[0],
    });
    // console.log(`${state.Cities[0]} - ${state.UF}`);
  });

  globalLargestCityName.sort((a, b) => {
    return a.LargestCity.localeCompare(b.LargestCity);
  });
  globalLargestCityName.sort((a, b) => {
    return b.LargestCity.length - a.LargestCity.length;
  });
  globalLargestCityName.forEach((state) => {
    console.log(`${state.LargestCity} - ${state.UF}`);
  });
  console.log('-------------------------------------------------\n');
}

function getCitiesWithSmallestName() {
  console.log('\nLista das cidades com o menor nome de cada estado');
  console.log('-------------------------------------------------');
  allStatesCities.forEach((state) => {
    state.Cities.sort((a, b) => {
      return a.localeCompare(b);
    });
    state.Cities.sort((a, b) => {
      return a.length - b.length;
    });
    // console.log(`${state.Cities[0]} - ${state.UF}`);
    globalSmallestCityName.push({
      State: state.State,
      UF: state.UF,
      SmallestCity: state.Cities[0],
    });
  });

  globalSmallestCityName.sort((a, b) => {
    return a.SmallestCity.localeCompare(b.SmallestCity);
  });
  globalSmallestCityName.sort((a, b) => {
    return a.SmallestCity.length - b.SmallestCity.length;
  });
  globalSmallestCityName.forEach((state) => {
    console.log(`${state.SmallestCity} - ${state.UF}`);
  });
  console.log('-------------------------------------------------\n');
}

function getLargestCityNameOfAll() {
  let largestCityNameOfAll = globalLargestCityName[0].LargestCity;
  console.log(
    '---------------------------------------------------------------------------------------'
  );
  console.log(
    `A cidade que possui o maior nome de todo o Brasil é "${largestCityNameOfAll}"`
  );
  console.log(
    '---------------------------------------------------------------------------------------'
  );
}

function getSmallestCityNameOfAll() {
  let smallestCityNameOfAll = globalSmallestCityName[0].SmallestCity;
  console.log('----------------------------------------------------------');
  console.log(
    `A cidade que possui o menor nome de todo o Brasil é "${smallestCityNameOfAll}"`
  );
  console.log('----------------------------------------------------------');
}

function getStatesWithLessCities() {
  let lessCities = [];
  let array = [];
  cityCount.sort((a, b) => {
    return a.Cidades - b.Cidades;
  });
  for (let i = 0; i < 5; i++) {
    lessCities.push(cityCount[i]);
  }
  lessCities.sort((a, b) => {
    return b.Cidades - a.Cidades;
  });
  console.log('\n------------------------');
  console.log('Estados com menos cidades');
  console.log('------------------------');
  lessCities.forEach((city) => {
    array.push(`${city.UF} - ${city.Cidades}`);
  });
  console.log(array);
  // console.log(lessCities);
  console.log('------------------------\n');
}

function getStatesWithMoreCities() {
  let array = [];
  cityCount.sort((a, b) => {
    return b.Cidades - a.Cidades;
  });
  console.log('\n------------------------');
  console.log('Estados com mais cidades');
  console.log('------------------------');
  for (let i = 0; i < 5; i++) {
    array.push(`${cityCount[i].UF} - ${cityCount[i].Cidades}`);
  }
  console.log(array);
  console.log('------------------------\n');

  // console.log(cityCount);
}

async function getStatebyUF() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log('\n--------------------------');
  readline.question('Digite a UF (sigla) de algum estado -> ', async (uf) => {
    try {
      const respUF = await fs.readFile(`./States_JSON/${uf}.json`);
      let objectUF = JSON.parse(respUF);

      jsonStates.forEach(async (state) => {
        if (uf.toLowerCase() === state.Sigla.toLowerCase()) {
          if (objectUF.length === 1) {
            console.log(
              `\nO estado ${state.Nome} possui ${objectUF.length} cidade`
            );
            console.log('--------------------------\n');
          } else {
            console.log(
              `\nO estado ${state.Nome} possui ${objectUF.length} cidades`
            );
            console.log('--------------------------\n');
          }
        }
      });
      readline.close();
    } catch (err) {
      console.log('--------------------------\n');
      console.log('Você digitou uma UF não válida!\n');
      console.log('--------------------------\n');
      console.log(err + '\n');
      console.log('--------------------------\n');
      readline.close();
    }
  });
}

// Vila Bela da Santíssima Trindade
// São Francisco de Assis do Piauí
// São Sebastião da Vargem Alegre
// São Sebastião de Lagoa de Roça
// São José do Vale do Rio Preto
// Santa Terezinha do Progresso
// Santa Terezinha do Tocantins
// São Luís Gonzaga do Maranhão
// Livramento de Nossa Senhora
// Santa Cruz de Monte Castelo
// Santo Antônio do Descoberto
// Almirante Tamandaré do Sul
// Euclides da Cunha Paulista
// Governador Dix-Sept Rosado
// São Sebastião da Boa Vista
// Deputado Irapuan Pinheiro
// Governador Jorge Teixeira
// Santa Cruz da Baixa Verde
// Santa Isabel do Rio Negro
// Canindé de São Francisco
// Rio Verde de Mato Grosso
// Cachoeiro de Itapemirim
// Pedra Branca do Amaparí
// São Miguel dos Milagres
// Marechal Thaumaturgo
// São João da Baliza
// Brasília

// Açu..
// Exu..
// Icó..
// Ipê..
// Itá..
// Itu..
// Luz..
// Una..
// Afuá..
// Apuí..
// Caçu..
// Codó..
// Emas..
// Íuna..
// Ivaí..
// Jaru..
// Juti..
// Magé..
// Pium..
// Vera..
// Acauã..
// Amapá..
// Arauá..
// Belém..
// Cantá..
// Feijó..
// Brasília..
