import './pages/index.css';
// import { initialCards } from './scripts/cards.js';
import { addCard, removeCard, isLikeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, toggleButtonState } from './components/validation.js';
import {getUserApi, getCardsApi, editProfileApi, addCardApi} from './components/api.js'

let profileId;

// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// разметка списка карточек
const placesList = document.querySelector('.places__list');

// разметка профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');

// разметка попапа редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditBtn = popupEdit.querySelector('.popup__button');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');

// разметка попапа добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupNewCardBtn = popupNewCard.querySelector('.popup__button');
const popupNewCardCloseBtn = popupNewCard.querySelector('.popup__close');

// форма редактирования профиля
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements['name']; 
const jobInput = formEdit.elements['description']; 

// форма добавления карточки
const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const linkInput = newPlaceForm.elements['link'];


// попап картинки
const popupImage = document.querySelector('.popup_type_image');
const ImagePopupImage = popupImage.querySelector('.popup__image');
const captionPopupImage = popupImage.querySelector('.popup__caption');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');

// попап аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditAvatarBtn = popupEditAvatar.querySelector('.popup__button');
const popupEditAvatarCloseBtn = popupEditAvatar.querySelector('.popup__close');
const formEditAvatar = document.forms['edit-avatar'];
const avatarInput = formEditAvatar.elements['avatar'];

// функция открытия попапа картинки
const displayPopupImage = (event) => {
  ImagePopupImage.src = event.target.src;
  ImagePopupImage.alt = event.target.alt;
  captionPopupImage.textContent = event.target.alt;
  openModal(popupImage);
}

// функция отправки формы добавления карточки
const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();

  addCardApi(placeNameInput.value, linkInput.value)
  .then((data) => {
    placesList.prepend(addCard(data, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId));
  })
  closeModal(popupNewCard);
}

// функция отправки формы редактирования профиля
const handleFormEditProfileSubmit = (event) => {
  event.preventDefault(); 
  editProfileApi(nameInput.value, jobInput.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  closeModal(popupEdit);
}

// слушатель кнопки редактирования аватара
profileImg.addEventListener('click', () => {
  openModal(popupEditAvatar);
  toggleButtonState([avatarInput], popupEditAvatarBtn);
});

// слушатель кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  toggleButtonState([nameInput, jobInput], popupEditBtn);
});

//слушатель кнопки добавления карточки
profileAddBtn.addEventListener('click', () => {
  openModal(popupNewCard);
  toggleButtonState([placeNameInput, linkInput], popupNewCardBtn);
});

// слушатель кнопки закрытия попапа редактирования профиля
popupEditCloseBtn.addEventListener('click', () => {
  closeModal(popupEdit);
});

//слушатель кнопки закрытия попапа добавления карточки
popupNewCardCloseBtn.addEventListener('click', () => {
  closeModal(popupNewCard);
});

// слушатель кнопки закрытия попапа картинки
popupImageCloseBtn.addEventListener('click', () => {
  closeModal(popupImage);
});

// слушатель кнопки закрытия попапа редактирования аватара
popupEditAvatarCloseBtn.addEventListener('click', () => {
  closeModal(popupEditAvatar);
});

// слушатель отправки формы редактирования профиля
formEdit.addEventListener('submit', handleFormEditProfileSubmit); 

// слушатель отправки формы добавления карточки
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);

// включение валидации
enableValidation();


// функция инициалтизация данных профиля
const initialUser = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.src = data.avatar;
  profileImg.alt = data.name;
  profileId = data._id;
}

// инициализация профиля
getUserApi()
.then((data) => {
  return initialUser(data);
})

//инициализация карточек
getCardsApi()
.then((data) => {
  data.forEach((cardDetails) => {
    placesList.append(addCard(cardDetails, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId));
  })
})

