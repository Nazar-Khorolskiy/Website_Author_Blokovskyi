const initBooksCarousel = () => {
  const cards = document.querySelectorAll(".book-card");
  const track = document.querySelector(".carousel-track");

  if (cards.length === 0 || !track) return;

  let activeIndex = 0;
  const loopIndex = (index) => (index + cards.length) % cards.length;

  const updateCarousel = () => {
    const leftIndex = loopIndex(activeIndex - 1);
    const rightIndex = loopIndex(activeIndex + 1);

    cards.forEach((card, i) => {
      card.classList.remove("active", "side-left", "side-right", "hidden");
      if (i === activeIndex) {
        card.classList.add("active");
      } else if (i === leftIndex) {
        card.classList.add("side-left");
      } else if (i === rightIndex) {
        card.classList.add("side-right");
      } else {
        card.classList.add("hidden");
      }
    });
  };

  cards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      if (index !== activeIndex) {
        e.preventDefault();
        activeIndex = index;
        updateCarousel();
      }
    });
  });

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        activeIndex = loopIndex(activeIndex + 1);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        activeIndex = loopIndex(activeIndex - 1);
      }
      updateCarousel();
    },
    { passive: true }
  );

  updateCarousel();
};

const initReviewsSlider = () => {
  const slider = document.getElementById("reviews-slider");
  const btnNext = document.getElementById("rev-next");
  const btnPrev = document.getElementById("rev-prev");

  if (!slider || !btnNext || !btnPrev) return;

  const scrollStep = () => {
    const card = slider.querySelector(".review-card");
    return card ? card.clientWidth + 20 : 300;
  };

  btnNext.onclick = () => {
    slider.scrollBy({ left: scrollStep(), behavior: "smooth" });
  };

  btnPrev.onclick = () => {
    slider.scrollBy({ left: -scrollStep(), behavior: "smooth" });
  };
};

document.addEventListener("DOMContentLoaded", () => {
  initBooksCarousel();
  initReviewsSlider();
});

/* Карусель для видео отзывов */

const videoSlider = document.getElementById("video-slider");
const vNext = document.getElementById("video-next");
const vPrev = document.getElementById("video-prev");

if (videoSlider && vNext && vPrev) {
  vNext.addEventListener("click", () => {
    const cardWidth = videoSlider.querySelector(".video-card").offsetWidth + 20;
    videoSlider.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  vPrev.addEventListener("click", () => {
    const cardWidth = videoSlider.querySelector(".video-card").offsetWidth + 20;
    videoSlider.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
}
