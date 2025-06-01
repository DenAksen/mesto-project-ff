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
export const submitProfileData = (
  inputName,
  inputJob,
  titleProfile,
  descriptionProfile
) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
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
    .then((res) => {
      if (!res.ok) {
        // Если ответ сервера не успешный, бросаем ошибку с кодом статуса
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      titleProfile.textContent = result.name;
      descriptionProfile.textContent = result.about;
    })
    .catch((error) => {
      console.error(`'Ошибка при загрузке данных:', ${error}`);
    });
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
  return res.json();
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
}