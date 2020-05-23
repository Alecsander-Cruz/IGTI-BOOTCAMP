'use strict';

window.addEventListener('load', () => {
  // divisionPromise(12, 0)
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log('Falha na divisão ' + error);
  //   });

  doFetch();
  doFetchAsync();

  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}
function showData2(data) {
  const user = document.querySelector('#user2');
  user.textContent = data.login + ' ' + data.name;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por zero!');
    }
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 6)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log('Falha na divisão ' + error);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/alecsander-cruz');
  const json = await res.json();
  showData2(json);
}

function doFetch() {
  const AC = fetch('https://api.github.com/users/alecsander-cruz')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('erro na requisição' + '    ' + error);
    });
}
