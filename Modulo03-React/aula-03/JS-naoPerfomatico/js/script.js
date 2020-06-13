const clickArray = [];

window.addEventListener('load', () => {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
  clickArray.push(getNewTimeStamp());

  render();
}

function render() {
  const ul = document.querySelector('#data');

  ul.innerHTML = '';
  let LI = '';
  clickArray.map((item) => {
    LI += `<li>${item}</li>`;
  });

  ul.innerHTML = LI;
}
