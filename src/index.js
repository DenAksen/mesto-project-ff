import "./pages/index.css";
import { createCard } from "./scripts/card.js";
import { openModal, closeModal, popupAddListener } from "./scripts/modal.js";
import { validationConfig } from "./scripts/validation/validationConfig.js";
import {
  enableValidation,
  clearValidation,
  disableSubmitButton,
  enableSubmitButton
} from "./scripts/validation/validation.js";
import {
  getProfileData,
  getInitialCards,
  submitProfileData,
  submitNewCard,
  deleteCard,
  toggleCardLike,
  changeAvatar,
} from "./scripts/api.js";
import {
  changeTextButtonSaveOnLoad,
  changeTextButtonDeleteOnLoad
} from "./scripts/changeTextButtonOnLoad.js";

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
const popupCardDelete = document.querySelector(".popup_type_card-delete");
const popupUpdateAvatar = document.querySelector(".popup_type_avatar");

// Форма смены аватара
const formUpdateAvatar = popupUpdateAvatar.querySelector(".popup__form");
const inputUpdateAvatar = formUpdateAvatar.elements.link;
const submitButtonFormAvatar = formUpdateAvatar.querySelector(".popup__button");

// Форма удаления карточки
const formDeleteCard = popupCardDelete.querySelector(".popup__form");
const submitButtonFormDeleteCard = formDeleteCard.querySelector(
  ".popup__button_card-delete"
);

// Форма редактирования профиля
const formProfile = document.forms["edit-profile"];
const inputNameFormProfile = formProfile.elements.name;
const inputJobFormProfile = formProfile.elements.description;
const submitButtonFormProfile = formProfile.querySelector(".popup__button");

// Форма добавления карточки
const formNewCard = document.forms["new-place"];
const inputNameFormNewCard = formNewCard.elements["place-name"];
const inputLinkFormNewCard = formNewCard.elements.link;
const submitButtonFormNewCard = formNewCard.querySelector(".popup__button");

const popupImageContentImage = document.querySelector(".popup__image");
const popupImageContentCaption = document.querySelector(".popup__caption");

const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

const profileImage = document.querySelector(".profile__image");

// Обработчик отправки формы добавления карточки
const handleFormNewCardSubmit = async (evt) => {
  evt.preventDefault();
  changeTextButtonSaveOnLoad(submitButtonFormNewCard, true);
  submitNewCard(inputNameFormNewCard, inputLinkFormNewCard)
    .then((res) => {
      renderCard(
        placeList,
        createCard(
          cardTemplate,
          res,
          handleCardDelete,
          handleCardLike,
          openPopupImage,
          'newCard'
        ),
        true
      );
      formNewCard.reset();
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.error(`'Ошибка при загрузке данных:', ${error}`);
    })
    .finally(() => {
      changeTextButtonSaveOnLoad(submitButtonFormNewCard, false);
    });
};

/**
 * Отрисовка карточек
 * @param {*} placeList Контейнер для добавления
 * @param {*} card Добавляемая карочка
 * @param {boolean} insertBegin Флаг добавления картоки в начало контейнера
 */
function renderCard(placeList, card, insertBegin = false) {
  insertBegin ? placeList.prepend(card) : placeList.append(card);
}

// Открывает попап удаления карточки
const handleCardDelete = (cardId, cardElement) => {
  // Обработчик отправки формы подтверждения
  function handleConfirmSubmit(evt) {
    evt.preventDefault();
    changeTextButtonDeleteOnLoad(submitButtonFormDeleteCard, true);
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(popupCardDelete);
      })
      .catch((err) => {
        console.error(`Ошибка при удалении карточки:, ${err}`);
      })
      .finally(() => {
        changeTextButtonDeleteOnLoad(submitButtonFormDeleteCard, false);
      });
  }

  // Удаляем старый обработчик и добавляем новый
  formDeleteCard.removeEventListener("submit", handleConfirmSubmit);
  formDeleteCard.addEventListener("submit", handleConfirmSubmit);

  openModal(popupCardDelete);
};

// Обработчик лайка
const handleCardLike = (cardId, likeButton, cardLikesCount) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    toggleCardLike(cardId, "PUT")
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikesCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при удалении карточки:, ${err}`);
      });
  } else {
    toggleCardLike(cardId, "DELETE")
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikesCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при удалении карточки:, ${err}`);
      });
  }
};

// Функция открывает попап Картинки
const openPopupImage = (cardImage) => {
  popupImageContentImage.src = cardImage.src;
  popupImageContentImage.alt = cardImage.alt;
  popupImageContentCaption.textContent = cardImage.alt;
  openModal(popupImage);
};

// Функция открывает попап Профиля
function openPopupProfile() {
  inputNameFormProfile.value = titleProfile.textContent;
  inputJobFormProfile.value = descriptionProfile.textContent;
  clearValidation(formProfile, validationConfig, enableSubmitButton);
  openModal(popupEdit);
}

// Функция открывает попап добавления карточки
function openPopupNewCard() {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig, disableSubmitButton);
  openModal(popupNewCard);
}

// Открывает попап смены аватара
function openPopupUpdateAvatar() {
  formUpdateAvatar.reset();
  clearValidation(formUpdateAvatar, validationConfig, disableSubmitButton);
  openModal(popupUpdateAvatar);
}

// Обработчик отправки формы смены аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const url = inputUpdateAvatar.value;
  changeTextButtonSaveOnLoad(submitButtonFormAvatar, true);
  changeAvatar(url)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupUpdateAvatar);
    })
    .catch((error) => {
      console.error(`'Ошибка при загрузке данных:', ${error}`);
    })
    .finally(() => {
      changeTextButtonSaveOnLoad(submitButtonFormAvatar, false);
    });
}

// Обработчик отправки формы Профиля
const handleFormProfileSubmit = (evt) => {
  evt.preventDefault(); // Сброс стандартного поведения
  changeTextButtonSaveOnLoad(submitButtonFormProfile, true);
  submitProfileData(inputNameFormProfile, inputJobFormProfile)
    .then((result) => {
      titleProfile.textContent = result.name;
      descriptionProfile.textContent = result.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.error(`'Ошибка при загрузке данных:', ${error}`);
    })
    .finally(() => {
      changeTextButtonSaveOnLoad(submitButtonFormProfile, false);
    });
};

// Обработка стартовых запросов через Promise.all
Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    // Обработка данных профиля
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
          handleCardDelete,
          handleCardLike,
          openPopupImage,
          profileData._id
        )
      );
    });
  })
  .catch((error) => {
    console.error(`'Ошибка при загрузке данных:', ${error}`);
  });

enableValidation(validationConfig);

// Слушатель на элементы закрытия
popupAddListener(popupEdit);
popupAddListener(popupNewCard);
popupAddListener(popupImage);
popupAddListener(popupCardDelete);
popupAddListener(popupUpdateAvatar);

// Слушатели кнопок открытия popup
buttonAddNewCard.addEventListener("click", openPopupNewCard);
buttonOpenFormProfile.addEventListener("click", openPopupProfile);
profileImage.addEventListener("click", openPopupUpdateAvatar);

//Слушатель отправки формы Профиль
formProfile.addEventListener("submit", handleFormProfileSubmit);

// Слушатель отправки формы добавления карточки
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

// Слушатель отправки формы смены аватара
formUpdateAvatar.addEventListener("submit", handleFormAvatarSubmit);
