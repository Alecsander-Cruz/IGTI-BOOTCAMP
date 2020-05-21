'use strict';

window.addEventListener('load', () => {
  const timer = document.querySelector('#timer');
  let count = 0;
  let button = document.querySelector('#button');

  const interval = setInterval(() => {
    timer.textContent = ++count;

    // if (count === 10) {
    //   this.clearInterval(interval);
    //   return;
    // }

    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 500);
    }

    console.log(interval);
  }, 1000);

  button.addEventListener('click', () => {
    this.clearInterval(interval);
  });
});
