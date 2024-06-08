import { initialCards } from "../scripts/cards";
import { addCard, removeCard, isLikeCard } from "../scripts/cards";
import {placesList, newPlaceForm, placeNameInput, linkInput} from "../index.js";
import { closeModal } from "./modal.js";

export const handleFormNewPlaceSubmit = (event) => {
  event.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  initialCards.push({name, link});
  addCard({name, link});
  newPlaceForm.reset();
  placesList.prepend(addCard({name, link}, removeCard, isLikeCard));
  closeModal(event);
}


