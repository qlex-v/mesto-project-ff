// Функция добавления карточки
export const addCard = (cardData) => {
  const card = cardData.cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDelBtn = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardLikeBtn = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  cardData.cardDetails.likes.forEach((like) => {
    if (like._id === cardData.profileId) {
      cardLikeBtn.classList.add("card__like-button_is-active");
    }
  });
  cardTitle.textContent = cardData.cardDetails.name;
  card.id = cardData.cardDetails._id;
  cardImage.src = cardData.cardDetails.link;
  cardImage.alt = cardData.cardDetails.name;
  cardLikeCounter.textContent = cardData.cardDetails.likes.length;

  if (cardData.cardDetails.owner._id === cardData.profileId) {
    cardDelBtn.addEventListener("click", (event) => {
      cardData.removeCard(event, cardData);
    });
  } else {
    cardDelBtn.remove();
  }

  cardLikeBtn.addEventListener("click", (event) => {
    cardData.isLikeCard(
      event,
      cardData.putLikeApi,
      cardData.deleteLikeApi,
      cardLikeCounter
    );
  });

  cardImage.addEventListener("click", (event) => {
    cardData.displayPopupImage(event);
  });

  return card;
};

// Функция добавления/удаления лайка
export const isLikeCard = (
  event,
  putLikeApi,
  deleteLikeApi,
  cardLikeCounter
) => {
  const card = event.target.closest(".card");
  const cardId = card.id;
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLikeApi(cardId)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLikeApi(cardId)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        event.target.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Функция удаления карточки
export const removeCard = (event, cardData) => {
  const listItem = event.target.closest(".card");
  const cardId = listItem.id;
  cardData.idCardRemove = cardId;
  cardData.openModal(cardData.popupDeleteCard);
};
