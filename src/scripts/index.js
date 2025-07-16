import './card.js'
import './cards.js';
import '../styles/index.css';
import { initialCards } from './cards.js';
import {openPopup, closePopup, closePopupOverlay, closeEscPopup} from './modal.js'
import { createCard, likeClick } from './card.js';

const placesList = document.querySelector(".places__list");
//все попапы
const allPopups = document.querySelectorAll('.popup');

// попапы
const editPopup = document.querySelector('.popup_type_edit');
const addProfilePopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image'); 

// кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');

//кнопки крестика
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

//добавление карточек
initialCards.forEach(cardData => {
  const card = createCard(
    cardData, cardElement =>
    cardElement.remove(),
    openImagePopup,
    likeClick
  );
  placesList.append(card);
});

//добавление класса для анимации для всех попапов
allPopups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// открытие попапов
editButton.addEventListener('click', function () {
    nameInput.value = userName.textContent;
    jobInput.value = description.textContent;
    openPopup(editPopup);
});

addProfileButton.addEventListener('click', function () {
    openPopup(addProfilePopup);
});

//работа с картинками

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


closePopupOverlay(editPopup);
closePopupOverlay(addProfilePopup);
closePopupOverlay(imagePopup);

//редактирование имени и информации
const userName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

formEdit.addEventListener('submit', handleFormSumbit);

//добавление картинок

const formImage = document.forms['new-place'];
const imageInput = formImage.elements['place-name'];
const urlInput = formImage.elements.link;

formImage.addEventListener('submit', addImageForm);

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
function addImageForm(evt) {
  evt.preventDefault();

  const cardInput = {
    name: imageInput.value,
    link: urlInput.value
  }

  const newCard = createCard(cardInput, cardElement => {
    cardElement.remove()}, openImagePopup, likeClick);
    placesList.prepend(newCard);

    closePopup(addProfilePopup);

    formImage.reset();
};