function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// CHECK
class Check {
  static addError(element, message) {
    element.classList.add(Check.classError);

    if (message) {
      element.querySelector('.check__message').innerText = message;
    }
  }

  constructor(element) {
    this.element = element;
    this.input = this.element.input = this.element.querySelector('.check__input');
    this.type = this.input.type;
    this.checkChecked();
    this.onClick();

    this.element.input = this.input;
  }

  onClick() {
    this.element.addEventListener('click', (event) => {
      this.element.classList.remove('--error');
      if (event.target.closest('[data-popup]') || this.element.classList.contains('--disabled')) {
        return false;
      }
      if (this.type == 'checkbox') {
        this.element.classList.toggle('--checked');
        this.checked = this.input.getAttribute('checked');

        if (this.checked) {
          this.input.removeAttribute('checked');
        } else {
          this.input.setAttribute('checked', 'checked');
        }

      } else if (this.type == 'radio') {
        if (this.element.closest('--checked')) {
          return false;
        }

        this.name = this.input.name;
        let parent = this.element.closest('.checks') ? this.element.closest('.checks') : this.element.closest('form') ? this.element.closest('form') : document.body;
        let radios = parent.querySelectorAll('.check input[type="radio"][name="' + this.name + '"]');
        radios.forEach(radio => {
          radio.removeAttribute('checked');
          radio.closest('.check').classList.remove('--checked');
        });
        this.element.classList.add('--checked');
        this.input.setAttribute('checked', 'checked');
      }
    });
  }

  checkChecked() {
    if (this.input.getAttribute('checked')) {
      this.element.classList.add('--checked');
    }
  }
}

// SELECT
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Select {
  constructor(element, settings = {
    closeSelects: true
  }) {
    this.element = element;
    this.settings = settings;
    this.title = element.querySelector('.select__title');
    this.parse = this.element.querySelector('.select__parse');
    this.options = this.parse.querySelectorAll('option');
    this.placeholder = this.element.getAttribute('data-placeholder');
    this.field = this.element.querySelector('.field');
    this.items = [];
    this.options = Array.from(this.options);
    let selectedOption = this.options.find(item => {
      if (item.getAttribute('selected')) {
        return item;
      }
    });
    this.placeholder = selectedOption ? selectedOption.innerText : this.placeholder ? this.placeholder : this.options[0].innerText;
    this.title.innerText = this.placeholder;
    this.onClick();
    this.createList();
    this.createItems();

    if (this.field) {
      this.onKeyUpField();
    }
  }

  createList() {
    this.list = document.createElement('div');
    this.list.className = 'select__list';
    this.element.querySelector('.select__drop').append(this.list);
  }

  createItems() {
    this.options.forEach(item => {
      let divItem = document.createElement('div');
      divItem.className = 'select__item';
      divItem.innerText = item.innerText;
      divItem.option = item;

      if (item.getAttribute('selected')) {
        this.element.classList.add(Select.classFilled);
        divItem.classList.add(Select.classSelected);
      }

      this.list.append(divItem);
      this.items.push(divItem);
      divItem.addEventListener('click', () => {
        this.onClickItem(divItem);
        this.element.classList.add(Select.classFilled);
      });
    });
  }

  onClickItem(item) {
    this.options.forEach(option => {
      option.removeAttribute('selected');
    });
    this.items.forEach(item => {
      item.classList.remove(Select.classSelected);
    });
    item.option.setAttribute('selected', 'selected');
    item.classList.add(Select.classSelected);
    this.title.innerText = item.innerText;
    let event = new Event('change');
    this.parse.dispatchEvent(event);
  }

  onClick() {
    this.element.addEventListener('click', event => {
      if (this.settings.closeSelects == true) {
        let selects = document.querySelectorAll('.select');

        if (selects) {
          selects.forEach(select => {
            if (select == this.element) {
              return false;
            }

            select.classList.remove(Select.classOpen);
          });
        }
      }

      if (event.target.closest('.field')) {
        return false;
      }

      this.element.classList.toggle(Select.classOpen);
    });
  }

  onKeyUpField() {
    this.field.area.addEventListener('input', () => {
      this.items.forEach(item => {
        if (item.innerText.toLowerCase().indexOf(this.field.area.value.toLowerCase()) < 0) {
          item.classList.add(Select.classHidden);
        } else {
          item.classList.remove(Select.classHidden);
        }
      });
    });
  }

}

_defineProperty(Select, "classOpen", '--open');
_defineProperty(Select, "classFilled", '--filled');
_defineProperty(Select, "classSelected", '--selected');
_defineProperty(Select, "classHidden", '--hidden');
_defineProperty(Select, "classError", '--error');


// FILE ATTACH
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
    item.className = 'file__item';
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

// MODALS
class Popup {
  constructor() {
    Popup.block = this.block = document.createElement('div');
    this.block.className = 'popup';
    Popup.bg = this.bg = document.createElement('div');
    this.bg.className = 'popup__bg popup-close';
    Popup.inner = this.inner = document.createElement('div');
    this.inner.className = 'popup__inner';
    this.block.append(this.bg);
    this.block.append(this.inner);
    document.body.append(this.block);
    Popup.items = this.items = [];
    this.initShowBtns();
    this.initCloseBtns();
    Popup.block.addEventListener('click', event => {
      if (!event.target.closest('.popup__item')) {
        Popup.close();
      }
    });
  }

  initShowBtns() {
    document.addEventListener('DOMContentLoaded', () => {
      this.showBtns = document.querySelectorAll('.popup-show, [data-popup]');

      if (this.showBtns) {
        this.showBtns.forEach(btn => {
          btn.addEventListener('click', event => {
            event.preventDefault();
            let btnSrc = btn.getAttribute('data-src'),
              btnHref = btn.getAttribute('href'),
              element = btnSrc ? btnSrc : btnHref;

            if (!element) {
              throw new Error('Not found attribute "data-src" or "href"');
              return false;
            } else {
              if (element.indexOf('.jpg') > -1 || element.indexOf('.jpeg') > -1 || element.indexOf('.png') > -1) {
                let img = document.createElement('img');
                img.src = element;
                Popup.element = this.element = img;
              } else {
                Popup.element = this.element = document.querySelector(element);
              }
            }

            if (this.element) {
              this.element.classList.add(Popup.classItem);
              Popup.show(this.element);
            } else {
              throw new Error('Popup not found');
              return false;
            }
          });
        });
      }
    });
  }

  initCloseBtns() {
    document.addEventListener('DOMContentLoaded', () => {
      this.closeBtns = document.querySelectorAll('.popup-close, [data-popup-close]');

      if (this.closeBtns) {
        this.closeBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            Popup.close();
          });
        });
      }
    });
  }

  static show(element) {
    this.block.classList.add(Popup.classShow);
    document.body.classList.add(Popup.classBodyShow);
    this.inner.prepend(element);
  }

  static close() {
    Popup.element.classList.remove(Popup.classItem);
    this.block.classList.remove(Popup.classShow);
    document.body.classList.remove(Popup.classBodyShow);

    if (Popup.element.tagName.toLowerCase() == 'img') {
      setTimeout(() => {
        Popup.element.remove();
      }, 300);
    } else {
      document.body.append(Popup.element);
    }
  }

}

_defineProperty(Popup, "classShow", '--show');
_defineProperty(Popup, "classItem", 'popup__item');
_defineProperty(Popup, "classBodyShow", 'popup-show');
_defineProperty(Popup, "block", null);
_defineProperty(Popup, "bg", null);
_defineProperty(Popup, "inner", null);
_defineProperty(Popup, "element", null);

new Popup();