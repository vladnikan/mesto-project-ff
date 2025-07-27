import { deleteCard, dislikeCard, likeCard } from "./api";
//функция лайка

function likeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

//функция создания карточек

function createCard(
  cardData,
  cardDelete,
  clickImage,
  clickLikeButton,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  cardText.textContent = cardData.name;

  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id)
        .then((res) => {
          cardDelete(cardElement);
        })
        .catch((err) => {
          console.log("Ошибка удаления:", err);
        });
    });
  }

  cardImage.addEventListener("click", function () {
    clickImage(cardData.link, cardData.name);
  });

  //лайк

  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );

    const likeOrDislike = isLiked ? dislikeCard : likeCard;
    likeOrDislike(cardData._id)
      .then((res) => {
        likeClick(likeButton);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log("ОшибкаL", err);
      });
  });
  return cardElement;
}

export { createCard, likeClick };
