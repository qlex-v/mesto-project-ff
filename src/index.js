//импорт______________________________________________________________________________________________________________________________
import './pages/index.css';
import { addCard, isLikeCard, removeCard } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';
import { enableValidation, toggleButtonState } from './components/validation.js';
import {getUserApi, getCardsApi, editProfileApi, addCardApi, editAvatarApi, removeCardApi, putLikeApi, deleteLikeApi} from './components/api.js'

// переменные_________________________________________________________________________________________________________________________
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
// разметка попапа добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupNewCardBtn = popupNewCard.querySelector('.popup__button');
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
// попап аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditAvatarBtn = popupEditAvatar.querySelector('.popup__button');
const formEditAvatar = document.forms['edit-avatar'];
const avatarInput = formEditAvatar.elements['avatar'];
//попап удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_confirm-delete');
const popupDeleteCardBtn = popupDeleteCard.querySelector('.popup__button');

// функции инициализации данных_______________________________________________________________________________________________________
// функция инициалтизация данных профиля
const initialUser = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.style = `background-image: url(${data.avatar})`;
  profileImg.alt = data.name;
  profileId = data._id;
}
// функция инициалтизация данных карточек
Promise.all([getUserApi(), getCardsApi()])
.then((data) => {
  initialUser(data[0]);
  data[1].forEach((cardDetails) => {
        placesList.append(addCard(cardDetails, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId, putLikeApi, deleteLikeApi, removeCardApi, openModal, closeModal, popupDeleteCard, popupDeleteCardBtn));
      })
})

// функции работы с попапами__________________________________________________________________________________________________________
// функция открытия попапа картинки
const displayPopupImage = (event) => {
  ImagePopupImage.src = event.target.src;
  ImagePopupImage.alt = event.target.alt;
  captionPopupImage.textContent = event.target.alt;
  openModal(popupImage);
}
// функция добавления слушателей закрытия попапов
const setEventListnersClosePopup = () => {
  const closeBtnList = document.querySelectorAll('.popup__close');
  closeBtnList.forEach((closeBtn) => { 
    closeBtn.addEventListener('click', () => {
      closeModal(closeBtn.closest('.popup'));
    })
  })
}

// функции сабмитов форм______________________________________________________________________________________________________________
// функция отправки формы добавления карточки
const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();
  renderLoading(true, popupNewCardBtn);
  addCardApi(placeNameInput.value, linkInput.value)
  .then((data) => {
    placesList.prepend(addCard(data, removeCard, isLikeCard, displayPopupImage, cardTemplate, profileId, putLikeApi, deleteLikeApi, removeCardApi, openModal, closeModal, popupDeleteCard, popupDeleteCardBtn));
  })
  .finally(() => {
    renderLoading(false, popupNewCardBtn);
  })
  closeModal(popupNewCard);
}
// функция отправки формы редактирования профиля
const handleFormEditProfileSubmit = (event) => {
  event.preventDefault();
  renderLoading(true, popupEditBtn); 
  editProfileApi(nameInput.value, jobInput.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .finally(() => {
    renderLoading(false, popupEditBtn);
  })
  closeModal(popupEdit);
}
// функция отправки формы редактирования аватара
const handleFormEditAvatarSubmit = (event) => {
  renderLoading(true, popupEditAvatarBtn);
  event.preventDefault();
      editAvatarApi(avatarInput.value)
      .then((data) => {
        profileImg.style = `background-image: url(${data.avatar})`;
      })
      .finally(() => {
        renderLoading(false, popupEditAvatarBtn);
      })
  closeModal(popupEditAvatar);
}

//слушатели___________________________________________________________________________________________________________________________
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
// слушатель отправки формы редактирования профиля
formEdit.addEventListener('submit', handleFormEditProfileSubmit); 
// слушатель отправки формы добавления карточки
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);
// слушатель отправки формы изменения аватара пользователя
formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);
const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}
// включение функции закрытия попапов 
setEventListnersClosePopup();
// включение валидации
enableValidation();










