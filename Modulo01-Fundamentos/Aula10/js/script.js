'use strict';

// var x let;

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var ' + i);
  }

  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('let ' + i);
  }

  i = 20;
  console.log(i);
}

function withConst() {
  // não funciona, pois não se pode atribuir outros valores a uma constante
  for (const i = 0; i < 10; i++) {
    console.log('const ' + i);
  }
  i = 20;
  console.log(i);
}
// withVar();
// withLet();
// withConst();
const d = [];
for (let i = 0; i < 10; i++) {
  d.push(i);
}

function sum(a, b) {
  return a + b;
}

//function anonima
const sum2 = function (a, b) {
  return a + b;
};

const sum3 = (a, b) => {
  return a + b;
};

const sum4 = (a, b) => a + b;

// console.log(sum(2, 3));
// console.log(sum2(3, 6));
// console.log(sum3(5, 2));
// console.log(sum4(2, 1));

const name = 'Alecsander';
const surname = 'Cruz';
const text1 = 'Meu nome é ' + name + ' ' + surname;
const text2 = `Meu nome é ${name} ${surname}`;

// console.log(text1);
// console.log(text2);

const sum5 = (a = 3, b = 10) => a + b;

// apenas o segundo número pode ser vazio, nunca o primeiro número vai poder ser vazio
console.log(sum5());
