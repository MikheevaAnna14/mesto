const conf = {
  formSelector: '.popup__container-info',
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__container-info-button',
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__container-input_type_error',
  errorClass: 'popup__container-input-error_active'
}

// функция, которая принимает массив форм 
function enableValidation (conf) {
  const formArray = document.querySelectorAll(conf.formSelector);
  formArray.forEach((formItem) => {
    formItem.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setInputHandler(conf, formItem);
  });
}

// функция, которая принимает форму, создает массив инпутов и перебирает их
function setInputHandler (conf, formItem) {
  const inputArray = formItem.querySelectorAll(conf.inputSelector);
  const button = formItem.querySelector(conf.submitButtonSelector);
  toggleButton (inputArray, button);
  // button.setAttribute('disabled', true);
  inputArray.forEach((inputItem) => {
    inputItem.addEventListener('input', (event) => {
      // event.preventDefault();
      isValid(conf, formItem, inputItem);
      toggleButton (inputArray, button);
    });
  });
}

function isValid(conf, formItem, inputItem) {
  console.log(inputItem);
  if (!inputItem.validity.valid) {
        showInputError(conf, formItem, inputItem, inputItem.validationMessage);
      } else{
        hideInputError(conf, formItem, inputItem);
      }
}

// функция, добавляющая класс с ошибкой
function showInputError (conf, formItem, inputItem, errorMessage) {
  console.log('Ошибка')
  // const secondClass = inputItem.className.split(' ')[1];
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(conf.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(conf.errorClass);
}

// функция, удаляющая класс с ошибкой
function hideInputError (conf, formItem, inputItem) {
  console.log(`.${inputItem.id}-error`)
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(conf.inputErrorClass);
  errorElement.classList.remove(conf.errorClass);
  errorElement.textContent = '';
}

// функция, изменяющая состояние кнопки
function toggleButton (inputArray, button) {
  if (hasInvalidInput(inputArray)) {
    button.setAttribute('disabled', true);
  } else {
    button.removeAttribute('disabled');
  }
}

function hasInvalidInput (inputArray) {
  InputList = Array.prototype.slice.call(inputArray);
  console.log(InputList);
  return InputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
}

enableValidation(conf);