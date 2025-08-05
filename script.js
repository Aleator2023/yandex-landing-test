const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const visibleCountEl = document.getElementById('visible-count');
const totalSlidesEl = document.getElementById('total-slides');

const slideCount = slides.length;
let index = 1; 

let slideInterval;
let isTransitioning = false;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide'); 

function setInitialPosition() {
  const width = allSlides[0].getBoundingClientRect().width;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${width * index}px)`;
}

function showSlide(i) {
  if (isTransitioning) return;
  const width = allSlides[0].getBoundingClientRect().width;
  isTransitioning = true;
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${width * i}px)`;
}

track.addEventListener('transitionend', () => {
  const width = allSlides[0].offsetWidth;

  if (allSlides[index].classList.contains('clone')) {
    track.style.transition = 'none';

    if (index === 0) {
      index = slideCount;
    } else if (index === allSlides.length - 1) {
      index = 1;
    }

    track.style.transform = `translateX(-${width * index}px)`;
  }

  isTransitioning = false;
});

function nextSlide() {
  if (index >= allSlides.length - 1) return;
  index++;
  showSlide(index);
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  showSlide(index);
}

function startAutoScroll() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

function stopAutoScroll() {
  clearInterval(slideInterval);
}


function updateVisibleCount() {
  const width = window.innerWidth;

  if (width < 768) {
    visibleCountEl.textContent = '1';
  } else if (width < 1024) {
    visibleCountEl.textContent = '2';
  } else {
    visibleCountEl.textContent = '3';
  }

  totalSlidesEl.textContent = slideCount; // 6
}

nextBtn.addEventListener('click', () => {
  stopAutoScroll();
  nextSlide();
  startAutoScroll();
});

prevBtn.addEventListener('click', () => {
  stopAutoScroll();
  prevSlide();
  startAutoScroll();
});


window.addEventListener('resize', () => {
  track.style.transition = 'none';
  setInitialPosition();
  updateVisibleCount();
});

window.addEventListener('load', () => {
  const slideCount = slides.length;
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  allSlides = document.querySelectorAll('.slide');
  index = 1;
  setInitialPosition();
  startAutoScroll();
  updateVisibleCount();
});