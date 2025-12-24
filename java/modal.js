document.addEventListener("DOMContentLoaded", () => {
    const backdrop = document.getElementById("contact-backdrop");
    const form = document.querySelector(".contact-form");
    const openBtns = document.querySelectorAll(".contact-open");
    const closeBtn = document.querySelector(".modal-close-btn");
    const phoneInput = document.querySelector(".phone-input");

    const formFeedback = document.getElementById("form-feedback");

    if (!backdrop || !form) return;


    const openModal = () => {
        backdrop.classList.add("is-open");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        backdrop.classList.remove("is-open");
        document.body.style.overflow = "";
        form.reset();
        if (formFeedback) formFeedback.textContent = "";
    };

    openBtns.forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
            closeModal();
        }
    });


    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.startsWith("380")) {
                value = value.slice(3);
            }
            e.target.value = value.slice(0, 9);
        });
    }


    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formActionUrl = form.getAttribute("action") || "https://formspree.io/f/твой_id"; 
        
        if (formFeedback) {
            formFeedback.textContent = "Надсилання...";
            formFeedback.style.color = "blue";
        }

        try {
            const formData = new FormData(form);
            const response = await fetch(formActionUrl, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                form.reset();
                if (formFeedback) {
                    formFeedback.textContent = "Повідомлення відправлене. Дякую!";
                    formFeedback.style.color = "green";
                }
                setTimeout(closeModal, 2000);
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            if (formFeedback) {
                formFeedback.textContent = "Помилка мережі. Спробуйте пізніше.";
                formFeedback.style.color = "red";
            }
        }
    });
});