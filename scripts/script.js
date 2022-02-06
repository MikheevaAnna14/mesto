const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container-info');
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

function openPopups(elem) {
  elem.classList.add('popup_opened');
}

// заполняем поля попапа текущими данными пользователя
function fillPopupProfile() {
  openPopups(popup);
  nameInput.value = nameUser.textContent;
  jobInput.value = occupationUser.textContent;
}

function closePopups(elem) {
  elem.classList.remove('popup_opened');
}

// сохраняем данные, внесенные в поля формы
function savePopupProtile(event) {
  event.preventDefault();
  nameUser.textContent = nameInput.value;
  occupationUser.textContent = jobInput.value;
  closePopups(popup);
}

// очищаем форму добавления карточек перед закрытием попапа
function clearPopupAddCard() {
  titleInput.value = '';
  linkInput.value = '';
  closePopups(popupAddCard);
}

function createCard(link, alt, title) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.element__mask');
  cardImage.src = link;
  cardImage.alt = alt;
  newCard.querySelector('.element__title').textContent = title;
  newCard.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => handlePhotoPopup(link, alt, title));
  return newCard
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = createCard(linkInput.value, titleInput.value, titleInput.value);
  cards.prepend(newCard);
  clearPopupAddCard();
}

function deleteCard(event) {
  event.target.closest('.element').remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like_active');
}

function handlePhotoPopup(link, alt, title) {
  const photoPopupPicture = photoPopup.querySelector('.popup__picture');
  photoPopupPicture.src = link;
  photoPopupPicture.alt = alt;
  photoPopup.querySelector('.popup__figcaption').textContent = title;
  openPopups(photoPopup);
}

popupOpenButton.addEventListener('click', fillPopupProfile);
popupCloseButton.addEventListener('click', () => closePopups(popup));
popupContainer.addEventListener('submit', savePopupProtile);
popupAddCardOpenButton.addEventListener('click', () => openPopups(popupAddCard));
popupAddCardCloseButton.addEventListener('click', clearPopupAddCard);
popupAddCardContainer.addEventListener('submit', addNewCard);
photoPopupCloseButton.addEventListener('click', () => closePopups(photoPopup));

initialCards.forEach(function(item) {
  const newCard = createCard(item.link, item.name, item.name)
  cards.appendChild(newCard);
});
  



// popup.addEventListener('click', function(event) {
//   if (!event.defaultPrevented) {
//     closePopup();
//   }
// });