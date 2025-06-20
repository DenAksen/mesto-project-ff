const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

// Получение данных пользователя
export const getProfileData = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
  return handleResponse(res);
};

// Получение данных карточек
export const getInitialCards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
  return handleResponse(res);
};

// Обновление данных профиля
export const submitProfileData = async (inputName, inputJob) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputJob.value,
    }),
  });
  return handleResponse(res);
};

// Добавление новой карточки
export const submitNewCard = async (inputName, inputLink) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName.value,
      link: inputLink.value,
    }),
  });
  return handleResponse(res);
};

// Удаление карточки
export const deleteCard = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponse(res);
};

export const toggleCardLike = async (cardId, method) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  });
  return handleResponse(res);
};

export const changeAvatar = async (url) => {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
  return handleResponse(res);
};
