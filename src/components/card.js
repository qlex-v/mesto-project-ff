export const addCard = (cardDetails, removeCard, isLikeCard, displayPopupImage, openModal, cardTemplate) => {
  const card = cardTemplate.cloneNode(true);
  const cardDelBtn = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like-button');
  const popupTypeImage = document.querySelector('.popup_type_image');

  cardTitle.textContent = cardDetails.name;
  cardImage.src = cardDetails.link;
  cardImage.alt = cardDetails.name;

  cardDelBtn.addEventListener('click', removeCard);

  cardLikeBtn.addEventListener('click', isLikeCard);

  cardImage.addEventListener('click', (event) => {
    displayPopupImage(event, popupTypeImage, openModal);
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

export const displayPopupImage = (event, popupTyppeImage, openModal) => {
  popupTyppeImage.querySelector('.popup__image').src = event.target.src;
  popupTyppeImage.querySelector('.popup__image').alt = event.target.alt;
  popupTyppeImage.querySelector('.popup__caption').textContent = event.target.alt;
  openModal(popupTyppeImage);
}