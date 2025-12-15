document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtn = document.querySelector(".read-more-btn");

  const hiddenContent = document.getElementById("author-more-text");

  if (readMoreBtn && hiddenContent) {
    readMoreBtn.addEventListener("click", () => {
      hiddenContent.classList.toggle("is-open");
      const isOpened = hiddenContent.classList.contains("is-open");
      readMoreBtn.textContent = isOpened ? "Приховати" : "Детальніше";
      readMoreBtn.setAttribute("data-status", isOpened ? "less" : "more");
    });
  }
});
