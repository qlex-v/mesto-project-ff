export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  const modalCloseButton = modal.querySelector('.popup__close');
  modalCloseButton.addEventListener('click', closeModal);
  modal.addEventListener('keydown', closeModalEsc);
  modal.addEventListener('click', closeModalOverlay);
};

  export const closeModal = (event) => {
  const modal = event.target.closest('.popup'); 
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', closeModal);
  modal.removeEventListener('keydown', closeModalEsc);
};

const closeModalEsc = (event) => {
  if (event.key === 'Escape') {
    closeModal(event);
  }
};

const closeModalOverlay = (event) => {
  if (event.target.classList.contains('popup')) {
    closeModal(event);
  }
}