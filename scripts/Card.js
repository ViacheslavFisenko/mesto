import { openPopup, closePopup } from './index.js';
export class Card {
  constructor(cardData, templateSelector,) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".place__like")
      .addEventListener("click", this._handleLikeClick.bind(this));

    this._element
      .querySelector(".place__delete")
      .addEventListener("click", this._handleDeleteClick.bind(this));

    this._element
      .querySelector(".place__image")
      .addEventListener("click", this._handleImageClick.bind(this));
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".place__like");
    likeButton.classList.toggle("place__like-img_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    // Далее идут переменные относящиеся к .popup-view/просмотр изображений
    const viewPopup = document.querySelector(".popup_type_show-view");
    const popupViewImage = viewPopup.querySelector(".popup__image");
    const popupViewDescription = viewPopup.querySelector(".popup__description");
    popupViewImage.src = this._link;
    popupViewImage.alt = this._name;
    popupViewDescription.textContent = this._name;
    openPopup(viewPopup);
    
  }

   // Новый метод для создания и инициализации карточки
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".place__title").textContent = this._name;
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._name;

    return this._element;
  }
}
