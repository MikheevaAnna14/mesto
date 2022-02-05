const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const formElement = document.querySelector('.popup__container-info-button');
const nameInput = document.querySelector('.popup__container-input_type_name');
const jobInput = document.querySelector('.popup__container-input_type_occupation');
const nameUser = document.querySelector('.profile__info-name');  
const occupationUser = document.querySelector('.profile__info-occupation');
const popupAddCard = document.querySelector('#popup-addcard');
const popupAddCardOpenButton = document.querySelector('#button-addcard');
const popupAddCardCloseButton = document.querySelector('#popup-addcard-closebutton');
const popupAddCardContainer = document.querySelector('#popupAddCardContainer');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const titleInput = document.querySelector('#popup-title');
const linkInput = document.querySelector('#popup-link');
const photoPopup = document.querySelector('#popup-photo');
const photoPopupContainer = document.querySelector('#popap-photocontainer');
const photoPopupCloseButton = document.querySelector('#photopopup-closebutton');
const popupFigcaption = document.querySelector('#popup__figcaption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = nameUser.textContent;
  jobInput.value = occupationUser.textContent;
}

function closePopup(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  nameUser.textContent = nameInput.value;
  occupationUser.textContent = jobInput.value;
  closePopup(evt);
}

function openPopupAddCard (event) {
  event.preventDefault();
  popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard(event) {
  event.preventDefault();
  popupAddCard.classList.remove('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
}

function createCard(link, alt, title) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.element__mask').src = link;
  newCard.querySelector('.element__mask').alt = alt;
  newCard.querySelector('.element__title').textContent = title;
  newCard.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newCard.querySelector('.element__mask').addEventListener('click', openPhotoPopup);
  return newCard
}

initialCards.forEach(function(item) {
  const newCard = createCard(item.link, item.name, item.name)
  cards.appendChild(newCard);
});

function addNewCard(evt) {
  // evt.preventDefault();
  const newCard = createCard(linkInput.value, titleInput.value, titleInput.value);
  cards.prepend(newCard);
  closePopupAddCard(evt);
}

function deleteCard(event) {
  event.target.closest('.element').remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like_active');
}

function openPhotoPopup(event) {
  photoPopup.classList.add('popup_opened');
  photoPopup.querySelector('.popup__picture').src = event.target.src;
  photoPopup.querySelector('.popup__picture').alt = event.target.alt;
  photoPopup.querySelector('.popup__figcaption').textContent = event.target.alt;
}

function closePhotoPopup() {
  photoPopup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
popupAddCardOpenButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardContainer.addEventListener('submit', addNewCard);
photoPopupCloseButton.addEventListener('click', closePhotoPopup);

  
// popup.addEventListener('click', function(event) {
//   if (!event.defaultPrevented) {
//     closePopup();
//   }
// });
