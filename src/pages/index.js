import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig, apiConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import '../pages/index.css';
import { Api } from "../components/Api.js";
import { PopupWithConfirmDelete } from "../components/PopupWithConfirmDelete.js";


/**----------------Api------------------------------ */
const api = new Api(apiConfig)

/**Получить ответ */

console.log(api.getInitialData());

Promise.all([api.getInitialData(), api.getInitialCards()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    console.log(userCurrentId);
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardsSection.renderItems(resCard, userCurrentId);
  })
  .catch((err) => {
    console.log(`Ошибка.....: ${err}`);
  })
/**-------------Карточки с изображением---------------------- */
/**Создание Popup изображения */

const viewPopup = new PopupWithImage('.popup_type_show-view');
/** Функция создания карточки */

const createCard = (data, user) => {
  const card = new Card({
    data: data, userId: user, templateSelector: '#cards-template',

    handleCardDelete: (cardID, cardElement) => {
      deleteCardPopup.open(cardID, cardElement);
    },

    handleCardClick: () => {
      viewPopup.open(data);
    },

    handleCardLike: (cardId) => {
      api.putCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        })
        .catch((err) => alert(err))
    },

    handleCardDeleteLike: (cardId) => {
      api.deleteCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res)
        })
        .catch((err) => alert(err))
    }


  });

  return card.generateCard();
}

/**Функция создания секции */

const cardsSection = new Section({
  renderer: (item, userID) => {
    cardsSection.addItem(createCard(item, userID));
  }
}, '.places__container');



/**-------------Popup добавления и редактирования----------------- */
/** Найти кнопки открытия Popup */
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddProfile = document.querySelector(".profile__add");
const buttonEditAvatar = document.querySelector(".profile__button-edit-avatar");
let userCurrentId;

/**Получение формы профиля */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  avatarSelector: ".profile__image"
});

/**Функция создания Popup редактировапния профиля */
const editProfilePopup = new PopupWithForm('.popup_type_show-edit', {
  submitCallback: (data) => {
    editProfilePopup.renderPreloader(true, 'Загрузка...')
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.updateProfileInfo(res);
        editProfilePopup.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        editProfilePopup.renderPreloader(false);
      })
  }
})

/**Функция открытия Popup редактировапния профиля */

buttonEditProfile.addEventListener("click", () => {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  validatorForms['form-profile'].clearValidationForm();
});

/**Функция создания Popup добавления карточки */
const addCardPopup = new PopupWithForm('.popup_type_show-image', {
  submitCallback: (data) => {
    addCardPopup.renderPreloader(true, 'Сохранение...')
    api.addNewCard(data)
      .then((newCard) => {
        cardsSection.prependItem(createCard(newCard, userCurrentId));
        addCardPopup.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        addCardPopup.renderPreloader(false);
      })
  }
})

/**Функция открытия Popup добавления карточки */
buttonAddProfile.addEventListener("click", () => {
  addCardPopup.open();
  validatorForms['form-place'].clearValidationForm();
});

/**Функция создания Popup редактирования аватара */
const updateAvatarPopup = new PopupWithForm('.popup__type_update-avatar-form', {
  submitCallback: (data) => {
    updateAvatarPopup.renderPreloader(true, 'Загрузка...')
    api.updateAvatar(data)
      .then((resUser) => {
        userInfo.setUserAvatar(resUser);
        updateAvatarPopup.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        updateAvatarPopup.renderPreloader(false);
      })
  }
})

/**Функция открытия Popup аватара */
buttonEditAvatar.addEventListener("click", () => {
  updateAvatarPopup.open();
  validatorForms['form-avatar'].clearValidationForm();
});

/**Функция создания Popup подтверждения удаления */

const deleteCardPopup = new PopupWithConfirmDelete('.popup_type_delete-card', {
  submitCallback: (id, card) => {
    deleteCardPopup.renderPreloader(true, 'Удаление...');
    api.deleteCard(id)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        deleteCardPopup.renderPreloader(false);
      })
  }
})


/**------------------Валидация---------------------- */
/**Получение экземпляров класса */
const validatorForms = {};

/**Функция валидации */

const enableValidation = (data) => {
  const listForm = Array.from(document.querySelectorAll(data.formSelector))
  listForm.forEach((formElement) => {
    const formValidator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute('name');

    validatorForms[formName] = formValidator;
    formValidator.enableValidation();
  })
}
/**Вызов функции валидации */
enableValidation(validationConfig);

/**Слушатели */
addCardPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
viewPopup.setEventListeners();