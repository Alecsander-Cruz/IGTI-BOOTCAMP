window.addEventListener('load', start);

// global variables

var red = null;
var redValue = null;

var green = null;
var greenValue = null;

var blue = null;
var blueValue = null;

// functions

function start() {
  console.log('Olá, a página foi totalmente carregada!');
  red = document.querySelector('#redColor');
  redValue = document.querySelector('#redValue');

  green = document.querySelector('#greenColor');
  greenValue = document.querySelector('#greenValue');

  blue = document.querySelector('#blueColor');
  blueValue = document.querySelector('#blueValue');

  var form = document.querySelector('form');

  form.addEventListener('input', changeBackgroundColor);
}

function changeBackgroundColor(event) {
  var div = document.querySelector('#boxColor');
  var value = event.target.value;
  var id = event.target.id;

  switch (id) {
    case 'redColor':
      div.style.backgroundColor = `rgb(${value}, ${green.value}, ${blue.value})`;
      redValue.value = value;
      break;
    case 'greenColor':
      div.style.backgroundColor = `rgb(${red.value}, ${value}, ${blue.value})`;
      greenValue.value = value;
      break;
    case 'blueColor':
      div.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${value})`;
      blueValue.value = value;
      break;
    default:
      break;
  }
}
