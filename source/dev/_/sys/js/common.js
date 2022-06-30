const mailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

let cls = {
  error: '--error',
}

function preventDefault(e) {
  e.preventDefault();
}

let html = document.querySelector('html');
let body = document.querySelector('body');
let inner = document.querySelector('.inner');

// FANCYBOX SETUP
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  autoFocus: false,
});

// MAIN DOCUMENT
document.addEventListener('DOMContentLoaded', () => {

  // TAB INIT
  new Tabs();

  // SELECT INIT
  var selects = document.querySelectorAll('.select');
  selects.forEach(select => {
    new Select(select);
  });

  // CHECKBOX INIT
  var checks = document.querySelectorAll('.check');
  checks.forEach(check => {
    new Check(check);
  });

  // MENU HAM
  let btnHam = document.querySelector('.ham');
  let nav = document.querySelector('.nav');

  btnHam.addEventListener('click', () => {
    btnHam.classList.toggle('--toggle');
    nav.classList.toggle('--show');

    html.classList.toggle('overflow-disable');
    body.classList.toggle('overflow-disable');
    inner.classList.toggle('overflow-disable');
  });

  // VALIDATOR
  let inputs = document.querySelectorAll('.input');

  inputs.forEach((input) => {
    input.area = input.querySelector('.input__area');
    input.addEventListener('focusin', () => {
      input.classList.add('--focus');
      input.classList.remove(cls.error);
    })
    input.addEventListener('focusout', () => {
      input.classList.remove('--focus');
    })

    if (input.classList.contains('--name')) {
      input.area.addEventListener('input', () => {
        input.area.value = input.area.value.replace(/[^\D]/g, '');
      });


    } else if (input.classList.contains('--tel')) {
      IMask(input.area, {
        mask: '+{7} (000) 000-00-00',
      });
      input.area.addEventListener('input', () => {
      })

    } else if (input.classList.contains('--email')) {
      input.area.addEventListener('input', () => {
      });

    } else {
      input.area.addEventListener('input', () => {
      });
    }
  });

  let validateForms = document.querySelectorAll('form');

  if (validateForms) {
    validateForms.forEach((form) => {
      let btnSubmit = form.querySelector('button');
      let inputsRequired = form.querySelectorAll('.input.--required');
      let checksRequired = form.querySelectorAll('.check.--required')
      let popupModalForm = form.querySelector('.popup__form');
      let popupSendOkAttr = form.getAttribute('data-message-ok');

      btnSubmit.addEventListener('click', (event) => {
        let errors = 0;

        if (inputsRequired.length > 0) {
          inputsRequired.forEach((input) => {
            let value = input.area.value;

            if (input.classList.contains('--name')) {
              if (value.length < 2) {
                errors++;
                input.classList.add(cls.error);
              } else {
                input.classList.remove(cls.error);
              }
            }

            if (input.classList.contains('--email')) {
              if (!mailPattern.test(value)) {
                errors++;
                input.classList.add(cls.error);
              } else {
                input.classList.remove(cls.error);
              }
            }

            if (input.classList.contains('--tel')) {
              if (value.length < 18) {
                errors++;
                input.classList.add(cls.error);
              } else {
                input.classList.remove(cls.error);
              }
            }

          })
        }

        if (checksRequired.length > 0) {
          checksRequired.forEach((check) => {
            if (check.input.getAttribute('checked') != 'checked') {
              errors++;
              check.classList.add(cls.error);
            }
            else {
              check.classList.remove(cls.error);
            }
          })
        }

        if (errors == 0) {
          event.preventDefault(); // <- remove on ajax writing

          Fancybox.close();
          Fancybox.show(
            [
              {
                src: "#popup-thanks",
              },
            ],
          );
        } else {
          event.preventDefault();
        }
      })
    })
  }


})