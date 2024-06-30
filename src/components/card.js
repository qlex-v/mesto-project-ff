// Функция добавления карточки
export const addCard = (cardDetails, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId, putLikeApi, deleteLikeApi, removeCardApi, openModal, closeModal, popupDeleteCard, popupDeleteCardBtn) => {
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
    cardDelBtn.addEventListener('click', (event) => {
      removeCard(event, removeCardApi, openModal, closeModal, popupDeleteCard, popupDeleteCardBtn);
    });
  }
  else {
    cardDelBtn.remove();
  }

  cardLikeBtn.addEventListener('click', (event) => {
    isLikeCard(event, putLikeApi, deleteLikeApi);
  });

  cardImage.addEventListener('click', (event) => {
    displayPopupImage(event);
  });

  return card;
}

// Функция добавления/удаления лайка
export const isLikeCard = (event, putLikeApi, deleteLikeApi) => {
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

// Функция удаления карточки
export const removeCard = (event, removeCardApi, openModal, closeModal, popupDeleteCard, popupDeleteCardBtn) => {
  const listItem = event.target.closest('.card');
  openModal(popupDeleteCard);
  const clickDeleteBtn = (event) => {
    event.preventDefault();
    removeCardApi(listItem.id);
    listItem.remove();
    closeModal(popupDeleteCard);
    popupDeleteCardBtn.removeEventListener('click', clickDeleteBtn);
  }
  popupDeleteCardBtn.addEventListener('click', clickDeleteBtn);
}