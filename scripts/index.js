const editButtonLink = document.querySelector(".profile__edit");
const editPopup = document.querySelector(".popup");
const editButtonClose = editPopup.querySelector(".popup__close");
const nameImput = editPopup.querySelector(".popup__input_add_firstname");
const dicsImput = editPopup.querySelector(".popup__input_add_disc");
const editPopupForm = editPopup.querySelector(".popup__content")
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")


const openPopup = (editPopup) => {
  editPopup.classList.add("popup_opened");
}

editButtonLink.addEventListener("click", () => {
  openPopup(editPopup);
  nameImput.value = profileName.textContent;
  dicsImput.value = discription.textContent;
});


const closePopup = (editPopup) => {
  editPopup.classList.remove("popup_opened");
}


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


