export class Card {
  constructor (item, cardTemplateSelector, handleCardClick, handleCardDelete, handleLikeClick, userId) {  
    this._link = item.link;
    this._alt = item.name;
    this._name = item.name;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._cardId = item._id;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  countLikes(newLikes) {
    this._likes = newLikes;
    const counterLikes = this._element.querySelector('.element__like-counter');
    counterLikes.textContent = this._likes.length;

    if(this.isLiked()) {   
      this._element.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => this._handleCardDelete(this._cardId));
    this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  _deleteButtotIcon() {
    if(this._ownerId !== this._userId) {
      this._buttonDelete.style.display = 'none';
    }
  }

  createCard() {
    this._element = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._buttonDelete = this._element.querySelector('.element__button-delete');
    this._cardImage = this._element.querySelector('.element__mask');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    this.countLikes(this._likes);
    this._deleteButtotIcon();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}