/**
 * Создание карточки
 * @param {*} cardTemplate Шаблон карточки
 * @param {*} data Параметры
 * @param {*} onDelete Функция удаления карточки
 * @param {*} likeCard Функция обработчик лайка
 * @param {*} openPopupImage Функция передающая каринку в попап
 * @param {boolean} displayButtonDelete Нужно ли отображать кнопку удаления карточки
 * @param {boolean} displayLikeCardActive Нужно ли отображать лайк активным
 * @returns
 */
export function createCard(
  cardTemplate,
  data,
  onDelete,
  likeCard,
  openPopupImage,
  displayButtonDelete = true,
  displayLikeCardActive = false
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikesCount = cardElement.querySelector('.card__quantity-likes');

  if (displayLikeCardActive) {
    likeButton.classList.add("card__like-button_is-active");
  };
  cardLikesCount.textContent = data.likes.length;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  displayButtonDelete
  ? delButton.addEventListener("click", () => onDelete(data._id, cardElement))
  : delButton.style.display = 'none';

  likeButton.addEventListener("click", () => likeCard(data._id, likeButton, cardLikesCount));
  cardImage.addEventListener("click", () => openPopupImage(cardImage));

  return cardElement;
}

// Обработчик лайка
export const handleLikeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};
