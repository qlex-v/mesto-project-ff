import { cardTemplate, popupTyppeImage } from "../index.js";
import { openModal } from "../components/modal.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const addCard = (cardDetails, removeCard, isLikeCard) => {
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

  cardImage.addEventListener('click', displayPopupImage);

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

export const displayPopupImage = (event) => {
  popupTyppeImage.querySelector('.popup__image').src = event.target.src;
  popupTyppeImage.querySelector('.popup__image').alt = event.target.alt;
  popupTyppeImage.querySelector('.popup__caption').textContent = event.target.alt;
  openModal(popupTyppeImage);
}