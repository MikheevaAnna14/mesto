export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);      
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);   
  }

  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }

  setButtonText(text1, text2, isLoading) {
    this._buttonText = this._popup.querySelector('form').querySelector('.popup__container-info-button');
    if (isLoading) {
      this._buttonText.textContent = text1;
    } else {
      this._buttonText.textContent = text2;
    }
  }


}
