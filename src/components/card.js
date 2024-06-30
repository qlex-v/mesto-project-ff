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

