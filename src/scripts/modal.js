const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  // добавить класс открытия попапа
  modal.classList.add("popup_is-opened");
  // добавить слушатель на кнопку Escape
  document.addEventListener("keyup", handleEscKeyUp);
  // Слушатель на элементы закрытия
  popupAddListener(modal);
};

export const closeModal = (modal) => {
  // удалить класс открытия попапа
  modal.classList.remove("popup_is-opened");
  // удалить слушатель на кнопку Escape
  document.removeEventListener("keyup", handleEscKeyUp);
};

// Функция вешает слушатели на элементы закрытия
export const popupAddListener = (popupElement) => {
  // ищем кнопку крестик в попапе
  const popupCloseButton = popupElement.querySelector(".popup__close");
  // Слушатель на крестик
  popupCloseButton.addEventListener("click", () => {
    closeModal(popupElement);
  });

  // Слушатель на Оверлей
  popupElement.addEventListener("mousedown", (event) => {
    // если event.target содержит класс "popup", то закрываем
    if (event.target === popupElement) {
      // Проверяем, что кликнули именно на оверлей
      closeModal(popupElement);
    }
  });
};

// //Слушатель для кнопок открытия popup
// export const buttonsOpenedPopupAddListener = (elemButtons, elemCards) => {
//   elemButtons.addEventListener('click', (evt) => {
//     if (evt.target === addButton) {
//         openModal(popupNewCard);
//     } if (evt.target === buttonEdit) {
//         openModal(popupEdit);
//     }
//   });
//   elemCards.addEventListener('click', (evt) => {
//     openModal(popupImage);
//   });
// }

//Функция заполнения полей формы Профиля при открытии
export const fillingInputValueOpening = (inputName, inputJob) => {
  inputName.value = document.querySelector(".profile__title").textContent;
  inputJob.value = document.querySelector(".profile__description").textContent;
};

// Обработчик отправки формы Профиля
export const handleFormSubmit = (evt, inputName, inputJob) => {
  evt.preventDefault(); // Сброс стандартного поведения
  document.querySelector(".profile__title").textContent = inputName.value;
  document.querySelector(".profile__description").textContent = inputJob.value;

  //Грустная альтернатива
  // document.querySelector('.profile__title').textContent = document.forms['edit-profile'].formProfile.elements.name.value;
  // document.querySelector('.profile__description').textContent = document.forms['edit-profile'].formProfile.elements.description.value;
};
