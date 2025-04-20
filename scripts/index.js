// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector(".content");
const placeList = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");

const buttonEdit = content.querySelectorAll(".profile__edit-button");

const cardTemplate = document.querySelector("#card-template").content;

function createCard(data, onDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  delButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
}

function handleDelete(cardDelete) {
  cardDelete.remove();
}

function renderCard(card) {
  placeList.append(card);
}

initialCards.forEach(function (item) {
  renderCard(createCard(item, handleDelete));
});
