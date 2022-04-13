export class FormValidator {
  constructor (settings, form) {
    this._form = form;
    this._settings = settings;
  }

  _showInputError (inputItem, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  
  _hideInputError (inputItem) {
    const errorElement = this._form.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputItem) {
    if (!inputItem.validity.valid) {
          this._showInputError(inputItem, inputItem.validationMessage);
        } else{
          this._hideInputError(inputItem);
        }
  }

  _hasInvalidInput () {
    const inputList = Array.prototype.slice.call(this._inputArray);
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  disableBatton () {
    this._button.setAttribute('disabled', true);
    };

  _toggleButton () {
    if (this._hasInvalidInput()) {
      this.disableBatton();
    } else {
      this._button.removeAttribute('disabled');
    }
  }

  _setInputHandler () {
    // this._inputArray = this._form.querySelectorAll(this._settings.inputSelector);
    this._inputArray = this._form.querySelectorAll(this._settings.inputSelector);  //////  Array.from???
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButton();
    this._inputArray.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem);
        this._toggleButton ();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setInputHandler();
  }

  resetErrors() {
    this._form.reset();
    this._inputArray.forEach((inputItem) => {
      this._hideInputError(inputItem);
      });
  }

}

