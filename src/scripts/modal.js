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
