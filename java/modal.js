const backdrop = document.querySelector(".backdrop");
const openBtns = document.querySelectorAll(".contact-open");
const closeBtn = document.querySelector(".modal-close-btn");
const phoneInput = document.querySelector(".phone-input");

const toggleModal = () => {
  backdrop.classList.toggle("is-open");
};

openBtns.forEach((btn) => {
  btn.addEventListener("click", toggleModal);
});

closeBtn.addEventListener("click", toggleModal);

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) toggleModal();
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 9);
});
