const html = document.querySelector('html');
const body = document.querySelector('body');
const inner = document.querySelector('.inner');
const mailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

let cls = {
  error: '--error',
  show: '--show',
  hide: '--hide',
  active: '--active',
}

document.addEventListener('DOMContentLoaded', function () {
  // CHECK INIT
  let checks = document.querySelectorAll('.check');
  if (checks) {
    checks.forEach((check) => {
      new Check(check);
    });
  }

  // ANIMATION
  let anBlocks = document.querySelectorAll('.an');

  function animatedBlocks() {
    let Y = window.scrollY;
    let visibleHeight = window.innerHeight - 100;
    anBlocks.forEach((block) => {
      if (!block.classList.contains('--loaded')) {
        let timeout = block.getAttribute('data-timeout');
        if (timeout) {
          block.style.transitionDelay = timeout;
        }
        if (block.getBoundingClientRect().top < visibleHeight) {
          block.classList.add('--loaded');
        }
      }
    });
  }

  setTimeout(() => {
    animatedBlocks();
    document.addEventListener('scroll', () => {
      animatedBlocks();
    });
  }, 500);

  // HEADER MENU NAV
  let menuNav = document.querySelector('.header__main');
  let menuHam = document.querySelector('.ham');

  if (menuHam) {
    for (let i = 0; i < 3; i++) {
      let div = document.createElement('div');
      menuHam.append(div);
    }

    menuHam.addEventListener('click', () => {
      menuNav.classList.toggle('--show');
      menuHam.classList.toggle('--toggle');

      html.classList.toggle('overflow-disable');
      body.classList.toggle('overflow-disable');
      inner.classList.toggle('overflow-disable');
    });
  }

  // VIDEO SLIDER
  let videoSlider = document.querySelector('.video__slider-inner');

  if (videoSlider) {
    let videoSliderSwiper = new Swiper(videoSlider, {
      slidesPerView: 3,
      spaceBetween: 33,
      speed: 900,
      navigation: {
        prevEl: '.video__slider-arrow.swiper-button-prev',
        nextEl: '.video__slider-arrow.swiper-button-next',
      },
    });
  }

  // FAQ TOGGLES
  let faqs = document.querySelectorAll('.faq__item');
  if (faqs) {
    faqs.forEach((faq) => {
      faq.question = faq.querySelector('.faq__question');
      faq.answer = faq.querySelector('.faq__answer');

      faq.question.addEventListener('click', () => {
        faq.classList.toggle(cls.active);
      });
    });
  }

})