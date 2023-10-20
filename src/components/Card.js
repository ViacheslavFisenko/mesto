export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    

    // Вызываем _setEventListeners() для установки обработчиков
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Находим элементы карточки и сохраняем их в свойствах класса
    this._likeButton = this._element.querySelector(".place__like");
    this._deleteButton = this._element.querySelector(".place__delete");
    this._imageElement = this._element.querySelector(".place__image");

    this._likeButton.addEventListener("click", this._handleLikeClick.bind(this));
    this._deleteButton.addEventListener("click", this._handleDeleteClick.bind(this));
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("place__like-img_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  createCard() {
    if (!this._element || !this._imageElement || !this._likeButton || !this._deleteButton) {
      return null;
    }
  
    const titleElement = this._element.querySelector(".place__title");
    if (!titleElement) {
      return null;
    }
  
    // Если все элементы присутствуют, настраиваем их
    titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  
    return this._element;
  }
  
}
