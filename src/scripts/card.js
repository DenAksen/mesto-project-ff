/**
 * Создание карточки
 * @param {*} cardTemplate Шаблон карточки
 * @param {*} data Параметры
 * @param {*} onDelete Функция удаления карточки
 * @param {*} likeCard Функция обработчик лайка 
 * @param {*} insertPopupImage Функция передающая каринку в попап
 * @returns 
 */
export function createCard(cardTemplate, data, onDelete, likeCard, insertPopupImage) {
    const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  delButton.addEventListener("click", () => onDelete(cardElement));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  cardImage.addEventListener("click", () => insertPopupImage(cardImage));

  return cardElement;
}

//Удаление карточки
export function handleDelete(cardDelete) {
  cardDelete.remove();
}

/**
 * Отрисовка карточек
 * @param {*} placeList Контейнер для добавления
 * @param {*} card Добавляемая карочка
 * @param {boolean} insertBegin Флаг добавления картоки в начало контейнера
 */
export function renderCard(placeList, card, insertBegin = false) {
    if (insertBegin) {
        placeList.prepend(card);
    } else {
        placeList.append(card);
    }
}

// Данные для новой карточки
export const newCardDataObject = (cardName, cardLink) => {
    const data = {
            name: cardName.value,
            link: cardLink.value,
    };
    return data;
}

// Сброс полей формы 
export const resetInputValue = (arrInput) => {
  arrInput.forEach(element => {
    element.value = '';
  });
}

// Обработчик лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция передающая каринку в попап
export const handlePopupImage = (cardImage) => {
  document.querySelector('.popup__image').src = cardImage.src;
  document.querySelector('.popup__caption').textContent = cardImage.alt;
}

// function isValidUrl(url) {
//   // Проверяем базовую структуру URL регулярным выражением
//   const urlRegex = /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,})+(:\d{1,5})?(\/[\/\w.-]*)*(\?[^\s]*)?(#[^\s]*)?$/i;
  
//   if (!urlRegex.test(url)) {
//     return false;
//   }

//   // Дополнительная проверка через конструктор URL
//   try {
//     new URL(url);
//     return url;
//   } catch (e) {
//     return console.log('Invalid link');
//   }
// }

// // Отрисовка новой карточки в начале контейнера
// export function renderNewCard(placeList, card) {
//   placeList.prepend(card);
// }
