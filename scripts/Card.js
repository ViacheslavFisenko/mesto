class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.place__delete').addEventListener('click', this._handleDeleteClick);
    this._element.querySelector('.place__image').addEventListener('click', this._handleImageClick);
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector('.place__like');
    // логика для обработки лайка.
    likeButton.classList.toggle('place__like-img_active');
  }

  _handleDeleteClick() {
    // лоогика для удаления карточки.
    const isConfirmed = confirm('Вы уверены, что хотите удалить эту карточку?');
    if (isConfirmed) {
      this._element.remove();
    }
  }

  _handleImageClick() {
    // логика для открытия изображения в попапе.
    const popupImage = document.querySelector('.popup__image');
    const popupDescription = document.querySelector('.popup__description');
    popupImage.src = this._data.link;
    popupImage.alt = this._data.name;
    popupDescription.textContent = this._data.name;
    openPopup(viewPopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__title').textContent = this._data.name;
    const placeImage = this._element.querySelector('.place__image');
    placeImage.src = this._data.link;
    placeImage.alt = this._data.name;

    return this._element;
  }
}

export { Card };
