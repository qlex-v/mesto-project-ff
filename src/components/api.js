// конфиг
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-17/',
  headers: {
    authorization: 'f85af8b3-6b2a-4d1f-b9f0-5f2e64c5c8d2',
    'Content-Type': 'application/json'
  }
}
// получение пользователя
export const getUserApi = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// получение карточек
export const getCardsApi = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// изменение профиля
export const editProfileApi = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// добавление карточки
export const addCardApi = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// удаление карточки
export const removeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// добавление лайка
export const putLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// удаление лайка
export const deleteLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}
// изменение аватара
export const editAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch(err => console.log(err));
}

