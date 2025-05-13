import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, handleDelete, renderCard, newCardDataObject, resetInputValue, handleLikeCard, handlePopupImage} from './scripts/card.js';
import {openModal, inputValueOpening, popupAddListener, handleFormSubmit, closeModal} from './scripts/modal.js';


const content = document.querySelector(".content");
const placeList = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");
const buttonEdit = content.querySelector(".profile__edit-button");
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// Секция Профиль для слушателя кнопок открытия попапа
const profilePageSection = content.querySelector(".profile");
// Форма редактирования профиля
const formProfile = document.forms['edit-profile'];
const inputName = formProfile.elements.name;
const inputJob = formProfile.elements.description;
// Форма добавления карточки
const newCardForm = document.forms['new-place'];
const newCardName = newCardForm.elements['place-name']; // .place-name устаревшее название wtf?
const newCardLink = newCardForm.elements.link;

// Отрисовка начальных карточек 
initialCards.forEach(function (item) {
  renderCard(placeList, createCard(cardTemplate, item, handleDelete, handleLikeCard, handlePopupImage));
});

// Слушатель кнопок открытия popup
profilePageSection.addEventListener('click', (evt) => {
  if (evt.target === addButton) {
      openModal(popupNewCard);
  } if (evt.target === buttonEdit) {
      openModal(popupEdit);
      inputValueOpening(inputName, inputJob);
  }
});

// Слушатель открытия popup картинки
placeList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
  }
});

popupAddListener(popupEdit);
popupAddListener(popupNewCard);
popupAddListener(popupImage);

//Слушатель отправки формы Профиль
formProfile.addEventListener('submit', (evt) => {
    handleFormSubmit(evt, inputName, inputJob); // Передаём переменные явно
    closeModal(popupEdit);
});

// Слушатель отправки формы добавления карточки
newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(placeList, createCard(cardTemplate, newCardDataObject(newCardName, newCardLink), handleDelete, handleLikeCard, handlePopupImage), true);
    resetInputValue([newCardName, newCardLink]);
    closeModal(popupNewCard);
});