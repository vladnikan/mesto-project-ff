//функция лайка

function likeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};


//функция создания карточек

function createCard(cardData, cardDelete, clickImage, clickLikeButton) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__title');

  
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  cardText.textContent = cardData.name;

  cardImage.addEventListener('click', function() {
    clickImage(cardData.link, cardData.name);
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

export {createCard, likeClick};
