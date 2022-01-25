let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let formElement = document.querySelector('.popup__container-info-button');
let nameInput = document.querySelector('.popup__container-input_name');
let jobInput = document.querySelector('.popup__container-input_occupation');
let nameUser = document.querySelector('.profile__info-name');  
let occupationUser = document.querySelector('.profile__info-occupation');

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

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);



// popup.addEventListener('click', function(event) {
//   if (!event.defaultPrevented) {
//     closePopup();
//   }
// });
