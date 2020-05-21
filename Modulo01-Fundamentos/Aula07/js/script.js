console.log('oi');

var data = Array.from(document.querySelectorAll('.dados'));

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
