import { Card } from "../scripts/components/Card.js";
import { FormValidator} from "../scripts/components/FormValidator.js";
import { Section  } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { api } from "../scripts/components/Api.js";     

import '../pages/index.css';

const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupForm = document.querySelector('#popupProfileForm');
const nameInput = document.querySelector('.popup__container-input_type_name');
const jobInput = document.querySelector('.popup__container-input_type_occupation');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardForm = document.querySelector('#popupAddCardForm');
const popupAvatarOpenButton = document.querySelector('.profile__avatar-edit');
const popupAvatarFofm = document.querySelector('#popupAvatar');

const conf = {
    formSelector: '.popup__container-info',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-info-button',
    inputErrorClass: 'popup__container-input_type_error',
    errorClass: 'popup__container-input-error_active',
  }

const popupProfileFormValidation = new FormValidator (conf, popupForm);
const popupAddCardFormValidation = new FormValidator (conf, popupAddCardForm);
const popupAvatarFormValidation = new FormValidator (conf, popupAvatarFofm);

const section = new Section(embedCard, '.elements');
const imagePopup = new PopupWithImage('#popup-photo');
const profilePopup = new PopupWithForm('#popup-profile', savePopupProtile);
const cardAddPopup = new PopupWithForm('#popup-addcard', addNewCard);
const userInfo = new UserInfo({ 
  profileNameSelector: '.profile__info-name', 
  profileOccupationSelector: '.profile__info-occupation',
  avatarSelector: '.profile__avatar',
 });

const confirmationPopup = new PopupWithConfirmation('#popup-delete');
const avatarEditPopup = new PopupWithForm('#popup-avatar-edit', editAvatar);  

let userId = "";

popupProfileFormValidation.enableValidation();
popupAddCardFormValidation.enableValidation();
popupAvatarFormValidation.enableValidation();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardAddPopup.setEventListeners();
confirmationPopup.setEventListeners();
avatarEditPopup.setEventListeners(); 

function editAvatar(avatar) {
  avatarEditPopup.setButtonText('Сохранение...', 'Сохранить', true);
  api.editAvatar(avatar)  
    .then(() => {
      userInfo.setAvatar(avatar)
      avatarEditPopup.close()
    })
    .catch(err => console.log("Не удалось загрузить аватар:", err))
    .finally(() => avatarEditPopup.setButtonText('Сохранение...', 'Сохранить', false))
}

// заполняем поля попапа текущими данными пользователя
function fillPopupProfile() {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.occupation;
  profilePopup.open();
}

// сохраняем данные, внесенные в поля формы
function savePopupProtile(item) {
  const { name, occupation } = item;
  profilePopup.setButtonText('Сохранение...', 'Сохранить', true);
  api.redactProfile(name, occupation)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about)
    })
    .catch(err => console.log("Не удалось изменить данные профиля:", err))
    .finally(() => profilePopup.setButtonText('Сохранение...', 'Сохранить', false))
  profilePopup.close();
}

// функция удаления карточки
function handleCardDelete(cardId, card) {
  confirmationPopup.handleSubmitDelete(() => {
    confirmationPopup.setButtonText('Удаление...', 'Да', true);
    api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        confirmationPopup.close();
      })
      .catch(err => console.log("Не удалось удалить карточку:", err))
      .finally(() => confirmationPopup.setButtonText('Удаление...', 'Да', false))
  })
  confirmationPopup.open();  
}

// функция добавления лайков
function addLikeClick(cardId, card) {
  api.addLike(cardId)
    .then(res => {
      card.countLikes(res.likes)
    })
    .catch(err => console.log(err))
}

// функция удаления лайков
function deleteLikeClick(cardId, card) {
  api.deleteLike(cardId)
    .then(res => {
      card.countLikes(res.likes)
    })
    .catch(err => console.log(err))
}

function handleLikeClick (id, card) {
  if(card.isLiked()) {
    deleteLikeClick(id, card)
  } else {
    addLikeClick(id, card)
  }
}

function handlePhotoPopup(link, name) {
  imagePopup.open(link, name);
}

// функция добавления готовой карточки в DOM 
function embedCard(item, userId) {
  section.addItem(generateCard(item, userId));
}

function generateCard (item, userId) {
  const card = new Card(
    item, 
    '#element-template', 
    () => handlePhotoPopup(item.link, item.name), 
    (id) => handleCardDelete(id, card),
    (id) => handleLikeClick(id, card),  
    userId)
  const cardElement = card.createCard(); 
  return cardElement;
}

// функция добавления новых карточек
function addNewCard(item) {  
  cardAddPopup.setButtonText('Сохранение...', 'Создать', true);
  api.addCard(item['title'], item.link, item.Deletes)
    .then(res => {
      section.addItem(generateCard(res, userId));
      cardAddPopup.close()
    })
    .catch(err => console.log("Не удалось добавить карточку:", err))
    .finally(() => cardAddPopup.setButtonText('Сохранение...', 'Создать', false))
}

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData);
    section.renderItems(cards, userId);
  })
  .catch(err => console.log("Не удалось загрузить страницу:", err))


// слушатели 
popupOpenButton.addEventListener('click', () => {
  popupProfileFormValidation.resetErrors();
  popupProfileFormValidation.disableBatton();
  fillPopupProfile();
});

popupAddCardOpenButton.addEventListener('click', () => {
  popupAddCardFormValidation.resetErrors();  
  popupAddCardFormValidation.disableBatton(); 
  cardAddPopup.open();
});

popupAvatarOpenButton.addEventListener('click', () => {
  popupAvatarFormValidation.resetErrors();
  popupAvatarFormValidation.disableBatton(); 
  avatarEditPopup.open();
});
