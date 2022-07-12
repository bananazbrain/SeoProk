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

// MOBILE SLIDRES
class SwiperIniter {
  constructor(width, type = 'less', classSlider, classWrapper, classItems, options = {}) {
    this.sliders = document.querySelectorAll('.' + classSlider);
    this.width = width;
    this.type = type;
    this.classSlider = classSlider;
    this.classWrapper = classWrapper;
    this.classItems = classItems;
    if (this.sliders.length == 0) {
      return false;
    }

    this.options = options;

    this.sliders.forEach((slider) => {
      slider.el = {
        wrapper: slider.querySelector('.' + classWrapper),
        items: slider.querySelectorAll('.' + classItems),
      };

      slider.oldClass = slider.className;
      slider.el.wrapper.oldClass = slider.el.wrapper.className;

      slider.el.items.forEach((item) => {
        item.oldClass = item.className;
      });

      this.init(slider);

      window.addEventListener('resize', () => {
        this.init(slider);
      });
      window.addEventListener('orientationchange', () => {
        this.init(slider);
      });
    });
  }

  init(slider) {
    this.condition = this.type == 'less' ? this.width < window.innerWidth : this.width >= window.innerWidth;
    slider.el = {
      wrapper: slider.querySelector('.' + this.classWrapper),
      items: slider.querySelectorAll('.' + this.classItems),
    };

    if (this.condition) {
      slider.className = slider.oldClass + ' swiper';
      slider.el.wrapper.className = slider.el.wrapper.oldClass + ' swiper';

      slider.el.items.forEach((item) => {
        item.className = item.oldClass + ' swiper-slide';
      });
      this.swiper = new Swiper(slider, this.options)
    } else {
      if (this.swiper) {
        slider.className = slider.oldClass;
        slider.removeAttribute('style');

        slider.el.wrapper.className = slider.el.wrapper.oldClass;
        slider.el.wrapper.removeAttribute('style');

        slider.el.items.forEach((item) => {
          item.className = item.oldClass;
          item.removeAttribute('style');
        });

        if (this.swiper.destory) {
          this.swiper.destory(true, true);
        }
      }
    }
  }
}

class File {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.el = {
      input: this.element.querySelector('input'),
      list: this.element.querySelector('.file__list')
    }

    this.element.addEventListener('click', () => {
      this.el.input.click();
    });

    this.el.input.addEventListener('change', () => {
      this.element.dispatchEvent(new Event('change'));
    });

    this.element.addEventListener('change', () => {
      this.el.list.innerHTML = '';


      if (this.el.input.files.length > 0) {
        for (let file of this.el.input.files) {
          const item = this.createItem(file.name);
          this.el.list.append(item);
        }
        this.element.classList.add('--filled');
      } else {
        this.element.classList.remove('--filled');
      }


    });

    this.element.File = this;
  }

  createItem(name = '') {
    const item = document.createElement('div');
    item.innerHTML = `
      <div class="file__item-name"></div>
      <div class="file__item-remove"></div>
    `
    item.el = {
      name: item.querySelector('.file__item-name')
    };

    item.el.name.innerHTML = name;

    return item;
  }
  static init() {
    const files = document.querySelectorAll('.file');
    if (files.length > 0) {
      files.forEach((file) => {
        new File(file);
      });
    }
  }
}


document.addEventListener('DOMContentLoaded', function () {
  // CHECK INIT
  let checks = document.querySelectorAll('.check');
  if (checks) {
    checks.forEach((check) => {
      new Check(check);
    });
  }

  // SELECT INIT
  var selects = document.querySelectorAll('.select');
  if (selects) {
    selects.forEach(select => {
      new Select(select);
    });

    document.addEventListener('click', (event) => {
      let openSelects = document.querySelectorAll('.select.--open');
      if (!event.target.closest('.select') && openSelects) {
        openSelects.forEach((select) => {
          select.classList.remove(Select.classOpen);
        });
      }
    })
  }

  // ANIMATION
  let anBlocks = document.querySelectorAll('.an');

  function animatedBlocks() {
    let Y = window.scrollY;
    let visibleHeight = window.innerHeight - 100;
    anBlocks.forEach((block) => {
      if (!block.classList.contains('loaded')) {
        let timeout = block.getAttribute('data-timeout');
        if (timeout) {
          block.style.transitionDelay = timeout;
        }
        if (block.getBoundingClientRect().top < visibleHeight) {
          block.classList.add('loaded');
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
  let header = document.querySelector('.header');
  let menuHam = document.querySelector('.ham');

  if (menuHam) {
    for (let i = 0; i < 3; i++) {
      let div = document.createElement('div');
      menuHam.append(div);
    }

    menuHam.addEventListener('click', () => {
      menuHam.classList.toggle(cls.toggle);
      header.classList.toggle(cls.toggle);
      html.classList.toggle('overflow-disable');
      body.classList.toggle('overflow-disable');
      inner.classList.toggle('overflow-disable');
    });
  }

  let subNavs = document.querySelectorAll('.has-subnav');
  if (subNavs.length > 0) {
    subNavs.forEach((nav) => {
      nav.link = nav.querySelector('a');

      nav.link.addEventListener('click', (event) => {
        event.preventDefault();
        nav.classList.toggle(cls.toggle);
      });
    });
  }

  // VIDEO SLIDER
  let videoSlider = document.querySelector('.video__slider-inner');

  if (videoSlider) {
    new SwiperIniter(580, 'less', 'video__slider-inner', 'video__slider-wrap', 'video__slider-item', {
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

  // PRICE SLIDER
  new SwiperIniter(992, 'more', 'price__list', 'price__list-wrap', 'price__item', {
    slidesPerView: 2,
    spaceBetween: 21,
    speed: 900,
    pagination: {
      el: ".price__pagination.swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.25,
      },
      581: {
        slidesPerView: 2,
      },
    }
  });

  // CERTS SLIDER
  new SwiperIniter(992, 'more', 'certs__list', 'certs__list-wrap', 'certs__item', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 900,
    navigation: {
      prevEl: '.certs__arrow.swiper-button-prev',
      nextEl: '.certs__arrow.swiper-button-next',
    },
  });

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
      pagination: {
        el: ".blog__slider-pagination.swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        581: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1220: {
          slidesPerView: 3,
          spaceBetween: 34,
        },
      }
    });
  }

  // WORKS SLIDER
  let worksSlider = document.querySelector('.works__links');
  if (worksSlider) {
    new SwiperIniter(767, 'less', 'works__links', 'works__links-wrap', 'works__link', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      speed: 900,
    });
  }

  // CASES SLIDER
  let casesSlider = document.querySelector('.cases__links');
  if (casesSlider) {
    new SwiperIniter(767, 'less', 'cases__links', 'cases__links-wrap', 'cases__link', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      speed: 900,
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

  // LINKS TOGGLES - responsive
  let toggleLinks = document.querySelectorAll('.t-links');
  if (toggleLinks.length > 0) {
    toggleLinks.forEach((links) => {
      links.el = {
        current: links.querySelector('.t-links__current span'),
        items: links.querySelectorAll('.t-links__item'),
      };

      links.addEventListener('click', () => {
        links.classList.toggle(cls.toggle);
      });

      links.el.items.forEach((item) => {
        if (item.classList.contains(cls.active)) {
          links.current = item;
          links.el.current.innerHTML = item.innerHTML
        }
        item.addEventListener('click', () => {
          links.el.current = links.querySelector('.t-links__current span');

          if (links.current) {
            links.current.classList.remove(cls.active);
          }

          links.current = item;
          links.current.classList.add(cls.active);
          links.el.current.innerHTML = item.innerHTML
        })
      });
    });
  }

  // INCLUDE TOGGLES - responsive
  let includeItems = document.querySelectorAll('.include__item');
  if (includeItems && (document.body.offsetWidth < 992)) {
    includeItems.forEach((item) => {
      item.head = item.querySelector('.include__head');
      item.links = item.querySelector('.include__links');

      if (item.head) {
        item.head.addEventListener('click', () => {
          item.classList.toggle(cls.active);
        });
      }
    });
  }

  // PAGE TEXT TOGGLES
  let toggs = document.querySelector('.toggs');
  if (toggs) {

    toggs.items = [];
    toggs.currentItem = null;

    console.log(toggs.children);
    for (let el of toggs.children) {
      console.log(el);
      if (el.tagName.toLowerCase() == 'h5') {
        toggs.currentItem = null;

        toggs.currentItem = document.createElement('div');
        toggs.currentItem.className = 'toggs__item';
        toggs.currentItem.head = document.createElement('div');
        toggs.currentItem.head.className = 'toggs__head';

        toggs.currentItem.body = document.createElement('div');
        toggs.currentItem.body.className = 'toggs__body';
        toggs.currentItem.append(toggs.currentItem.head);
        toggs.currentItem.append(toggs.currentItem.body);



        toggs.items.push(toggs.currentItem);

        toggs.currentItem.head.append(el);
      } else {
        toggs.currentItem.body.append(el);
      }
    }

    toggs.innerHTML = '';
    toggs.items.forEach((item) => {
      item.head.addEventListener('click', () => {
        item.classList.toggle('--open');
      });
      toggs.append(item);
    });

    console.log(toggs.items);
    // toggs.app
  }

  // MAP
  let $map = document.querySelector('#map');
  if ($map && ymaps) {
    ymaps.ready(mapInit);

    function mapInit() {
      let mapPosition, mapPlaceholder;

      mapPosition = $map.getAttribute('data-map');
      mapPosition = mapPosition.split(',');

      for (let i = 0; i < mapPosition.length; i++) {
        mapPosition[i] = Number(mapPosition[i]);
      }

      mapPlaceholder = $map.getAttribute('data-map');
      mapPlaceholder = mapPlaceholder.split(',');

      let ymap = new ymaps.Map($map, {
        center: [mapPosition[0], mapPosition[1]],
        zoom: 16,
        controls: []
      });

      let placemark = new ymaps.Placemark(mapPlaceholder, {
      }, {
        iconLayout: 'default#image',
        iconImageHref: '_/uploads/icons/placemark-green.svg',
      }, {});

      ymap.geoObjects.add(placemark);

      ymap.behaviors.disable('scrollZoom');

      // function setMapPostion() {
      //   let dw = window.innerWidth;

      //   if (dw > 1220) {
      //     ymap.setCenter([mapPosition[0], mapPosition[1]]);
      //   } else if (dw <= 1220 && dw > 767) {
      //     ymap.setCenter([mapPosition[0], mapPosition[1] - 0.01]);
      //   } else {
      //     ymap.setCenter(mapPosition);
      //   }
      // }

      // setMapPostion();
      // window.addEventListener('resize', () => {
      //   setMapPostion();
      // });
    }
  }

  File.init()

})