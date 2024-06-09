export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
  modal.addEventListener('click', closeModalOverlay);
};

  export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  modal.removeEventListener('click', closeModalOverlay);
};



const closeModalOverlay = (event) => {
  if (event.target.classList.contains('popup')) {
    closeModal(event.target);
  }
}

const closeModalEsc = (event) => {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};