'use strict';

(function () {
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var button = document.querySelector('.navigation__button');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');
  var popupForm = document.querySelector('.popup__form');
  var popupName = document.querySelector('#popup-name');
  var popupPhone = document.querySelector('#popup-phone');
  var popupQuestions = document.querySelector('#popup-questions');
  var popupCheckbox = document.querySelector('.popup-consent');
  var checkbox = document.querySelector('#consent');
  var form = document.querySelector('.form');
  var formName = document.querySelector('#name');
  var formPhone = document.querySelector('#phone');
  var formQuestions = document.querySelector('#questions');
  var ESC = 27;
  var websiteSections = document.querySelector('#website-sections');
  var ourAddress = document.querySelector('#our-address');

  // Opened/Close footer-menu

  function switchVisible(element, open) {
    var ulElement = element.nextElementSibling;

    if (open) {
      element.classList.add('footer__opened');
      element.classList.remove('footer__closed');
      ulElement.classList.remove('footer__hide');
    } else {
      element.classList.remove('footer__opened');
      element.classList.add('footer__closed');
      ulElement.classList.add('footer__hide');
    }
  }

  if (websiteSections) {
    websiteSections.addEventListener('click', function (evt) {
      var element = evt.target;
      var isClosed = !element.classList.contains('footer__opened');

      switchVisible(element, isClosed);
      if (ourAddress) {
        if (ourAddress.classList.contains('footer__opened')) {
            switchVisible(ourAddress, !isClosed)
        }
      }
    });
  }

  if (ourAddress) {
    ourAddress.addEventListener('click', function (evt) {
      var element = evt.target;
      var isClosed = !element.classList.contains('footer__opened');

      switchVisible(element, isClosed);
      if (websiteSections) {
        if (websiteSections.classList.contains('footer__opened')) {
          switchVisible(websiteSections, !isClosed)
        }
      }
    });
  }

  // Scroll-down

  var scrollAdvantages = document.querySelector('.banner__scroll-down');
  var scrollQuestions = document.querySelector('.banner__button');

  function doScrolling(element, duration) {

    var startingY = window.pageYOffset;
    var elementY = window.pageYOffset + document.querySelector(element).getBoundingClientRect().top;

    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
    var diff = targetY - startingY;
    var start;

    if (!diff) {
      return;
    }

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp;
      }

      var time = timestamp - start;
      var percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }

  if (scrollAdvantages) {
    scrollAdvantages.addEventListener('click', function (evt) {
      evt.preventDefault();

      doScrolling('#advantages', 500);
    });
  }

  if (scrollQuestions) {
    scrollQuestions.addEventListener('click', function (evt) {
      evt.preventDefault();

      doScrolling('#section-questions', 1500);
    });
  }

  // Local Storage

  var isStorageSupport = true;

  try {
    popupName.value = localStorage.getItem('formName');

  } catch (err) {
    isStorageSupport = false;
  }

  var setItemForm = function () {
    localStorage.setItem('formName', formName.value);
    localStorage.setItem('formPhone', formPhone.value);
    localStorage.setItem('formQuestions', formQuestions.value);
  };

  var setItemPopupForm = function () {
    localStorage.setItem('popupName', popupName.value);
    localStorage.setItem('popupPhone', popupPhone.value);
    localStorage.setItem('popupQuestions', popupQuestions.value);
  };

  var getItemForm = function () {
    formName.value = localStorage.getItem('formName');
    formPhone.value = localStorage.getItem('formPhone');
    formQuestions.value = localStorage.getItem('formQuestions');
  };

  var getItemPopupForm = function () {
    popupName.value = localStorage.getItem('popupName');
    popupPhone.value = localStorage.getItem('popupPhone');
    popupQuestions.value = localStorage.getItem('popupQuestions');
  };

  var clearLocalStorage = function (forms) {
    var almostArr = forms.querySelectorAll('input:not([type=checkbox]), textarea');
    var alreadyArr = [];
    for (var i = 0; i < almostArr.length; i++) {
      alreadyArr.push(almostArr[i]);
    }
    alreadyArr.forEach(function (element) {
      element.value = '';
    });
    window.localStorage.clear();
    forms.reset();
  };

  if (isStorageSupport) {
    if (localStorage.getItem(formQuestions)) {
      getItemForm();
    }
  }

  // Open/Close popup

  var closeModal = function (evt) {
    evt.preventDefault();
    popup.classList.remove('popup__open');
    overlay.style.display = 'none';
    body.classList.remove('popup__no-scroll');
    popupName.focus();
  };

  if (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup__open');
      body.classList.add('popup__no-scroll');
      overlay.style.display = 'block';

      if (isStorageSupport) {
        getItemPopupForm();
      }

      if (popupName.value) {
        popupPhone.focus();
      } else {
        popupName.focus();
      }

      if (popupName.value && popupPhone.value) {
        popupQuestions.focus();
      }
    });
  }

  popupForm.addEventListener('change', function () {
    if (isStorageSupport) {
      setItemPopupForm();
    }
  });

  popupForm.addEventListener('submit', function (evt) {
    clearLocalStorage(popupForm);
    closeModal(evt);
  });

  if (popupClose) {
    popupClose.addEventListener('click', function (evt) {
      closeModal(evt);
    });
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC) {
      if (popup.classList.contains('popup__open')) {
        closeModal(evt);
      }
    }
  });

  if (overlay) {
    overlay.addEventListener('click', function (evt) {
      if (popup.classList.contains('popup__open')) {
        closeModal(evt);
      }
    });
  }

  form.addEventListener('change', function () {
    if (isStorageSupport) {
      setItemForm();
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    clearLocalStorage(form);
  });

  // Phone Mask

  var optionMask = {
    mask: '+{7} (000) 000-00-00'
  };

  var maskPopupPhone = IMask(popupPhone, optionMask);
  var maskFormPhone = IMask(formPhone, optionMask);

  maskPopupPhone.updateValue();
  maskFormPhone.updateValue();




  if (checkbox) {
    checkbox.addEventListener('change', function () {
      if (checkbox.validity.valueMissing) {
        checkbox.setCustomValidity('Дайте согласие на обработку персональных данных');
      } else {
        checkbox.setCustomValidity('');
      }
    });
  }

  if (popupCheckbox) {
    popupCheckbox.addEventListener('change', function () {
      if (popupCheckbox.validity.valueMissing) {
        popupCheckbox.setCustomValidity('Дайте согласие на обработку персональных данных');
      } else {
        popupCheckbox.setCustomValidity('');
      }
    });
  }
})();
