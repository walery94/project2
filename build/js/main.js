'use strict';

(function () {
  var overlay = document.querySelector('.overlay');
  var button = document.querySelector('.navigation__button');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');
  var popupForm = document.querySelector('.popup__form');
  var popupName = document.querySelector('#popup-name');
  var popupPhone = document.querySelector('#popup-phone');
  var popupQuestions = document.querySelector('#popup-questions');
  var form = document.querySelector('.form');
  var formName = document.querySelector('#name');
  var formPhone = document.querySelector('#phone');
  var formQuestions = document.querySelector('#questions');
  var ESC = 27;

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
    Array.from(forms.querySelectorAll('input:not([type=checkbox]), textarea')).forEach(function (element) {
      element.value = '';
    });
    window.localStorage.clear();
    forms.reset();
  };

  if (isStorageSupport) {
    getItemForm();
  }

  // Open/Close popup

  var closeModal = function (evt) {
    evt.preventDefault();
    popup.classList.remove('popup__open');
    overlay.style.display = 'none';
    popupName.focus();
  };

  if (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup__open');
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

  form.addEventListener('submit', function () {
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
})();
