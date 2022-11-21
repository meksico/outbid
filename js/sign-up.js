// Wizard
$('#sign-up-wizard').smartWizard({
  selected: 0,
  enableUrlHash: false,
  autoAdjustHeight: false,
  keyboard: {
    keyNavigation: false,
  },
  toolbar: {
    showNextButton: false,
    showPreviousButton: false,
  }
});

// Input mask
const phoneMask = IMask($('#phone')[0], {
  mask: '{+}#################',
  lazy: true,
});

const WMZ = IMask($('#WMZ')[0], {
  mask: '{Z}***************************************************',
  lazy: false
});

const accountNumber = IMask($('#accountNumber')[0], {
  mask: '{U}***************************************************',
  lazy: false
});

// Toggle input field
function toggleElement(status, el) {
  status ? el.hide() : el.show();

  el.find('input').prop('required', !status);
}

$('#noCompany').change(function () {
  toggleElement($(this)[0].checked, $('#companyName'))
});

$('#noWebsite').change(function () {
  toggleElement($(this)[0].checked, $('#website'))
});

// Payment Method
$('.select-items').click(() => {
  const shownFormName = $('#paymentMethod').find(":selected").data('form');

  // Hide all Payment Method & remove required
  $('.payment-method-fields').each((index, el) => {
    $(el).find('input').each((index, inputEl) => {
      $(inputEl).prop('required', false);
    });
    $(el).hide();
  });

  // Hide current Payment Method & set required
  $(`#${shownFormName}`).find('input').each((index, el) => {
    $(el).prop('required', true);
  })
  $(`#${shownFormName}`).show();
});