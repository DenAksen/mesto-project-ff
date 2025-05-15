import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleDelete,
  createNewCardDataObject,
  handleLikeCard,
} from "./scripts/card.js";
import { openModal, closeModal, popupAddListener } from "./scripts/modal.js";

const content = document.querySelector(".content");
const placeList = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
// Кнопки открытия popup
const buttonAddNewCard = content.querySelector(".profile__add-button");
const buttonOpenFormProfile = content.querySelector(".profile__edit-button");
// Popups
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// Секция Профиль для слушателя кнопок открытия попапа
const profilePageSection = content.querySelector(".profile");
// Форма редактирования профиля
const formProfile = document.forms["edit-profile"];
const inputNameFormProfile = formProfile.elements.name;
const inputJobFormProfile = formProfile.elements.description;
// Форма добавления карточки
const formNewCard = document.forms["new-place"];
const inputNameFormNewCard = formNewCard.elements["place-name"];
const inputLinkFormNewCard = formNewCard.elements.link;

const popupImageContentImage = document.querySelector(".popup__image");
const popupImageContentCaption = document.querySelector(".popup__caption");

const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

/**
 * Отрисовка карточек
 * @param {*} placeList Контейнер для добавления
 * @param {*} card Добавляемая карочка
 * @param {boolean} insertBegin Флаг добавления картоки в начало контейнера
 */
function renderCard(placeList, card, insertBegin = false) {
  if (insertBegin) {
    placeList.prepend(card);
  } else {
    placeList.append(card);
  }
}

// Функция открывает попап Картинки
export const openPopupImage = (cardImage) => {
  popupImageContentImage.src = cardImage.src;
  popupImageContentImage.alt = cardImage.alt;
  popupImageContentCaption.textContent = cardImage.alt;
  openModal(popupImage);
};

// Функция открывает попап Профиля
function openPopupProfile() {
  inputNameFormProfile.value = titleProfile.textContent;
  inputJobFormProfile.value = descriptionProfile.textContent;
  openModal(popupEdit);
}

// Обработчик отправки формы Профиля
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault(); // Сброс стандартного поведения
  titleProfile.textContent = inputNameFormProfile.value;
  descriptionProfile.textContent = inputJobFormProfile.value;
  closeModal(popupEdit);
};

// Отрисовка начальных карточек
initialCards.forEach(function (item) {
  renderCard(
    placeList,
    createCard(cardTemplate, item, handleDelete, handleLikeCard, openPopupImage)
  );
});

// Слушатель на элементы закрытия
popupAddListener(popupEdit);
popupAddListener(popupNewCard);
popupAddListener(popupImage);

// Слушатели кнопок открытия popup
buttonAddNewCard.addEventListener("click", () => openModal(popupNewCard));
buttonOpenFormProfile.addEventListener("click", openPopupProfile);

//Слушатель отправки формы Профиль
formProfile.addEventListener("submit", handleFormProfileSubmit);

// Слушатель отправки формы добавления карточки
formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard(
    placeList,
    createCard(
      cardTemplate,
      createNewCardDataObject(inputNameFormNewCard, inputLinkFormNewCard),
      handleDelete,
      handleLikeCard,
      openPopupImage
    ),
    true
  );
  formNewCard.reset();
  closeModal(popupNewCard);
});
