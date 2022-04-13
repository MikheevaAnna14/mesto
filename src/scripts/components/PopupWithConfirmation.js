import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) { 
    super(popupSelector);
    this._form = this._popup.querySelector('#popupDelete');
  }

  handleSubmitDelete(handler) {
    this._handleSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    })
    
  };

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

}