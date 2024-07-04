import { checkResponse } from "../utils/checkResponse.js";
// конфиг
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-17/",
  headers: {
    authorization: "f85af8b3-6b2a-4d1f-b9f0-5f2e64c5c8d2",
    "Content-Type": "application/json",
  },
};

// получение пользователя
export const getUserApi = () => {
  return request("users/me", {
    method: "GET",
    headers: config.headers,
  });
};
// получение карточек
export const getCardsApi = () => {
  return request("cards", {
    method: "GET",
    headers: config.headers,
  });
};
// изменение профиля
export const editProfileApi = (name, about) => {
  return request("users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};
// добавление карточки
export const addCardApi = (name, link) => {
  return request("cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};
// удаление карточки
export const removeCardApi = (cardId) => {
  return request(`cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
// добавление лайка
export const putLikeApi = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};
// удаление лайка
export const deleteLikeApi = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
// изменение аватара
export const editAvatarApi = (avatar) => {
  return request("users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}
