window.addEventListener('load', start);

// functions

function start() {
  console.log('oi');
  console.log('A página foi totalmente carregada!');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  console.log(event);
  var span = document.querySelector('#nameLength');
  span.textContent = event.target.value.length;
}

function preventSubmit() {
  event.preventDefault();
  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' cadastrado com sucesso!');
}
