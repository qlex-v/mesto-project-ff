// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const addCard = (cardDetails, removeCard) => {
  const card = cardTemplate.cloneNode(true);
  const cardDelBtn = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardTitle.textContent = cardDetails.name;
  cardImage.src = cardDetails.link;
  cardImage.alt = 'Изображение ' + cardDetails.name;
  cardDelBtn.addEventListener('click', removeCard);

  return card;
}
// @todo: Функция удаления карточки
const removeCard = (event) => {
  const listItem = event.target.closest('.card');
  listItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardDetails) => {
  placesList.append(addCard(cardDetails, removeCard));
})
