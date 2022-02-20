const conf = {
  formSelector: '.popup__container-info',
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__container-info-button',
  inputErrorClass: 'popup__container-input_type_error',
  errorClass: 'popup__container-input-error_active',
}

const popupAddCardbutton = document.querySelector('.profile__add-button');
const buttonAddCard = document.querySelector('.popup__container-addcard-button');

// функция блокировки кнопки открытия попапа
function disableBatton (btn) {
  btn.setAttribute('disabled', true);
  };

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
  inputArray.forEach((inputItem) => {
    inputItem.addEventListener('input', (event) => {
      // event.preventDefault();
      isValid(conf, formItem, inputItem);
      toggleButton (inputArray, button);
    });
  });
}

function isValid(conf, formItem, inputItem) {
  if (!inputItem.validity.valid) {
        showInputError(conf, formItem, inputItem, inputItem.validationMessage);
      } else{
        hideInputError(conf, formItem, inputItem);
      }
}

// функция, добавляющая класс с ошибкой
function showInputError (conf, formItem, inputItem, errorMessage) {
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(conf.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(conf.errorClass);
}

// функция, удаляющая класс с ошибкой
function hideInputError (conf, formItem, inputItem) {
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
  return InputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
}

// слушатель кнопки открытия попапа добавления карточек
popupAddCardbutton.addEventListener('click', () => disableBatton(buttonAddCard));

enableValidation(conf);









