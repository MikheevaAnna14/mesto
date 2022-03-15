import { initialCards } from "./initialCards.js";
import { Card } from "./card.js";
import { FormValidator} from "./FormValidator.js";

const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('#popupProfileForm');
const nameInput = document.querySelector('.popup__container-input_type_name');
const jobInput = document.querySelector('.popup__container-input_type_occupation');
const nameUser = document.querySelector('.profile__info-name');  
const occupationUser = document.querySelector('.profile__info-occupation');
const popupAddCard = document.querySelector('#popup-addcard');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector('#popup-addcard-closebutton');
const popupAddCardForm = document.querySelector('#popupAddCardForm');
const cards = document.querySelector('.elements');
const titleInput = document.querySelector('#popup-title');
const linkInput = document.querySelector('#popup-link');
const photoPopup = document.querySelector('#popup-photo');
const photoPopupCloseButton = document.querySelector('#photopopup-closebutton');
const photoPopupPicture = document.querySelector('.popup__picture');
const photoPopupFigcaption = document.querySelector('.popup__figcaption');

const conf = {
    formSelector: '.popup__container-info',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-info-button',
    inputErrorClass: 'popup__container-input_type_error',
    errorClass: 'popup__container-input-error_active',
  }

const popupProfileFormValidation = new FormValidator (conf, popupForm);
const popupAddCardFormValidation = new FormValidator (conf, popupAddCardForm);

popupProfileFormValidation.enableValidation();
popupAddCardFormValidation.enableValidation();

function openPopups(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopup);
  }

// заполняем поля попапа текущими данными пользователя
function fillPopupProfile() {
  popupProfileFormValidation.resetErrors();
  nameInput.value = nameUser.textContent;
  jobInput.value = occupationUser.textContent;
  openPopups(popup);
}

function closePopups(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapePopup);
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
  popupAddCardForm.reset();
}

function handlePhotoPopup(link, name) {
  photoPopupPicture.src = link;
  photoPopupPicture.alt = name;
  photoPopupFigcaption.textContent = name;
  openPopups(photoPopup);
}

// возвращаем готовую карточку
function generateCard(item) {
    return new Card(item, '#element-template', () => handlePhotoPopup(item.link, item.name)).createCard(); 
  }

// функция добавления готовой карточки в DOM
function embedCard(item) {                    
  cards.prepend(generateCard(item));
}

// добавляем карточки из массива
function renderCards() {
  initialCards.forEach(embedCard);
}

// функция добавления новых карточек
function addNewCard() {          
  const newItem = {
    link: linkInput.value,
    name: titleInput.value,
  };
  embedCard(newItem);
  clearPopupAddCard();
  closePopups(popupAddCard);
}

function closeOverlay (event) {
  if (event.target.classList.contains('popup__overlay')) {
    closePopups(event.currentTarget);
  }
}

function escapePopup (event) {
  if(event.key === 'Escape') {
    const elem = document.querySelector('.popup_opened');
    closePopups(elem);
  }
}

popupOpenButton.addEventListener('click', fillPopupProfile);
popupCloseButton.addEventListener('click', () => closePopups(popup));
popupAddCardOpenButton.addEventListener('click', () => {
  popupAddCardFormValidation.resetErrors();
  popupAddCardFormValidation.disableBatton(); 
  openPopups(popupAddCard);
});
popupAddCardCloseButton.addEventListener('click', () => closePopups(popupAddCard));
photoPopupCloseButton.addEventListener('click', () => closePopups(photoPopup));
popupForm.addEventListener('submit', savePopupProtile); 
popupAddCardForm.addEventListener('submit', addNewCard);
popup.addEventListener('click', (event) => closeOverlay(event));
popupAddCard.addEventListener('click', (event) => closeOverlay(event));
photoPopup.addEventListener('click', (event) => closeOverlay(event));

renderCards();


