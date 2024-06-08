import './pages/index.css';
import { initialCards, addCard, removeCard, isLikeCard } from './scripts/cards.js';
import { openModal } from './components/modal.js';
import { handleFormEditProfileSubmit } from './components/submitEditProfile.js';
import { handleFormNewPlaceSubmit } from './components/submitNewPlace.js';
// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

const formEdit = document.forms['edit-profile'];
export const nameInput = formEdit.elements['name']; 
export const jobInput = formEdit.elements['description']; 

export const newPlaceForm = document.forms['new-place'];
export const placeNameInput = newPlaceForm.elements['place-name'];
export const linkInput = newPlaceForm.elements['link'];

export const popupTyppeImage = document.querySelector('.popup_type_image');

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((cardDetails) => {
  placesList.append(addCard(cardDetails, removeCard, isLikeCard));
})

//edit profile opened
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

formEdit.addEventListener('submit', handleFormEditProfileSubmit); 

newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);
