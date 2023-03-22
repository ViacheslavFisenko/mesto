const EditButtonLink = document.querySelector(".profile__edit");
const EditButtonPopup = document.querySelector(".popup");
const EditButtonClose = EditButtonPopup.querySelector(".popup__close");
const NameImput = EditButtonPopup.querySelector(".popup__input");
const DicsImput = EditButtonPopup.querySelector(".popup__input_desc");
const EditButtonPopupSubmit = EditButtonPopup.querySelector(".popup__button");
const EditButtonPopupForm = EditButtonPopup.querySelector(".popup__container")
const ProfileName = document.querySelector(".profile__name")
const Discription = document.querySelector(".profile__description")

EditButtonLink.addEventListener("click", () => {
  EditButtonPopup.classList.add("popup_open");
});

EditButtonClose.addEventListener("click", () => {
  EditButtonPopup.classList.remove("popup_open");
});

EditButtonPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name =  NameImput.value;
  ProfileName.innerHTML = name;
  const disc = DicsImput.value;
  Discription.innerHTML = disc;
  EditButtonPopup.classList.remove("popup_open");

});
