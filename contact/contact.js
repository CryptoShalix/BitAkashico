/**
 * Version: 1.0
 * Type: Page
 * Name: Contact
 * Description: Contact page with contact form
 */

const _formContact = $(".contact-form");

const _field_nickname = 'nickname';
const _field_contacMethod = 'contact-method';
const _field_email = 'email';
const _field_phone = 'phone';
const _field_telegram = 'telegram';
const _field_message = 'message';

// ON INIT

$(document).ready(async function () {
  await getData_Contact();
  await loadComponent('custom-form', 'contact-form', await prepareFormData_Contact());
});

// CONTACT PAGE DATA

async function getData_Contact() {
  try {
    // Define the URL and properties
    const properties = [
      { id: 'title', type: Type.TEXT },
      { id: 'TDI', type: Type.COMPONENT },
    ];

    // Get data from Strapi
    const _data = await generateUrl('contact', properties);

    // Set data to the contact form
    setData_Contact(_data);
  } catch (error) {
    console.error(error);
  } finally {
    // Load languages
    onTranslate();
  }
}

function setData_Contact(data) {
  if (data && data.TDI.length > 0) {
    const $contactDescription = $("#contact-description");
    if (!$contactDescription.length) return; // Exit if the element doesn't exist
    $contactDescription.empty(); // Safely clear the content if it exists

    // Set title
    $contactDescription.append(
      `<h4 class="t-center">${data.title}</h4>`
    );

    // Set each 'Title', 'Description', 'Icon' item
    data.TDI.forEach((item) => {
      const descriptionHtml = `
      <div class="contact-item">
        <h3 class="contact-item-title">
          <i class="icon fas fa-${item.icon}"></i>
          ${item.title}
        </h3>
        <p>${item.description}</p>
      </div>`;
      $contactDescription.append(descriptionHtml);
    });
  }
}

// FORM DATA

async function prepareFormData_Contact() {
  // Prepare the array of custom fields to load the 'contact form'
  const customFields = [
    {
      customFieldType: customFieldType.INPUT,
      type: customInputType.TEXT,
      id: _field_nickname,
      label: 'pages.contact.fieldNickname',
      placeholder: 'Bob | Bob_2140',
      required: true,
    },
    {
      customFieldType: customFieldType.GROUPED_FIELDS,
      id: _field_contacMethod,
      title: 'pages.contact.fieldContactMethod',
      description: 'pages.contact.fieldContactMethodDescription',
      required: true,
      fields: [
        {
          customFieldType: customFieldType.INPUT,
          type: customInputType.EMAIL,
          id: _field_email,
          label: 'pages.contact.fieldEmail',
          placeholder: 'email@domain.com',
          required: false,
        },
        {
          customFieldType: customFieldType.INPUT,
          type: customInputType.TEXT,
          id: _field_telegram,
          label: 'pages.contact.fieldTelegram',
          placeholder: '@telegram_id',
          required: false,
        },
        {
          customFieldType: customFieldType.INPUT,
          type: customInputType.PHONE,
          id: _field_phone,
          label: 'pages.contact.fieldPhone',
          placeholder: '+34 111 222 333',
          required: false,
        },
      ],
    },
    {
      customFieldType: customFieldType.TEXTAREA,
      id: _field_message,
      label: 'pages.contact.fieldMessage',
      placeholder: 'pages.contact.fieldMessagePlaceholder',
      required: true,
    },
    {
      customFieldType: customFieldType.MESSAGE,
      label: 'pages.contact.msgDataSharing',
    },
    {
      customFieldType: customFieldType.BUTTON,
      id: 'submit-button',
      type: customButtonType.SUBMIT,
      label: 'pages.contact.btnSend',
      clickEvent: onFormSubmit_Telegram,
      icon: 'fa fa-message'
    },
  ];
  return customFields;
}

// FORM SUBMIT

function onFormSubmit_Telegram() {
  // Get form fields
  const nickname = document.getElementById(_field_nickname);
  const email = document.getElementById(_field_email);
  const phone = document.getElementById(_field_phone);
  const telegram = document.getElementById(_field_telegram);
  const message = document.getElementById(_field_message);

  // Get values
  const valEmail = email.value;
  const valPhone = phone.value;
  const valTelegram = telegram.value;

  // Validate fields: Both 'nickname' and 'message' must be filled
  const isNicknameAndMessageFilled = validateFields([_field_nickname, _field_message]);

  // Validate fields: At least one of the fields must be filled
  const isAnyFieldFilled = !isNullOrEmpty(valEmail) || !isNullOrEmpty(valPhone) || !isNullOrEmpty(valTelegram);

  if (isNicknameAndMessageFilled && isAnyFieldFilled) {
    sendTelegram($(nickname).val(), valEmail, valPhone, valTelegram, $(message).val());
    clearForm([_field_nickname, _field_contacMethod, _field_email, _field_phone, _field_telegram, _field_message]);
    showMessage(TYPE_MESSAGE.SUCCESS, 'pages.contact.msgSuccess');
  } else {
    showValidationMessage(_field_contacMethod);
    _formContact.submit();
    showMessage(TYPE_MESSAGE.ALERT, 'pages.contact.msgAlert');
  }
  return false;
}