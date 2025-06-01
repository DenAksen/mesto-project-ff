/**
 * Создание карточки
 * @param {*} cardTemplate Шаблон карточки
 * @param {*} data Параметры
 * @param {*} onDelete Функция удаления карточки
 * @param {*} likeCard Функция обработчик лайка
 * @param {*} openPopupImage Функция передающая каринку в попап
 * @param {boolean} displayButtonDelete Функция передающая каринку в попап
 * @returns
 */
export function createCard(
  cardTemplate,
  data,
  onDelete,
  likeCard,
  openPopupImage,
  displayButtonDelete = true
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikesTextElement = cardElement.querySelector('.card__quantity-likes');

  cardLikesTextElement.textContent = data.likes.length;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  displayButtonDelete
  ? delButton.addEventListener("click", () => onDelete(data._id, cardElement))
  : delButton.style.display = 'none';
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

// //  Отображение количества лайков
// const displayQuantityLikes = (cardLikesTextElement, arrayLikes) => {
//   cardLikesTextElement.textContent = arrayLikes.length;
// };