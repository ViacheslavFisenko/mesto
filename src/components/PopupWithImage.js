import Popup from '../components/Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupDescription = this._popup.querySelector('.popup__description');
    }

    open(image) {
        super.open();
        this._popupImage.src = image.link;
        this._popupImage.alt = image.name;
        this._popupDescription.textContent = image.name;
        
    }
}
