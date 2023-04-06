const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

//далее идут переменные относящиеся к .popup
const editButtonLink = document.querySelector(".profile__edit");
const editPopup = document.querySelector(".popup");
const editButtonClose = editPopup.querySelector(".popup__close");
const nameImput = editPopup.querySelector(".popup__input_add_firstname");
const dicsImput = editPopup.querySelector(".popup__input_add_disc");
const editPopupForm = editPopup.querySelector(".popup__content")
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")
//далее идут переменные относящиеся к .popup-img
const editPopupImg = document.querySelector(".popup-img");
const editButtonLinkImg = document.querySelector(".profile__add");
const editButtonCloseImg = document.querySelector(".popup__close-image");
const editCardForm = document.querySelector(".popup__content-img");



//эта переиспользуемая функция закрывает попапы
const closePopup = (editPopup) => {
  editPopup.classList.remove("popup_opened");
}

//эта переиспользуемая функция открывает попапы
const openPopup = (editPopup) => {
  editPopup.classList.add("popup_opened");
}

//ниже описан функционал редактирования профиля 
editButtonLink.addEventListener("click", () => {
  openPopup(editPopup);
  nameImput.value = profileName.textContent;
  dicsImput.value = discription.textContent;
});

editButtonClose.addEventListener("click", () => {
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

//ниже описан рендеринг шаблона
const cardsTemplate = document.getElementById("cards-template")
const placesContainer = document.querySelector(".places__container")

const createCardElement = (cardData) => {
  const cardElement = cardsTemplate.content.querySelector(".place").cloneNode(true)
  const cardTitle = cardElement.querySelector(".place__title")
  const cardImage = cardElement.querySelector(".place__image")

  cardTitle.textContent = cardData.name
  cardImage.src = cardData.link

  const deleteButton = cardElement.querySelector(".place__delete")
  const likeButton = cardElement.querySelector(".place__like")

  const handleDelete = () => {
    cardElement.remove()
  }

  const handleLike = () => {
    likeButton.classList.toggle('place__like-img_active_black')

  }

  deleteButton.addEventListener('click', handleDelete)

  likeButton.addEventListener('click', handleLike)

  return cardElement
}

const renderCardElement = (cardElement) => {
  placesContainer.prepend(cardElement)
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card))
})

//ниже описан функционал добавления карточек
editButtonLinkImg.addEventListener("click", () => {
  openPopup(editPopupImg);
});

editButtonCloseImg.addEventListener("click", () => {
  closePopup(editPopupImg);
});

const handleEditCardSubmit = (event) => {
  event.preventDefault()
  const placeImput = editCardForm.querySelector(".popup__input_add_place")
  const srcImput = editCardForm.querySelector(".popup__input_add_src")
  const name = placeImput.value
  const link = srcImput.value
  const placeData = {
    name,
    link,
  }
  renderCardElement(createCardElement(placeData))
  closePopup(editPopupImg);
}

editCardForm.addEventListener("submit", handleEditCardSubmit)

//ниже описан функционал просмотра картинок

