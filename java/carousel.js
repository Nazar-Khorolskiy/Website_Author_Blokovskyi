const cards = document.querySelectorAll('.book-card');
let activeIndex = 0;

function loopIndex(index) {
  return (index + cards.length) % cards.length;
}

function closeAllDescriptions() {
  document.querySelectorAll('.book-info.open').forEach(info => {
    info.classList.remove('open');
  });

  document.querySelectorAll('.book-card img').forEach(img => {
    img.style.display = "block";
  });
}

function updateCarousel() {
  closeAllDescriptions();

  const leftIndex = loopIndex(activeIndex - 1);
  const rightIndex = loopIndex(activeIndex + 1);

  cards.forEach((card, i) => {
    card.classList.remove('active', 'side-left', 'side-right', 'hidden');

    if (i === activeIndex) {
      card.classList.add('active');
    } else if (i === leftIndex) {
      card.classList.add('side-left');
    } else if (i === rightIndex) {
      card.classList.add('side-right');
    } else {
      card.classList.add('hidden');
    }
  });
}

updateCarousel();

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (index === activeIndex) {
      const info = card.querySelector('.book-info');
      const img = card.querySelector('img');

      const isOpen = info.classList.toggle('open');

      if (isOpen) {
        img.style.display = "none";
      } else {
        img.style.display = "block";
      }
      return;
    }

    activeIndex = index;
    updateCarousel();
  });
});
