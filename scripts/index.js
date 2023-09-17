import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonEditProfile = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")
const buttonAddProfile = document.querySelector(".profile__add");

// Далее идут переменные относящиеся к .popup
const editPopup = document.querySelector(".popup_type_show-edit");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close_type_edit");
const nameImput = editPopup.querySelector(".popup__input_add_firstname");
const dicsImput = editPopup.querySelector(".popup__input_add_disc");
const editPopupForm = editPopup.querySelector(".popup__content_type_edit")

// Далее идут переменные относящиеся к .popup_type_show-image/добавление карточек
const popupImg = document.querySelector(".popup_type_show-image");
const popupImgButtonClose = document.querySelector(".popup__close_type_img");
const popupImgForm = document.querySelector(".popup__content_type_img");
const viewPopup = document.querySelector(".popup_type_show-view");



// Эта переиспользуемая функция закрывает попапы
export const closePopup = (editPopup) => {
  editPopup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleCloseByEsc)
}
// Эта переиспользуемая функция открывает попапы
export const openPopup = (editPopup) => {
  editPopup.classList.add("popup_opened");
  document.addEventListener('keydown', handleCloseByEsc)
}

// Ниже описан функционал редактирования профиля 
buttonEditProfile.addEventListener("click", () => {
  openPopup(editPopup);
  nameImput.value = profileName.textContent;
  dicsImput.value = discription.textContent;
});

const closeButton = viewPopup.querySelector(".popup__close_type_view");
closeButton.addEventListener("click", () => {
  closePopup(viewPopup);
});


buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(editPopup);
});

editPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameImput.value;
  profileName.textContent = name;
  const disc = dicsImput.value;
  discription.textContent = disc;
  closePopup(editPopup);
});

// Ниже описан рендеринг шаблона
const placesContainer = document.querySelector(".places__container")

// Ниже описан функционал добавления карточек
buttonAddProfile.addEventListener("click", () => {
  openPopup(popupImg);
  placeImput.value = ""
  srcImput.value = ""
});

popupImgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});

const placeImput = popupImgForm.querySelector(".popup__input_add_place")
const srcImput = popupImgForm.querySelector(".popup__input_add_src")

const cardsContainer = document.querySelector(".places__container"); // Контейнер для карточек

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#cards-template");
  const cardElement = card.createCard(); // Создаем карточку с помощью метода createCard
  cardsContainer.append(cardElement); // Вставляем карточку в контейнер
});

const handleEditCardSubmit = (event) => {
  event.preventDefault()
  const name = placeImput.value
  const link = srcImput.value
  const placeData = {
    name,
    link,
  }

  const card = new Card(placeData, "#cards-template");
  const cardElement = card.createCard(); // Создаем карточку с помощью метода createCard
  placesContainer.prepend(cardElement);
  closePopup(popupImg);
}

popupImgForm.addEventListener("submit", handleEditCardSubmit);


// Функционал закрытия на ESC

const handleCloseByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

const handleClosebyClickonOverlay = (event) => {
  const popups = document.querySelectorAll('.popup')
  const targetPopups = Array.from(popups)
  targetPopups.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closePopup(popup)
      }
    })
  })
}
handleClosebyClickonOverlay()




// Валидация

export const formValidator = new FormValidator({
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error-message'
});

