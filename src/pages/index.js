import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';

const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddProfile = document.querySelector(".profile__add");

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
  const place = formData.place;
  const src = formData.src;
  const cardElement = createCard(place, src);
  cardsSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const popupImgForm = document.querySelector(".popup__content_type_img");
const viewPopup = new PopupWithImage('.popup_type_show-view');
viewPopup.setEventListeners();

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
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    cardsSection.addItem(cardElement);
  }
}, '.places__container');

cardsSection.renderItems();

const profileEditingFormValidation = new FormValidator(validationConfig, editPopupForm);
profileEditingFormValidation.enableValidation();

const formForEditingCardValidation = new FormValidator(validationConfig, popupImgForm);
formForEditingCardValidation.enableValidation();

buttonEditProfile.addEventListener("click", () => {
  formForEditingCardValidation.resetValidationState();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  descInput.value = userInfoData.info;
  editProfilePopup.open();
  });

buttonAddProfile.addEventListener("click", () => {
  formForEditingCardValidation.resetValidationState();
  addCardPopup.open();
});