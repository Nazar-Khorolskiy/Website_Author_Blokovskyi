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

/* Форма отправки сообщения на почту, с последующим фидбеком для пользователя и закрытием формы */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop"); //
  const closeBtn = document.querySelector(".modal-close-btn");

  const closeModal = () => {
    backdrop.classList.remove("is-open");

    form.reset();
    formFeedback.textContent = "";
    formFeedback.style.color = "initial";
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formActionUrl = form.getAttribute("action");

    formFeedback.textContent = "Отправка...";
    formFeedback.style.color = "blue";

    try {
      const response = await fetch(formActionUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        formFeedback.textContent = "Повідомлення відправлене. Дякую!";
        formFeedback.style.color = "green";

        setTimeout(closeModal, 3000);
      } else {
        formFeedback.textContent =
          "Ошибка при отправке. Проверьте правильность email.";
        formFeedback.style.color = "red";
      }
    } catch (error) {
      formFeedback.textContent = "Сетевая ошибка. Проверьте ваше соединение.";
      formFeedback.style.color = "red";
      console.error("Сетевая ошибка:", error);
    }
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeModal();
    }
  });
});
