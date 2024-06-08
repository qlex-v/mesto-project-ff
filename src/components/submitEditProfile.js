import { nameInput, jobInput, profileTitle, profileDescription } from "../index.js";
import { closeModal } from "./modal.js";

export function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 

  const name = nameInput.value;
  const job = jobInput.value;
  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(evt);
}