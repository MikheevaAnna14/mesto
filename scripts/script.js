const popupOpenButton = document.querySelector('.profile__info-edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if (!event.defaultPrevented) {
    closePopup();
  }
});

popupContainer.addEventListener('click', function(event) {
  event.preventDefault();
});

let formElement = document.querySelector('.popup__container-info-button');
let nameInput = document.querySelector('.popup__container-info-name');
let jobInput = document.querySelector('.popup__container-info-occupation');

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  let nameUser = document.querySelector('.profile__info-name');  
  let occupationUser = document.querySelector('.profile__info-occupation');
  nameUser.setAttribute('value', nameInput.value);
  occupationUser.setAttribute('value', jobInput.value);
  closePopup();
}

formElement.addEventListener('click', formSubmitHandler); 
