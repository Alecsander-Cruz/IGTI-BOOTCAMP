var a = 5;
var b = 6;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else if (a < b) {
  //if (a < b) {
  console.log(a + ' é menor que ' + b);
} else {
  console.log(a + ' é igual a ' + b);
}

var dia = 2;

switch (dia) {
  case 1:
    console.log('Domingo');
    break;
  case 2:
    console.log('Segunda');
    break;
  case 3:
    console.log('Terça');
    break;
  case 4:
    console.log('Quarta');
    break;
  case 5:
    console.log('Quinta');
    break;
  case 6:
    console.log('Sexta');
    break;
  case 7:
    console.log('Sábado');
    break;
  default:
    console.log('Dia inválido!');
    break;
}

var c = 6;
var d = 5;

var resposta = c > d ? 'maior' : c < d ? 'menor' : 'igual';

console.log(resposta);

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log('A soma é ' + somatorio);

somatorio = 0;
numeroAtual = 1;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);

console.log('A soma é ' + somatorio);

somatorio = 0;
for (numeroAtual = 0; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}

console.log('A soma é ' + somatorio);
