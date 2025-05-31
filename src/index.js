import "./pages/index.css";
import {
  createCard,
  handleDelete,
  createNewCardDataObject,
  handleLikeCard,
} from "./scripts/card.js";
import { openModal, closeModal, popupAddListener } from "./scripts/modal.js";
import { validationConfig } from "./scripts/validation/validationConfig.js";
import {
  enableValidation,
  clearValidation,
} from "./scripts/validation/validation.js";
import {
  getProfileData,
  renderInitialCards,
  submitProfileData,
  submitNewCard,
} from "./scripts/api.js";

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

const profileImage = document.querySelector(".profile__image");

// Обработка обоих запросов через Promise.all
Promise.all([getProfileData(), renderInitialCards()])
  .then(([profileData, cardsData]) => {
    // Обработка данных профиля
    console.log(profileData);
    console.log(cardsData);
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    titleProfile.textContent = profileData.name;
    descriptionProfile.textContent = profileData.about;

    // Обработка карточек
    cardsData.forEach((item) => {
      renderCard(
        placeList,
        createCard(
          cardTemplate,
          item,
          handleDelete,
          handleLikeCard,
          openPopupImage
        )
      );
    });
  })
  .catch((error) => {
    console.error(`'Ошибка при загрузке данных:', ${error}`);
  });

// Обработчик отправки формы добавления карточки
const handleFormNewCardSubmit = async (evt) => {
  evt.preventDefault();
  const dataNewCard = await submitNewCard(inputNameFormNewCard, inputLinkFormNewCard);
  console.log(dataNewCard);
  renderCard(
    placeList,
    createCard(
      cardTemplate,
      dataNewCard,
      handleDelete,
      handleLikeCard,
      openPopupImage
    ),
    true
  );
  formNewCard.reset();
  closeModal(popupNewCard);
};

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

enableValidation(validationConfig);

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
  clearValidation(formProfile, validationConfig, true);
  openModal(popupEdit);
}

// Функция открывает попап добавления карточки
function openPopupNewCard() {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openModal(popupNewCard);
}

// Обработчик отправки формы Профиля
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault(); // Сброс стандартного поведения
  submitProfileData(
    inputNameFormProfile,
    inputJobFormProfile,
    titleProfile,
    descriptionProfile
  );
  closeModal(popupEdit);
};

// Слушатель на элементы закрытия
popupAddListener(popupEdit);
popupAddListener(popupNewCard);
popupAddListener(popupImage);

// Слушатели кнопок открытия popup
buttonAddNewCard.addEventListener("click", openPopupNewCard);
buttonOpenFormProfile.addEventListener("click", openPopupProfile);

//Слушатель отправки формы Профиль
formProfile.addEventListener("submit", handleFormProfileSubmit);

// Слушатель отправки формы добавления карточки
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

