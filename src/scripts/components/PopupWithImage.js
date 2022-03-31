import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(link, name) {
    const image = this._popup.querySelector('.popup__picture');
    const caption = this._popup.querySelector('.popup__figcaption');

    image.src = link;
    caption.alt = name;
    caption.textContent = name;

    super.open();
  }

}