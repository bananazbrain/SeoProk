const html = document.querySelector('html');
const body = document.querySelector('body');
const inner = document.querySelector('.inner');
const mailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

let cls = {
  error: '--error',
  show: '--show',
  hide: '--hide',
  active: '--active',
  toggle: '--toggle',
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
  let menuHam = document.querySelector('.ham');
  let menuNav = document.querySelector('.header__main');
  let menuBg = document.querySelector('.header__bg');
  let menuElemsFix = document.querySelectorAll('.menu-fix');
  let menuElemsHide = document.querySelectorAll('.menu-hide');
  let menuElemsShow = document.querySelectorAll('.menu-show');

  if (menuHam) {
    for (let i = 0; i < 3; i++) {
      let div = document.createElement('div');
      menuHam.append(div);
    }

    menuHam.addEventListener('click', () => {
      menuHam.classList.toggle(cls.toggle)
      menuBg.classList.toggle(cls.active)
      menuElemsFix.forEach((elemFix) => {
        elemFix.classList.toggle(cls.active)
      })
      html.classList.toggle('overflow-disable');
      body.classList.toggle('overflow-disable');
      inner.classList.toggle('overflow-disable');
    });

    if (document.body.offsetWidth < 768) {
      menuHam.addEventListener('click', () => {
        menuNav.classList.toggle(cls.active)
        menuElemsHide.forEach((elemHide) => {
          elemHide.classList.toggle(cls.hide)
        })
        menuElemsShow.forEach((elemShow) => {
          elemShow.classList.toggle(cls.show)
        })
      })
    }
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
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        993: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1220: {
          spaceBetween: 33,
        },
      }
    });
  }

  // BLOG SLIDER
  let blogSlider = document.querySelector('.blog__slider-inner');

  if (blogSlider) {
    let blogSliderSwiper = new Swiper(blogSlider, {
      slidesPerView: 3,
      spaceBetween: 34,
      autoHeight: true,
      speed: 900,
      navigation: {
        prevEl: '.blog__slider-arrow.swiper-button-prev',
        nextEl: '.blog__slider-arrow.swiper-button-next',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1220: {
          slidesPerView: 3,
          spaceBetween: 34,
        },
      }
    });
  }

  // MOBILE SLIDRES
  function MobileSlider(windowSize, wrap, list, items, options = { slidesPerView: 1 }) {
    this.wrap = document.querySelector(wrap);

    if (this.wrap) {
      this.list = document.querySelector(list);
      this.items = document.querySelectorAll(items);
      this.slider = null;
      this.options = options;

      this.toggleSlider = () => {
        if (window.innerWidth <= windowSize) {
          if (!this.wrap.classList.contains('swiper')) {
            this.wrap.classList.add('swiper');
            this.list.classList.add('swiper-wrapper');
            this.items.forEach((item) => {
              item.classList.add('swiper-slide')
            });
            this.slider = new Swiper(this.wrap, this.options);
          }
        } else {
          if (this.wrap.classList.contains('swiper')) {
            this.wrap.classList.remove('swiper');
            this.list.classList.remove('swiper-wrapper');
            this.items.forEach((item) => {
              item.classList.remove('swiper-slide')
            });

            if (this.slider != null) {
              this.slider.destory(false, true);
            }
          }
        }
      }

      this.toggleSlider();

      window.addEventListener('resize', this.toggleSlider);
    }
  }

  new MobileSlider(992, '.price__list', '.price__list-wrap', '.price__item', {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
      el: ".price__pagination.swiper-pagination",
      type: "fraction",
    }
  });

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

  // INCLUDE TOGGLES
  // let includeItems = document.querySelectorAll('.include__item');

  // if (includeItems && (document.body.offsetWidth < 992)) {
  //   includeItems.forEach((includeItem) => {
  //     includeItem.question = includeItem.querySelector('.include__head');
  //     includeItem.answer = includeItem.querySelector('.include__links');

  //     includeItem.question.addEventListener('click', () => {
  //       includeItem.classList.toggle(cls.active);
  //     });
  //   });
  // }

})