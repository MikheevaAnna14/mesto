let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
}

function closePopup(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// popup.addEventListener('click', function(event) {
//   if (!event.defaultPrevented) {
//     closePopup();
//   }
// });

let formElement = document.querySelector('.popup__container-info-button');
let nameInput = document.querySelector('.popup__container-info-name');
let jobInput = document.querySelector('.popup__container-info-occupation');

function formSubmitHandler(evt) {
  let nameUser = document.querySelector('.profile__info-name');  
  let occupationUser = document.querySelector('.profile__info-occupation');
  nameUser.textContent = nameInput.value;
  occupationUser.textContent = jobInput.value;
  closePopup(evt);
}

popupContainer.addEventListener('submit', formSubmitHandler);