// функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

// функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

//закрытие попапа при нажатии на оверлей
function closePopupOverlay(popupElement) {
  popupElement.addEventListener("click", function (evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    }
  });
}

//закрытие попапа при нажатии на esc

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup, closePopupOverlay, closeEscPopup };
