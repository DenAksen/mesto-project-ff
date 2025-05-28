const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
    console.log('Неактивна');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
    console.log('активна');
  }
};

const checkInputValidity = (formElement, inputElement, errorClass) => {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validity.patternMismatch ? inputElement.dataset.validityErrorMessage : inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
};

const setEventListeners = (formElement, inputClass, buttonClass, inactiveButtonClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputClass));
  const buttonElement = formElement.querySelector(buttonClass);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass); // Могут быть проблемы с формой профиля
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass, validationConfig.errorClass);
    });
};

/**
 * Очищает ошибки валидации формы
 * @param {*} formElement DOM элемент формы
 * @param {object} validationConfig Объект с настройками валидации
 * @param {boolean} buttonStartedIsActive Флаг состояния кнопки при открытии активна/неактивна(true/false)
 */
export const clearValidation = (formElement, validationConfig, buttonStartedIsActive = false) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  if (buttonStartedIsActive) {
    buttonElement.disabled = false;
    // buttonElement.classList.contains(validationConfig.inactiveButtonClass) ? buttonElement.classList.remove(validationConfig.inactiveButtonClass) : false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig.errorClass);
  });
}