import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";

const buttonEditProfile = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")
const buttonAddProfile = document.querySelector(".profile__add");

// Далее идут переменные относящиеся к .popup
const editPopup = new Popup('.popup_type_show-edit');
editPopup.setEventListeners()
const buttonClosePopupProfile = document.querySelector(".popup__close_type_edit");
const nameImput = document.querySelector(".popup__input_add_firstname");
const dicsImput = document.querySelector(".popup__input_add_disc");
const editPopupForm = document.querySelector(".popup__content_type_edit")

const editProfilePopup = new PopupWithForm('.popup_type_show-edit', (formData) => {
  // Здесь можно обработать данные формы для редактирования профиля
  // formData содержит данные полей формы
  const name = formData.name;
  const description = formData.description;

  // Обновляем информацию о пользователе на странице
  userInfo.setUserInfo({ name, info: description });
  // Закрываем попап после успешного сохранения данных
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_show-image', (formData) => {
  // Здесь можно обработать данные формы для добавления карточки
  // formData содержит данные полей формы
  const name = formData.name;
  const link = formData.link;

  // Создаем новую карточку и добавляем её на страницу
  const cardElement = createCard(name, link);
  cardsSection.addItem(cardElement);
});
addCardPopup.setEventListeners();

// Далее идут переменные относящиеся к .popup_type_show-image/добавление карточек
const popupImg = new Popup('.popup_type_show-image');
popupImg.setEventListeners()
const popupImgButtonClose = document.querySelector(".popup__close_type_img");
const popupImgForm = document.querySelector(".popup__content_type_img");
const viewPopup = new Popup('.popup_type_show-view');
viewPopup.setEventListeners()
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

  // Создаем экземпляр класса Card и передаем handleCardClick
  const card = new Card(placeData, "#cards-template", handleCardClick);
  const cardElement = card._createCard();

  return cardElement;
}

// Создаем экземпляр класса Section для добавления новых карточек
const cardsSection = new Section({
  items: [], // Передаем пустой массив, так как начальные карточки уже отрисованы
  renderer: (cardData) => { // Функция-рендерер для создания DOM-элементов
    const cardElement = createCard(cardData.name, cardData.link);
    cardsSection.addItem(cardElement);
  }
}, '.places__container');

// Создаем экземпляр класса Section для отрисовки начальных карточек
const initialCardsSection = new Section({
  items: initialCards, // Массив данных для отрисовки
  renderer: (cardData) => { // Функция-рендерер для создания DOM-элементов
    const cardElement = createCard(cardData.name, cardData.link);
    initialCardsSection.addItem(cardElement);
  }
}, '.places__container');

// Вызываем метод renderItems для отрисовки начальных карточек
initialCardsSection.renderItems();

popupImgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  popupImgForm.reset();
  popupImg.close();
});

document.addEventListener('DOMContentLoaded', () => {
  const profileEditingFormValidation = new FormValidator({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error-message'
  }, editPopupForm); // Передаем элемент формы вторым параметром

  profileEditingFormValidation.enableValidation();
});

document.addEventListener('DOMContentLoaded', () => {
  const formForEddingCardValidation = new FormValidator({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error-message'
  }, popupImgForm); // Передаем элемент формы вторым параметром

  // Ниже описан функционал редактирования профиля 
  buttonEditProfile.addEventListener("click", () => {
    formForEddingCardValidation.resetError();
    editPopup.open();
    nameImput.value = profileName.textContent;
    dicsImput.value = discription.textContent;
  });

  // Ниже описан функционал добавления карточек
  buttonAddProfile.addEventListener("click", () => {
    formForEddingCardValidation.resetError();
    popupImg.open();
    popupImgForm.reset()
  });

  popupImgButtonClose.addEventListener("click", () => {
    popupImg.close();
    popupImgForm.reset()
  });

  formForEddingCardValidation.enableValidation();
});
