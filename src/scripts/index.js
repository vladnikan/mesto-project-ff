import './card.js'
import './cards.js';
import '../styles/index.css';
import { initialCards } from './cards.js';
import {openPopup, closePopup, popupOverlayClose, escPopupClose, openImagePopup, handleFormSumbit, imageFormAdd} from './modal.js'
import { cardCreate, likeClick } from './card.js';

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

//добавление карточек
initialCards.forEach(cardData => {
  const card = cardCreate(cardData, cardElement => {
    cardElement.remove(),
    openImagePopup,
    likeClick;
  });
  placesList.append(card);
});

const allPopups = document.querySelectorAll('.popup');
//добавление класса для анимации для всех попапов
allPopups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// попапы
const editPopup = document.querySelector('.popup_type_edit');
const addProfilePopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image'); 

// кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');

// кнопки закрытия попапов
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const addProfilePopupCloseButton = addProfilePopup.querySelector('.popup__close');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// открытие попапов
editButton.addEventListener('click', function () {
    openPopup(editPopup);
});

addProfileButton.addEventListener('click', function () {
    openPopup(addProfilePopup);
});


// закрытие попапов
editPopupCloseButton.addEventListener('click', function () {
    closePopup(editPopup);
});

addProfilePopupCloseButton.addEventListener('click', function () {
    closePopup(addProfilePopup);
});

imagePopupCloseButton.addEventListener('click', function () {
    closePopup(imagePopup);
});

//работа с картинками

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


popupOverlayClose(editPopup);
popupOverlayClose(addProfilePopup);
popupOverlayClose(imagePopup);

//редактирование имени и информации
const userName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

nameInput.value = userName.textContent;
jobInput.value = description.textContent;

formEdit.addEventListener('submit', handleFormSumbit);

//добавление картинок

const formImage = document.forms['new-place'];
const imageInput = formImage.elements['place-name'];
const urlInput = formImage.elements.link;

formImage.addEventListener('submit', imageFormAdd);

export {
  cardTemplate,
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
};