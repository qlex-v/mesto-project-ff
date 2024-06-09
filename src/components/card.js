export const addCard = (cardDetails, removeCard, isLikeCard, displayPopupImage, cardTemplate) => {
  const card = cardTemplate.cloneNode(true);
  const cardDelBtn = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like-button');

  cardTitle.textContent = cardDetails.name;
  cardImage.src = cardDetails.link;
  cardImage.alt = cardDetails.name;

  cardDelBtn.addEventListener('click', removeCard);

  cardLikeBtn.addEventListener('click', isLikeCard);

  cardImage.addEventListener('click', (event) => {
    displayPopupImage(event);
  });

  return card;
}
// @todo: Функция удаления карточки
export const removeCard = (event) => {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

export const isLikeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

