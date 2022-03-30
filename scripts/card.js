export class Card {
  constructor (item, cardTemplateSelector, handleCardClick) {  
    this._link = item.link;
    this._alt = item.name;
    this._name = item.name;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _deleteCard = (event) => {
    event.target.closest('.element').remove();
  }

  _likeCard = (event) => {
    event.target.classList.toggle('element__like_active');
  }

  _setEventListeners () {
    this._newCard.querySelector('.element__button-delete').addEventListener('click', this._deleteCard);
    this._newCard.querySelector('.element__like').addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  createCard () {
    this._newCard = this._cardTemplate.cloneNode(true);
    this._cardImage = this._newCard.querySelector('.element__mask');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._newCard.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._newCard;
  }
  
}