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
        let dataList = this.element.closest('.data-acc__list');
        if (dataList && dataList.querySelectorAll('.check.--checked').length <= 1 && this.element.classList.contains('--checked')) {
          return false;
        }

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
      this.element.classList.add(Check.classChecked);
    }
  }
}