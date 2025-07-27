import "./card.js";
import "./cards.js";
import "../styles/index.css";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
  closeEscPopup,
} from "./modal.js";
import { createCard, likeClick } from "./card.js";
import { enableValidation, resetValidationMessage } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  editUserInfo,
  updateAvatar,
  addCard,
} from "./api.js";

const placesList = document.querySelector(".places__list");

//все попапы
const allPopups = document.querySelectorAll(".popup");

// попапы
const editPopup = document.querySelector(".popup_type_edit");
const addProfilePopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// кнопки открытия попапов
const editButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__image");

//кнопки крестика
const closeButtons = document.querySelectorAll(".popup__close");

//userId
let userId = null;

//запрос инфы с сервера о данных пользователя и карточках
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    userName.textContent = userData.name;
    description.textContent = userData.about;

    const profilePicture = document.querySelector(".profile__image");

    profilePicture.style.backgroundImage = `url('${userData.avatar}')`;

    console.log(cards);
    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        (cardElement) => cardElement.remove(),
        openImagePopup,
        likeClick,
        userId
      );
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.log("Ошибка:", err);
  });

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//добавление класса для анимации для всех попапов
allPopups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// открытие попапов
editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = description.textContent;
  resetValidationMessage(formEdit);
  openPopup(editPopup);
});

addProfileButton.addEventListener("click", function () {
  formImage.reset();
  resetValidationMessage(formImage);
  openPopup(addProfilePopup);
});

editAvatarButton.addEventListener("click", function () {
  formAvatar.reset();
  resetValidationMessage(formAvatar);
  openPopup(avatarPopup);
});

//работа с картинками

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

closePopupOverlay(editPopup);
closePopupOverlay(addProfilePopup);
closePopupOverlay(imagePopup);
closePopupOverlay(avatarPopup);

//редактирование имени и информации
const userName = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

formEdit.addEventListener("submit", handleFormSumbit);

//аватарки

const formAvatar = document.forms["new-avatar"];
const avaInput = formAvatar.elements.link;

//добавление картинок

const formImage = document.forms["new-place"];
const imageInput = formImage.elements["place-name"];
const urlInput = formImage.elements.link;

formImage.addEventListener("submit", addImageForm);

//попап изображений
function openImagePopup(src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openPopup(imagePopup);
}

//функция редактирования профиля
function handleFormSumbit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  const saveButton = formEdit.querySelector(".popup__button");
  const buttonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  editUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      saveButton.textContent = buttonText;
    });
}

//функция добавления изображений
function addImageForm(evt) {
  evt.preventDefault();

  const saveButton = formImage.querySelector(".popup__button");
  const buttonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  addCard({
    name: imageInput.value,
    link: urlInput.value,
  })
    .then((cardData) => {
      console.log(cardData);
      const newCard = createCard(
        cardData,
        (cardElement) => cardElement.remove(),
        openImagePopup,
        likeClick,
        userId
      );
      placesList.prepend(newCard);

      closePopup(addProfilePopup);
      formImage.reset();
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      saveButton.textContent = buttonText;
    });
}

function changeAvatar(evt) {
  evt.preventDefault();

  const saveButton = formAvatar.querySelector(".popup__button");
  const buttonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  updateAvatar({
    avatar: avaInput.value,
  })
    .then((res) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(avatarPopup);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      saveButton.textContent = buttonText;
    });
}

formAvatar.addEventListener("submit", changeAvatar);

enableValidation();
