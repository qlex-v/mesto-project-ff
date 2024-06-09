import './pages/index.css';
import { initialCards} from './scripts/cards.js';
import { addCard, removeCard, isLikeCard, displayPopupImage } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close');

export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCardCloseButton = popupTypeNewCard.querySelector('.popup__close');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements['name']; 
const jobInput = formEdit.elements['description']; 

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const linkInput = newPlaceForm.elements['link'];

export const popupTyppeImage = document.querySelector('.popup_type_image');
const popupTypeImageCloseButton = popupTyppeImage.querySelector('.popup__close');

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((cardDetails) => {
  placesList.append(addCard(cardDetails, removeCard, isLikeCard, displayPopupImage, openModal, cardTemplate));
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

popupTypeEditCloseButton.addEventListener('click', () => {
  closeModal(popupTypeEdit);
});

popupTypeNewCardCloseButton.addEventListener('click', () => {
  closeModal(popupTypeNewCard);
});

popupTypeImageCloseButton.addEventListener('click', () => {
  closeModal(popupTyppeImage);
});

const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;
  newPlaceForm.reset();

  placesList.prepend(addCard({name, link}, removeCard, isLikeCard, displayPopupImage, openModal, cardTemplate));
  closeModal(popupTypeNewCard);
}

const handleFormEditProfileSubmit = (event) => {
  event.preventDefault(); 

  const name = nameInput.value;
  const job = jobInput.value;
  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupTypeEdit);
}

formEdit.addEventListener('submit', handleFormEditProfileSubmit); 

newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);