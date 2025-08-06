document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.transform-section__item'));
  const track = document.querySelector('.transform-section__grid');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  const slideGroups = [
    [items[0], items[1]],
    [items[2]],
    [items[3], items[4]],
    [items[5]],
    [items[6]],
  ];

  let currentSlide = 0;

  function renderSlide(index) {
    
    track.innerHTML = '';
    slideGroups[index].forEach(item => track.appendChild(item));

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideGroups.length) % slideGroups.length;
    renderSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideGroups.length;
    renderSlide(currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlide(currentSlide);
    });
  });


  function initCarousel() {
    if (window.innerWidth <= 768) {
      document.querySelector('.carousel-navigation').style.display = 'flex';
      renderSlide(currentSlide);
    }
  }

  initCarousel();
  window.addEventListener('resize', () => location.reload()); 
});