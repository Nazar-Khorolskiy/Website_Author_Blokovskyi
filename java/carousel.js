const cards = document.querySelectorAll('.book-card');
let activeIndex = 0;

function loopIndex(index) {
  return (index + cards.length) % cards.length;
}

function closeAllDescriptions() {
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
  card.addEventListener('click', (event) => {
    
    if (index !== activeIndex) {
      event.preventDefault(); 
      
      activeIndex = index;
      updateCarousel();
      
      return; 
    }
  });
});


let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;

const track = document.querySelector('.carousel-track');

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        activeIndex = loopIndex(activeIndex + 1);
        updateCarousel();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        activeIndex = loopIndex(activeIndex - 1);
        updateCarousel();
    }
}

track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

track.addEventListener('touchmove', (e) => {
    let touchMoveX = e.touches[0].clientX;
    let touchMoveY = e.touches[0].clientY;

    let deltaX = Math.abs(touchMoveX - touchStartX);
    let deltaY = Math.abs(touchMoveY - touchStartY);

    if (deltaX > deltaY) {
        if (e.cancelable) e.preventDefault();
    }
}, { passive: false });

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}, { passive: false });