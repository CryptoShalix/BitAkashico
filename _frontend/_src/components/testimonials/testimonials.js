/**
 * Version: 1.0
 * Type: Component
 * Name: Testimonials
 * Description: Testimonials component
 */

// VARIABLES (AS FUNCTIONS)

function getFieldsTestimonials() {
  return {
    selectService: 'selectService',
    anonymous: 'fieldAnonymous',
    testimonialData: 'fieldTestimonialData',
    testimonialName: 'fieldTestimonialName',
    testimonialUrl: 'fieldTestimonialUrl',
    testimonialMedia: 'fieldTestimonialMedia',
    testimonialText: 'fieldTestimonialText',
  };
}

// ON INIT

$(document).ready(async function () {
  const _fieldsTestimonials = getFieldsTestimonials();

  try {
    // Populate the stores dropdown
    loadTestimonials();
  } catch (error) {
    console.error('Error in testimonials.js:', error);
    $('#no-testimonials').show();
  } finally {
    await loadComponent('custom-form', 'testimonial-form', await prepareFormData_Testimonial());
    onTranslate();
  }

  async function loadTestimonials() {
    // Get data from Strapi and load the testimonials component
    setData_Testimonials(await getData_Testimonials());
  }

  async function getData_Testimonials() {
    // Define the URL and properties
    const properties = [
      { id: 'isActive', type: Type.TEXT },
      { id: 'testimonialText', type: Type.TEXT },
      { id: 'testimonialMedia', type: Type.MEDIAFILE },
      { id: 'store', type: Type.COMPONENT },
      { id: 'client', type: Type.COMPONENT },
    ];

    // Get data from Strapi
    return await generateUrl('testimonials', properties);
  }

  function setData_Testimonials(DATA) {
    // Select the element by #id and clean it
    const testimonials = $('.testimonials');
    testimonials.empty();

    // Fill the info
    if (DATA && DATA.length > 0) {
      // Hide the no testimonials message
      $('#no-testimonials').hide();

      // Fill the testimonials
      testimonials.append(`
      <div class="testimonials-container">
      ${DATA
          .filter(t => t.isActive)
          .slice(0, _MAX_TESTIMONIALS > 0 ? _MAX_TESTIMONIALS : DATA.length)
          .map(testimonial => {
            const storeCover = testimonial.store ? testimonial.store.cover.url : null;
            const storeTitle = testimonial.store ? testimonial.store.title : null;
            const testimonialMedia = testimonial.testimonialMedia;
            const testimonialText = testimonial.testimonialText;
            const isAnonymous = testimonial.client ? testimonial.client.isAnonymous : false;
            const clientName = testimonial.client ? testimonial.client.name : null;
            const clientLink = testimonial.client ? testimonial.client.link : null;

            return `<div class="testimonial-box">
            ${storeCover && storeTitle ? `<div class="testimonial-store">
              <img class="testimonial-store-icon" src="${STRAPI_HOST}${storeCover}" alt="${storeTitle} icon">
              <span class="testimonial-store-title">${storeTitle}</span>
            </div>` : ''}
          
            ${testimonialMedia ? `
            <video class="testimonial-media" controls controlsList="nodownload">
              <source src="${testimonialMedia}" type="video/mp4">
              ${getTranslation('global.videoNotSupported')}
            </video>
            ` : `
              <span class="testimonial-text">${testimonialText}</span>
            `}

            <div class="testimonial-clientInfo">
            ${isAnonymous || !clientName ? `
              <span>${getTranslation('pages.testimonials.fieldAnonymous')}</span>
              ` : `
              <h3 class="testimonial-clientInfo-Name">${clientName}</h3>
              ${clientLink ? `
                <a class="testimonial-clientInfo-Link" href="${clientLink}" target="_blank">
                  ${formatLink(clientLink)}
                </a>
              ` : ''}
            `}
            </div>
        </div>
      `}).join('')}
      </div>
      ${_MAX_TESTIMONIALS === 0 ? '' :
          generateButton('btnTestimonialsSeeMore', null, 'global.seeMore', '/testimonials', '', 'fa-solid fa-magnifying-glass-plus')
        }
    `);
    } else {
      $('#no-testimonials').show();
    }
  }

  // FORM DATA

  async function prepareFormData_Testimonial() {
    // Testimonial media message
    const msgTestimonialMedia = getTranslation('pages.testimonials.fieldTestimonialMedia');
    const msgTestimonialQuestions = getTranslation('pages.testimonials.testimonialQuestions');
    const msgFieldMedia = `${msgTestimonialMedia}<br/><br/>${msgTestimonialQuestions}`;

    // Prepare the array of custom fields to load the 'contact form'
    const customFields = [
      {
        customFieldType: customFieldType.SELECT,
        id: _fieldsTestimonials.selectService,
        label: 'pages.testimonials.fieldService',
        placeholder: 'store.selectionPlaceholder',
        required: true,
        options: _storeItems.map(store => { return { value: store.id, label: store.title }; }),
      },
      {
        customFieldType: customFieldType.CHECKBOX,
        id: _fieldsTestimonials.anonymous,
        label: 'pages.testimonials.fieldAnonymousDescription',
        required: false,
        options: [
          {
            label: 'pages.testimonials.fieldAnonymous',
            value: '',
            checked: false,
            classes: ['bold', 'huge', 'center']
          },
        ],
      },
      {
        customFieldType: customFieldType.GROUPED_FIELDS,
        id: _fieldsTestimonials.testimonialData,
        classes: ['row'],
        required: true,
        fields: [
          {
            customFieldType: customFieldType.INPUT,
            type: customInputType.TEXT,
            id: _fieldsTestimonials.testimonialName,
            label: 'pages.testimonials.fieldName',
            placeholder: 'pages.testimonials.fieldNamePlaceholder',
            required: true,
          },
          {
            customFieldType: customFieldType.INPUT,
            type: customInputType.TEXT,
            id: _fieldsTestimonials.testimonialUrl,
            label: 'pages.testimonials.fieldUrl',
            placeholder: 'pages.testimonials.fieldUrlPlaceholder',
            required: false,
          },
        ]
      },
      {
        customFieldType: customFieldType.GROUPED_FIELDS,
        classes: ['col'],
        required: true,
        fields: [
          {
            customFieldType: customFieldType.MESSAGE,
            label: msgFieldMedia,
            classes: ['large']
          },
          // TODO: Remove it or make it work
          // {
          //   customFieldType: customFieldType.UPLOADER,
          //   id: _fieldsTestimonials.testimonialMedia,
          //   label: 'pages.testimonials.fieldTestimonialMedia',
          //   fileFormat: 'video/mp4',
          //   required: true,
          // },
          {
            customFieldType: customFieldType.TEXTAREA,
            id: _fieldsTestimonials.testimonialText,
            label: 'pages.testimonials.fieldTestimonialText',
            placeholder: 'pages.testimonials.testimonialQuestions',
            required: true,
          }
        ]
      },
      {
        customFieldType: customFieldType.BUTTON,
        id: 'submit-button',
        type: customButtonType.SUBMIT,
        label: 'pages.testimonials.btnSend',
        clickEvent: onFormSubmit_Testimonial,
        icon: 'fa fa-message'
      },
    ];
    return customFields;
  }
});

// PUBLIC METHODS: FORM EVENTS

function toggleTestimonialForm(event) {
  const _formTestimonial = document.getElementById('testimonial-form');
  // Reset the form
  if (_formTestimonial.querySelector('form')) {
    _formTestimonial.querySelector('form').reset();
  }
  // Toggle the testimonial-form visibility
  _formTestimonial.classList.toggle('hidden');
  _formTestimonial.classList.toggle('accordion-open');
  // Toggle this button i icon between plus and minus
  const btnAddTestimonialIcon = $('#btnAddTestimonialIcon');
  btnAddTestimonialIcon.toggleClass('fa-user-plus fa-x');
}

// PUBLIC METHODS: FORM SUBMIT

/**
 * TODO: Check why we cannot upload media files associated with the testimonial.
 * 
 * The form to submit a new testimonial to the API server.
 * 1. Checks if the main required fields are valid:
 * - Required: '_fieldsTestimonials.selectService', '_fieldsTestimonials.testimonialName', and '_fieldsTestimonials.testimonialText'
 * 2. Prepares all required data into an object
 * 3. Does a 'postQuery' call to upload that object in order to create a new testimonial at the Strapi server.
 * - 3.1. OK => Cleans the form and reloads the list of testimonials.
 * - 3.2. KO => Shows an error message to the user
 */
async function onFormSubmit_Testimonial() {
  // Get fields
  const _fieldsTestimonials = getFieldsTestimonials();

  // The boolean to allow upload or not
  const isValidForm = validateFields([_fieldsTestimonials.selectService, _fieldsTestimonials.testimonialName, _fieldsTestimonials.testimonialText]);

  // Required fields: '_fieldsTestimonials.selectService', '_fieldsTestimonials.testimonialName', and '_fieldsTestimonials.testimonialText'
  if (isValidForm) {
    // Get the form fields
    const fieldAnonymous = document.getElementById(_fieldsTestimonials.anonymous);
    const fieldName = document.getElementById(_fieldsTestimonials.testimonialName);
    const fieldLink = document.getElementById(_fieldsTestimonials.testimonialUrl);
    const fieldTestimonialText = document.getElementById(_fieldsTestimonials.testimonialText);
    const fieldService = document.getElementById(_fieldsTestimonials.selectService);

    // Get 'storeId' and 'testimonialText'
    const storeId = fieldService.value;
    const testimonialText = fieldTestimonialText.value;

    // Check if the client exists or create a new one
    const clientData = {
      name: fieldName.value || null,
      link: fieldLink.value || null,
      isAnonymous: fieldAnonymous.checked,
    };
    // Get that client ID
    const clientId = await getClientId(clientData);

    // Process the video file if it exists
    // testimonialMedia = await getInputFileMedia(_fieldsTestimonials.testimonialMedia);

    try {
      // Prepare the testimonial object
      const testimonialData = {
        testimonialText,
        testimonialMedia,
        client: clientId,
        store: storeId,
        isActive: true,
      };

      const response = await postQuery('testimonials', testimonialData);
      if (response && response.data) {
        // Testimonial submitted successfully
        showMessage(TYPE_MESSAGE.SUCCESS, 'pages.testimonials.msgSuccess');
        // Reset the form
        toggleTestimonialForm();
        // Reload testimonials
        loadTestimonials();
      } else {
        showMessage(TYPE_MESSAGE.ERROR, `pages.testimonials.msgError`);
        console.error('Error submitting testimonial:', response);
      }
    } catch (error) {
      manageError(error);
    }
  } else {
    showMessage(TYPE_MESSAGE.ALERT, 'msg.errorFields');
  }
}

async function getClientId(clientData) {
  try {
    // Search for an existing client
    let client = await getClient(clientData);
    if (!client) {
      // If no client is found, create a new one
      client = await createClient(clientData);
    }
    // Check if 'client' is not null and get the ID
    if (client) {
      return client.id;
    }
  } catch (error) {
    manageError(error);
  }
  return null;
}

async function getInputFileMedia(fieldId) {
  try {
    const _input = document.getElementById(fieldId);
    if (_input.required && _input.files.length > 0) {
      const file = _input.files[0];
      if (file && file.size > 0) {
        return await uploadMedia(file);
      }
    }
  } catch (error) { console.error(error); }
  return null;
}