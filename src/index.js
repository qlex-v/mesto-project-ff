//импорт______________________________________________________________________________________________________________________________
import "./pages/index.css";
import { addCard, isLikeCard, removeCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserApi,
  getCardsApi,
  editProfileApi,
  addCardApi,
  editAvatarApi,
  removeCardApi,
  putLikeApi,
  deleteLikeApi,
} from "./components/api.js";
import { handleSubmit } from "./components/utils.js";

// переменные_________________________________________________________________________________________________________________________
let profileId;
const content = document.querySelector(".content");
const spinner = document.querySelector(".spinner");
const optionsValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__text-error_active",
};
// темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// разметка списка карточек
const placesList = document.querySelector(".places__list");
// разметка профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
// разметка попапа редактирования профиля
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
// разметка попапа добавления карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");
// форма редактирования профиля
const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.elements["name"];
const jobInput = formEdit.elements["description"];
// форма добавления карточки
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];
// попап картинки
const popupImage = document.querySelector(".popup_type_image");
const imagePopupImage = popupImage.querySelector(".popup__image");
const captionPopupImage = popupImage.querySelector(".popup__caption");
// попап аватара
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar.elements["avatar"];
//попап удаления карточки
const popupDeleteCard = document.querySelector(".popup_type_confirm-delete");
const formDeleteCard = document.forms["confirm-delete"];
// функции инициализации данных_______________________________________________________________________________________________________
// функция инициалтизация данных профиля
const initialUser = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.style = `background-image: url(${data.avatar})`;
  profileImg.alt = data.name;
  cardData.profileId = data._id;
};
renderLoadingContent(true);
// функция инициалтизация данных карточек
Promise.all([getUserApi(), getCardsApi()])
  .then(([userData, cards]) => {
    initialUser(userData);
    cards.forEach((cardDetails) => {
      cardData.cardDetails = cardDetails;
      placesList.append(addCard(cardData));
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoadingContent(false);
  });
// функции работы с попапами__________________________________________________________________________________________________________
// функция открытия попапа картинки
const displayPopupImage = (event) => {
  imagePopupImage.src = event.target.src;
  imagePopupImage.alt = event.target.alt;
  captionPopupImage.textContent = event.target.alt;
  openModal(popupImage);
};
// функция добавления слушателей закрытия попапов
const setEventListnersClosePopup = () => {
  const closeBtnList = Array.from(document.querySelectorAll(".popup__close"));
  closeBtnList.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeModal(closeBtn.closest(".popup"));
    });
  });
};

// функции сабмитов форм______________________________________________________________________________________________________________
// функция отправки формы добавления карточки
const handleFormNewPlaceSubmit = (event) => {
  function makeRequest() {
    return addCardApi(placeNameInput.value, linkInput.value).then((data) => {
      cardData.cardDetails = data;
      placesList.prepend(addCard(cardData));
      closeModal(popupNewCard);
    });
  }
  handleSubmit(makeRequest, event);
};
// функция отправки формы редактирования профиля
const handleFormEditProfileSubmit = (event) => {
  function makeRequest() {
    return editProfileApi(nameInput.value, jobInput.value).then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEdit);
    });
  }
  handleSubmit(makeRequest, event);
};
// функция отправки формы редактирования аватара
const handleFormEditAvatarSubmit = (event) => {
  function makeRequest() {
    return editAvatarApi(avatarInput.value).then((data) => {
      profileImg.style = `background-image: url(${data.avatar})`;
      closeModal(popupEditAvatar);
    });
  }
  handleSubmit(makeRequest, event);
};
//функция удаления карточки
const handleCardDelete = (event) => {
  function makeRequest() {
    return removeCardApi(cardData.idCardRemove).then(() => {
      const cardRemove = document.querySelector(
        `.card[id="${cardData.idCardRemove}"]`
      );
      cardRemove.remove();
      closeModal(popupDeleteCard);
    });
  }
  handleSubmit(makeRequest, event, "Удаление...");
};
//слушатели___________________________________________________________________________________________________________________________
// слушатель кнопки редактирования аватара
profileImg.addEventListener("click", () => {
  clearValidation(formEditAvatar, optionsValidation);
  formEditAvatar.reset();
  openModal(popupEditAvatar);
});
// слушатель кнопки редактирования профиля
profileEditBtn.addEventListener("click", () => {
  clearValidation(formEdit, optionsValidation);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});
//слушатель кнопки добавления карточки
profileAddBtn.addEventListener("click", () => {
  clearValidation(newPlaceForm, optionsValidation);
  newPlaceForm.reset();
  openModal(popupNewCard);
});
// // слушатель отправки формы редактирования профиля
formEdit.addEventListener("submit", handleFormEditProfileSubmit);
// // слушатель отправки формы добавления карточки
newPlaceForm.addEventListener("submit", handleFormNewPlaceSubmit);
// // слушатель отправки формы изменения аватара пользователя
formEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit);
// слушатель удаления карточки
formDeleteCard.addEventListener("submit", handleCardDelete);
// включение функции закрытия попапов
setEventListnersClosePopup();
// включение валидации
enableValidation(optionsValidation);
// функция отображения прелоадера
function renderLoadingContent(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden");
  }
}
//данные для инициализации карточки
const cardData = {
  cardDetails: {},
  removeCard: removeCard,
  isLikeCard: isLikeCard,
  displayPopupImage: displayPopupImage,
  cardTemplate: cardTemplate,
  profileId: profileId,
  putLikeApi: putLikeApi,
  deleteLikeApi: deleteLikeApi,
  openModal: openModal,
  popupDeleteCard: popupDeleteCard,
  idCardRemove: "",
};
