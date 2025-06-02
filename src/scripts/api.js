const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}

// Получение данных пользователя
export const getProfileData = async () => {
  const res = await fetch(
    "https://nomoreparties.co/v1/wff-cohort-39/users/me",
    {
      method: "GET",
      headers: {
        authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
      },
    }
  );
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// Получение данных карточек
export const getInitialCards = async () => {
  const res = await fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    method: "GET",
    headers: {
      authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// Обновление данных профиля
export const submitProfileData = async (
  inputName,
  inputJob
) => {
  const res = await fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    method: "PATCH",
    headers: {
      authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
      about: inputJob.value,
    }),
  })
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// Добавление новой карточки
export const submitNewCard = async (inputName, inputLink) => {
  const res = await fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    method: "POST",
    headers: {
        authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: inputName.value,
        link: inputLink.value
    })
  });
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Удаление карточки
export const deleteCard = async (cardId) => {
  const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8"
    }
  });
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const toggleCardLike = async (cardId, method) => {
  const res = await fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
        method: method,
    headers: {
      authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8"
    }
  });
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const changeAvatar = async (url) => {
  const res = await fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "2af521f8-b96d-49d8-b70e-e06e269daac8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: url
    }),
  });
    if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};