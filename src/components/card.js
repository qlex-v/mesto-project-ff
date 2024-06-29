import { removeCardApi, putLikeApi, deleteLikeApi } from "./api.js";

// Функция добавления карточки
export const addCard = (cardDetails, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId) => {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDelBtn = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like-button');
  const cardLikeCounter = card.querySelector('.card__like-counter');

  cardDetails.likes.forEach((like) => {
    if (like._id === profileId) {
      cardLikeBtn.classList.add('card__like-button_is-active');
    }
  });
  cardTitle.textContent = cardDetails.name;
  card.id = cardDetails._id;
  cardImage.src = cardDetails.link;
  cardImage.alt = cardDetails.name;
  cardLikeCounter.textContent = cardDetails.likes.length;

  if (cardDetails.owner._id === profileId) {
    cardDelBtn.addEventListener('click', removeCard);
  }
  else {
    cardDelBtn.remove();
  }

  cardLikeBtn.addEventListener('click', isLikeCard);

  cardImage.addEventListener('click', (event) => {
    displayPopupImage(event);
  });

  return card;
}
// Функция удаления карточки
export const removeCard = (event) => {
  const listItem = event.target.closest('.card');
  removeCardApi(listItem.id);
  listItem.remove();
}

// Функция добавления/удаления лайка
export const isLikeCard = (event) => {
  const card = event.target.closest('.card');
  const cardLikeCounter = card.querySelector('.card__like-counter');
  const cardId = card.id;
  if (event.target.classList.contains('card__like-button_is-active')) {
    deleteLikeApi(cardId)
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length
    });
  }
  else {
    putLikeApi(cardId)    
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length
    });

  }
  event.target.classList.toggle('card__like-button_is-active');
}

