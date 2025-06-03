const textButton = {
    originalTextSave: "Сохранить",
    changeTextSave: "Сохранение...",
    originalTextConfirmDelete: "Да",
    changeTextConfirmDelete: "Удаление..."
};

/**
 * 
 * @param {*} button Кнопка для смены текста
 * @param {boolean} change Флаг:
 * true - сменить текст
 * false - вернуть оригинальный текст
 */
export const changeTextButtonSaveOnLoad = (button, change) => {
    change
    ? button.textContent = textButton.changeTextSave
    : button.textContent = textButton.originalTextSave;
};

/**
 * 
 * @param {*} button Кнопка для смены текста
 * @param {boolean} change Флаг:
 * true - сменить текст
 * false - вернуть оригинальный текст
 */
export const changeTextButtonDeleteOnLoad = (button, change) => {
    change
    ? button.textContent = textButton.changeTextConfirmDelete
    : button.textContent = textButton.originalTextConfirmDelete;
};