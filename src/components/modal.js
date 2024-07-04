// функция открытия попапа
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("click", closeModalOverlay);
};
// функция закрытия попапа
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", closeModalOverlay);
};
// функция закрытия попапа по клику вне его
const closeModalOverlay = (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
};
// функция закрытия попапа по нажатию Esc
const closeModalEsc = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};
// функция очистки ошибок
