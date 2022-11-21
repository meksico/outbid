// Input
function toggleHasValue(el, status) {
  const hasValueClassName = 'has-value';

  if (status) {
    el.classList.add(hasValueClassName);
  } else {
    el.classList.remove(hasValueClassName);
  }
}

document.querySelectorAll('.text__field').forEach(input => {
  toggleHasValue(input, input.value.length);

  input.addEventListener('blur', (event) => {
    toggleHasValue(event.target, event.target.value);
  });
});

// Scroll animation
AOS.init();

// Carousel
let eventsSlider;

function initEventsSlider() {
  if ($('.events-slider').length) {
    eventsSlider = $('.events-slider').owlCarousel({
      loop: true,
      margin: 1.5,
      nav: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        767: {
          items: 2
        },
        1280: {
          items: 3
        }
      }
    });
  }
}

if (window.innerWidth > 767) { initEventsSlider(); }

$( window ).resize(function() {
  if (window.innerWidth < 767) {
    eventsSlider?.trigger('destroy.owl.carousel');
  } else {
    initEventsSlider();
  }
});

// Mobile nav
$('.header__mobile-btn').click(() => {
  document.body.classList.toggle('header-nav-opened');

  if (document.body.classList.contains('header-nav-opened')) {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    });
  } else {
    document.body.removeEventListener('touchmove');
  }
});

// Validation
$('input, textarea').focus(function () {
  $(this).parent().removeClass('invalid');
  $(this).parent().removeClass('valid');
});
$('select').parent().click(function () {
  $(this).removeClass('invalid');
  $(this).removeClass('valid');
});
$('.checkbox-group__list').click(function() {
  $(this).parent().removeClass('invalid');
})

function validateForm(wrap) {
  const validateFileds = 'input[required], select[required], textarea[required]';
  const fields = wrap ? $(wrap).find(validateFileds) : $(validateFileds);
  let isFormValid = true;

  fields.each((index, field) => {
    const checkMinLength = field.value?.trim().length >= ($(field).attr('minlength') || 0);
    let isFieldValid = field.value && checkMinLength;

    switch (field.type) {
      case 'email':
        isFieldValid = validateEmail(field.value);
        break;
      case 'tel':
        isFieldValid = validatePhone(field.value);
        break;
      case 'checkbox':
        isFieldValid = field.checked;
        break;
    }

    if (!isFieldValid) { isFormValid = false; }

    isFieldValid
      ? $(field).parent().addClass('valid')
      : $(field).parent().addClass('invalid');
  });

  return isFormValid;
}

function validateEmail(email) {
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return checkEmail.test(email);
}

function validatePhone(phone) {
  const phoneCode = '+' + $('select[name="phoneCode"]').val().trim();
  const phoneValue = phone.trim();
  return phoneValue.length > phoneCode.length;
}

function validateCheckboxGroups() {
  const validateFileds = 'input[type="checkbox"]';
  let isValidGroups = true;

  $('.checkbox-group_required').each((index, group) => {
    const fields = $(group).find(validateFileds);
    let isValidGroup = false;

    fields.each((index, field) => {
      if (field.checked) { isValidGroup = true;}
    });

    isValidGroup
      ? $(group).removeClass('invalid')
      : $(group).addClass('invalid');

    if (!isValidGroup) { isValidGroups = false; }
  });

  return isValidGroups;
}

function validateStep(stepId) {
  if (validateForm(stepId)) {
    $('#sign-up-wizard').smartWizard('next');
    window.scrollTo(0, 0);
  }
}

function validateSignUpSubmit(event, stepId) {
  let isCheckboxGroupValid = validateCheckboxGroups();
  let isFormValid = validateForm(stepId);

  if (isCheckboxGroupValid && isFormValid) {
    // For example
    event.stopPropagation();
    event.preventDefault();

    setTimeout(() => {
      showModal('#successModal');
    }, 300);
    // For example END

  } else {
    event.stopPropagation();
    event.preventDefault();
  }
}

function sendForm(event) {
  if (validateForm()) {
    // For example
    event.stopPropagation();
    event.preventDefault();

    setTimeout(() => {
      showModal('#successModal');
    }, 300);
    // For example END

  } else {
    event.stopPropagation();
    event.preventDefault();
  }
}

// Modal
$('[data-toggle="modal"]').click(function() {
  const modalId = $(this).data('target');
  showModal(modalId);
});

$('[data-dismiss="modal"]').click(function() {
  hideModal();
});

$('[data-dismiss="modal-refresh"]').click(function() {
  window.scrollTo(0, 0);
  location.reload();
});

if (navigator.platform.toUpperCase().indexOf('MAC')>=0) {
  $('body').addClass('macOS');
}

function showModal(modalId) {
  $(modalId).show();
  $('body').addClass('modal-open');

  const modalHeight = $(modalId).find('.modal__dialog').height();
  $(modalId).find('.modal__backdrop').height(modalHeight);
}

function hideModal() {
  $('.modal').hide();
  $('body').removeClass('modal-open');
}