import {
  popupImage,
  popupCaption,
  imagePopup,
  userName,
  description,
  nameInput,
  jobInput,
  imageInput,
  urlInput,
  formImage,
  addProfilePopup,
  placesList
} from './index.js';

import { cardCreate, likeClick } from './card.js';

// функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', escPopupClose);
};

// функция закрытия попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escPopupClose);
};

//закрытие попапа при нажатии на оверлей
function popupOverlayClose(popupElement) {
  popupElement.addEventListener('click', function(evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    };
  });
};

//закрытие попапа при нажатии на esc

function escPopupClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    };
  }
};

//попап изображений
function openImagePopup(src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openPopup(imagePopup);
};

//функция редактирования профиля
function handleFormSumbit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  description.textContent = jobInput.value;
};

//функция добавления изображений
function imageFormAdd(evt) {
  evt.preventDefault();

  const cardInput = {
    name: imageInput.value,
    link: urlInput.value
  }

  const newCard = cardCreate(cardInput, cardElement => {
    cardElement.remove()}, openImagePopup, likeClick);
    placesList.prepend(newCard);

    closePopup(addProfilePopup);

    formImage.reset();
};

export {
    openPopup, 
    closePopup, 
    popupOverlayClose, 
    escPopupClose, 
    openImagePopup, 
    handleFormSumbit, 
    imageFormAdd
};