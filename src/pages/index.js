import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';
import { Api } from "../components/Api.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'a1141784-64c6-4595-a681-05c051f7ce45',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then(data => {
    // Обновить информацию о пользователе на странице
    const { name, about, avatar } = data;
    userInfo.setUserInfo({ name, about });
    userInfo.setUserAvatar(avatar);
  })
  .catch(error => {
    // Обработать ошибку
    console.error('There was a problem with the fetch operation:', error);
  });

const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddProfile = document.querySelector(".profile__add");
const buttonEditAvatar = document.querySelector(".profile__button-edit-avatar");

const nameInput = document.querySelector(".popup__input_add_firstname");
const descInput = document.querySelector(".popup__input_add_disc");
const editPopupForm = document.querySelector(".popup__content_type_edit");

const cardsSection = new Section({
  items: [], // Изначально пустой массив, так как данные будут получены с сервера
  renderer: (cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    cardsSection.addItem(cardElement);
  }
}, '.places__container');

// Запрашиваем данные с сервера и обновляем _items
api.getInitialCards()
  .then((data) => {
    data.forEach(cardData => {
      const card = new Card(cardData, '#cards-template', (name, link) => {
        // Здесь может быть ваш обработчик клика на карточку
        // Например, открытие попапа с изображением
      });
      const cardElement = card.createCard();
      if (cardElement) {
        cardsSection.addItem(cardElement);
      }
    });
    cardsSection.renderItems(); // Рендерим карточки
  })
  .catch((error) => {
    console.error(`Ошибка при получении карточек: ${error}`);
  });

  

const editProfilePopup = new PopupWithForm('.popup_type_show-edit', (formData) => {
  const name = formData.name;
  const about = formData.about;
  // Отправка данных на сервер
  api.updateProfileInfo(name, about)
    .then((data) => {
      // Обработать ответ от сервера (если нужно)
      const { name, about } = data;
      userInfo.setUserInfo({ name, about });
      editProfilePopup.close();
    })
    .catch((error) => {
      // Обработать ошибку
      console.error('Error updating profile:', error);
    });
});
editProfilePopup.setEventListeners();

const updateAvatarPopup = new PopupWithForm('.popup__type_update-avatar-form', (formData) => {
  const avatar = formData.avatar;
  // Отправка данных на сервер для обновления аватара
  api.updateAvatar(avatar)
    .then((data) => {
      // Обработать ответ от сервера (если нужно)
      userInfo.setUserAvatar(data.avatar); // Обновить аватар пользователя
      updateAvatarPopup.close(); // Закрыть попап
    })
    .catch((error) => {
      // Обработать ошибку
      console.error('Error updating avatar:', error);
    });
});
updateAvatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_show-image', (formData) => {
  const place = formData.place;
  const src = formData.src;

  createCardAndAddToServer(place, src);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const popupImgForm = document.querySelector(".popup__content_type_img");
const viewPopup = new PopupWithImage('.popup_type_show-view');
viewPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  avatarSelector: ".popup__input_add_src-avatar"
});

const profileEditingFormValidation = new FormValidator(validationConfig, editPopupForm);
profileEditingFormValidation.enableValidation();

const formForEditingCardValidation = new FormValidator(validationConfig, popupImgForm);
formForEditingCardValidation.enableValidation();

const formForUpdateAvatarPopupValidation = new FormValidator(validationConfig, popupImgForm);
formForUpdateAvatarPopupValidation.enableValidation();

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

buttonEditAvatar.addEventListener("click", () => {
  formForUpdateAvatarPopupValidation.resetValidationState();
  updateAvatarPopup.open();
});