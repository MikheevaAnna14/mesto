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

export {
  popupOpenButton,
  popupForm,
  nameInput,
  jobInput,
  popupAddCardOpenButton,
  popupAddCardForm,
  popupAvatarOpenButton,
  popupAvatarFofm,
  conf
}
