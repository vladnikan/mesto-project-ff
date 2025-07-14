import { cardTemplate } from "./index.js";
import { openImagePopup} from './modal.js';
//функция лайка

function likeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

//функция создания карточек

function cardCreate(cardData, cardDelete, imageClick, likeButtonClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  //картинки
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  imageElement.addEventListener('click', function() {
  openImagePopup(cardData.link, cardData.name);
  });

  //лайк
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener('click', () => likeClick(likeButton));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardDelete(cardElement);
  });

  return cardElement;
}

export {cardCreate, likeClick};
