// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

function cardCreate(cardData, cardDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardDelete(cardElement);
  });

  return cardElement;
}

initialCards.forEach(cardData => {
  const card = cardCreate(cardData, cardElement => {
    cardElement.remove();
  });
  
  placesList.append(card);
});
