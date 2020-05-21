'use strict';

let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  console.log('Olá, a página foi totalmente carregada!');
  preventFunctionSubmit();
  //
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
});

const preventFunctionSubmit = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  //
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
};

function activateInput() {
  const insertName = (newName) => {
    globalNames = [...globalNames, newName];
    // globalNames.push(newName);
  };

  const updateName = (newName) => {
    globalNames[currentIndex] = newName;
  };

  const handleTyping = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  };

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  const createDeleteButton = (index) => {
    function deleteName() {
      // globalNames.splice(index, 1);
      //
      // globalNames = globalNames.filter((name, i) => {
      //   if (i === index) {
      //     return false;
      //   }
      //   return true;
      // });
      // globalNames = globalNames.filter((name, i) => {
      // return i != index;
      // });

      globalNames = globalNames.filter((_, i) => i != index);

      render();
    }
    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);

    return button;
  };
  // function createDeleteButton(index) {}

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;

      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  // criar ul
  // fazer (n) li's, conforme tamanho de globalNames
  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
