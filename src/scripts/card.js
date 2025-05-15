/**
 * Создание карточки
 * @param {*} cardTemplate Шаблон карточки
 * @param {*} data Параметры
 * @param {*} onDelete Функция удаления карточки
 * @param {*} likeCard Функция обработчик лайка
 * @param {*} openPopupImage Функция передающая каринку в попап
 * @returns
 */
export function createCard(
  cardTemplate,
  data,
  onDelete,
  likeCard,
  openPopupImage
) {
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
  cardImage.addEventListener("click", () => openPopupImage(cardImage));

  return cardElement;
}

//Удаление карточки
export function handleDelete(cardDelete) {
  cardDelete.remove();
}

// Данные для новой карточки
export const createNewCardDataObject = (cardName, cardLink) => {
  const data = {
    name: cardName.value,
    link: cardLink.value,
  };
  return data;
};

// Обработчик лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};
