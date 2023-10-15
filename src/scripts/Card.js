export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".place__like");
    likeButton.classList.toggle("place__like-img_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".place__title").textContent = this._name;
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._name;

    return this._element;
  }
}
