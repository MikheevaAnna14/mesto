import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__picture');
    this._caption = this._popup.querySelector('.popup__figcaption');
  }

  open(link, name) {
    this._image.src = link;
    this._caption.alt = name;
    this._caption.textContent = name;

    super.open();
  }

}