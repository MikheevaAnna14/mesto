export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);      ///escapePopup
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);   ///escapePopup
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
}
