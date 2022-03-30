import { initialCards } from "./initialCards.js";
import { Card } from "./card.js";
import { FormValidator} from "./FormValidator.js";
import { Section  } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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
const section = new Section({ items: initialCards, renderer: generateCard }, '.elements');
const imagePopup = new PopupWithImage('#popup-photo');
const profilePopup = new PopupWithForm('#popup-profile', savePopupProtile);
const addCardPopup = new PopupWithForm('#popup-addcard', addNewCard);
const userInfo = new UserInfo({ profileNameSelector: '.profile__info-name', 
  profileOccupationSelector: '.profile__info-occupation' });

popupProfileFormValidation.enableValidation();
popupAddCardFormValidation.enableValidation();
section.renderItems();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// заполняем поля попапа текущими данными пользователя
function fillPopupProfile() {
  popupProfileFormValidation.resetErrors();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().occupation;
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
  addCardPopup.close();
}

popupOpenButton.addEventListener('click', fillPopupProfile);

popupAddCardOpenButton.addEventListener('click', () => {
  popupAddCardFormValidation.resetErrors();  
  popupAddCardFormValidation.disableBatton(); 
  addCardPopup.open();
});