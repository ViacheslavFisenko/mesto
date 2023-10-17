import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';

const buttonEditProfile = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const buttonAddProfile = document.querySelector(".profile__add");

const editPopup = new PopupWithForm('.popup_type_show-edit');
editPopup.setEventListeners();

const buttonClosePopupProfile = document.querySelector(".popup__close_type_edit");
const nameInput = document.querySelector(".popup__input_add_firstname");
const descInput = document.querySelector(".popup__input_add_disc");
const editPopupForm = document.querySelector(".popup__content_type_edit");

const editProfilePopup = new PopupWithForm('.popup_type_show-edit', (formData) => {
  const name = formData.name;
  const description = formData.description;

  userInfo.setUserInfo({ name, info: description });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_show-image', (formData) => {
  const name = formData.name;
  const link = formData.link;

  const cardElement = createCard(name, link);
  cardsSection.addItem(cardElement);
});
addCardPopup.setEventListeners();

const popupImg = new PopupWithForm('.popup_type_show-image');
popupImg.setEventListeners();
const popupImgButtonClose = document.querySelector(".popup__close_type_img");
const popupImgForm = document.querySelector(".popup__content_type_img");
const viewPopup = new PopupWithImage('.popup_type_show-view');
viewPopup.setEventListeners();
const viewPopupButtonClose = document.querySelector(".popup__close_type_view");

buttonEditProfile.addEventListener('click', () => {
  editPopup.open();
});

buttonAddProfile.addEventListener('click', () => {
  popupImg.open();
});

popupImgButtonClose.addEventListener('click', () => {
  popupImg.close();
});

buttonClosePopupProfile.addEventListener('click', () => {
  editPopup.close();
});

viewPopupButtonClose.addEventListener('click', () => {
  viewPopup.close();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description"
});

const handleCardClick = (name, link) => {
  viewPopup.open(link, name);
};

const createCard = (name, link) => {
  const placeData = {
    name,
    link,
  };

  const card = new Card(placeData, "#cards-template", handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

const cardsSection = new Section({
  items: [],
  renderer: (cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    cardsSection.addItem(cardElement);
  }
}, '.places__container');

const initialCardsSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    initialCardsSection.addItem(cardElement);
  }
}, '.places__container');

initialCardsSection.renderItems();

popupImgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  popupImgForm.reset();
  popupImg.close();
});

document.addEventListener('DOMContentLoaded', () => {
  const profileEditingFormValidation = new FormValidator(validationConfig, editPopupForm);
  profileEditingFormValidation.enableValidation();

  const formForEditingCardValidation = new FormValidator(validationConfig, popupImgForm);
  formForEditingCardValidation.enableValidation();

  buttonEditProfile.addEventListener("click", () => {
    formForEditingCardValidation.resetValidationState();
    editPopup.open();
    nameInput.value = profileName.textContent;
    descInput.value = description.textContent;
  });

  buttonAddProfile.addEventListener("click", () => {
    formForEditingCardValidation.resetValidationState();
    popupImg.open();
    popupImgForm.reset();
  });

  popupImgButtonClose.addEventListener("click", () => {
    popupImg.close();
    popupImgForm.reset();
  });

  formForEditingCardValidation.enableValidation();
});
