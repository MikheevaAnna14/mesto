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
        // const elem = document.querySelector('.popup_opened');
        // closePopups(elem);
        this.close()
      }
    }

    setEventListeners() {
      const closeButton = this._popup.querySelector('.popup__close');
      closeButton.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup__overlay')) {
          //closePopups(event.currentTarget);
          this.close();
        }
      });
    }
}