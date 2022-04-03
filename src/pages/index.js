import { initialCards } from "../scripts/initialCards.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator} from "../scripts/components/FormValidator.js";
import { Section  } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

import '../pages/index.css';

const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupForm = document.querySelector('#popupProfileForm');
const nameInput = document.querySelector('.popup__container-input_type_name');
const jobInput = document.querySelector('.popup__container-input_type_occupation');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardForm = document.querySelector('#popupAddCardForm');

const conf = {
    formSelector: '.popup__container-info',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-info-button',
    inputErrorClass: 'popup__container-input_type_error',
    errorClass: 'popup__container-input-error_active',
  }

const popupProfileFormValidation = new FormValidator (conf, popupForm);
const popupAddCardFormValidation = new FormValidator (conf, popupAddCardForm);
const section = new Section({ items: initialCards, renderer: embedCard }, '.elements');
const imagePopup = new PopupWithImage('#popup-photo');
const profilePopup = new PopupWithForm('#popup-profile', savePopupProtile);
const cardAddPopup = new PopupWithForm('#popup-addcard', addNewCard);
const userInfo = new UserInfo({ profileNameSelector: '.profile__info-name', 
  profileOccupationSelector: '.profile__info-occupation' });

popupProfileFormValidation.enableValidation();
popupAddCardFormValidation.enableValidation();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardAddPopup.setEventListeners();

// заполняем поля попапа текущими данными пользователя
function fillPopupProfile() {
  popupProfileFormValidation.resetErrors();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.occupation;
  profilePopup.open();
}

// сохраняем данные, внесенные в поля формы
function savePopupProtile(item) {
  const { name, occupation } = item
  userInfo.setUserInfo(name, occupation)
  profilePopup.close();
}

function handlePhotoPopup(link, name) {
  imagePopup.open(link, name);
}

// функция добавления готовой карточки в DOM 
function embedCard(item) {
  // если вместо this использовать section.addItem как в addNewCard,
  // то в при создании section появляется циклическая зависимость
  this.addItem(generateCard(item));  
}

// возвращаем готовую карточку
function generateCard(item) {
  return new Card(item, '#element-template', () => handlePhotoPopup(item.link, item.name)).createCard(); 
}

// функция добавления новых карточек
function addNewCard(item) {  
  const newItem = {
    link: item.link,
    name: item['title']
  };
  section.addItem(generateCard(newItem));
  cardAddPopup.close();
}

popupOpenButton.addEventListener('click', fillPopupProfile);

popupAddCardOpenButton.addEventListener('click', () => {
  popupAddCardFormValidation.resetErrors();  
  popupAddCardFormValidation.disableBatton(); 
  cardAddPopup.open();
});