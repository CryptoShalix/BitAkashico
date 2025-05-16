/**
 * Version: 1.0
 * Type: Component
 * Name: Custom Form
 * Description: Custom form component
 */

// Listen to the event 'listener_grid-cards'
document.addEventListener('listener_custom-form', function (event) {
  const { componentId, data } = event.detail;
  setData_CustomForm(componentId, data);
});

function setData_CustomForm(componentIdToAppend, data) {
  // Select the element to fill by #id and clean it
  const targetContainer = $(`#${componentIdToAppend}`);
  targetContainer.empty();

  // Get error message
  msgErrorFields = getTranslation('msg.errorFields');

  // Create the form container
  const _formCustom = document.createElement('form');
  _formCustom.className = 'custom-form flex col w-full';

  // Check if data is an array and has at least one element
  if (!data || data.length === 0) return;

  // Start the form with the helper message
  _formCustom.innerHTML = `<i>* = campo obligatorio</i>`;

  // Iterate through each field in the data and create the corresponding input elements
  data.forEach(field => {
    _formCustom.innerHTML += fieldTypeSelector(field);
  });

  // Append the form to the desired container in your HTML
  if (targetContainer) {
    targetContainer.append(_formCustom);
  }
}

function fieldTypeSelector(field) {
  const _fieldType = field.customFieldType;
  switch (_fieldType) {
    case customFieldType.INPUT:
      return createInputField(field.id, field.type, field.label, field.placeholder, field.required);
    case customFieldType.TEXTAREA:
      return createTextArea(field.id, field.label, field.placeholder, field.required);
    case customFieldType.SELECT:
      return createSelectField(field.id, field.label, field.placeholder, field.options, field.required);
    case customFieldType.CHECKBOX:
      return createCheckboxField(field.id, field.label, field.options, field.required);
    case customFieldType.UPLOADER:
      return createUploaderField(field.id, field.label, field.fileFormat, field.required);
    case customFieldType.BUTTON:
      return createButton(field.id, field.type, field.label, field.clickEvent, field.icon);
    case customFieldType.MESSAGE:
      return createSpecialMessage(field.label, field.icon, field.classes);
    case customFieldType.GROUPED_FIELDS:
      return createGroupedFields(field);
    default:
      console.warn(`Unknown field type: ${_fieldType}`);
  }
}

// INPUT FIELDS CREATORS

/**
 * Create a common input field.
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {string} type The type of the field. It can be: text, email, password, number, date, etc.
 * @param {string} label The label to show in the field.
 * @param {string} placeholder The placeholder to show in the field.
 * @param {boolean} required Is this field required? If true, the field will be marked as required.
 * @example createInputField('nickname', 'text', 'pages.custom.fieldNickname', 'pages.custom.fieldNicknamePlaceholder', true)
 * @returns Returns the HTML code for the field.
 */
function createInputField(id, type, label, placeholder, required) {
  const _label = getTranslation(label);
  const _placeholder = getTranslation(placeholder);
  return `
    <div class="flex col w-full h-start m-half">
      <label for="${id}">${required ? '* ' : ''}${_label}</label>
      <input type="${type}" id="${id}" class="form-control validate" placeholder="${_placeholder}" ${required ? 'required' : ''}>
      ${getDefaultMessageErrorFields(id)}
    </div>`;
}

/**
 * Create a textarea field.
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {string} label The label to show in the field.
 * @param {string} placeholder The placeholder to show in the field.
 * @param {boolean} required Is this field required? If true, the field will be marked as required.
 * @example createTextArea('message', 'pages.custom.fieldMessage', 'pages.custom.fieldMessagePlaceholder', true)
 * @returns Returns the HTML code for the field.
 */
function createTextArea(id, label, placeholder, required) {
  const _label = getTranslation(label);
  let _placeholder = removeHTMLTags(getTranslation(placeholder));
  return `
    <div class="flex col w-full h-start m-half">
      <label for="${id}">${required ? '* ' : ''}${_label}</label>
      <textarea id="${id}" class="placeholder form-control validate" placeholder="${_placeholder}" rows="6" minlength="10" ${required ? 'required' : ''}></textarea>
      ${getDefaultMessageErrorFields(id)}
    </div>`;
}

/**
 * Create a select/dropdown field.
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {string} label The label to show in the field.
 * @param {customFieldOptions} options The options to load inside the select.
 * @param {boolean} required Is this field required? If true, the field will be marked as required.
 * @example createSelectField('country', 'pages.custom.fieldCountry',
 * [
 * * { value: 'ES', label: 'pages.custom.fieldCountrySpain' },
 * * { value: 'FR', label: 'pages.custom.fieldCountryFrance' }
 * ], true)
 * @returns Returns the HTML code for the field.
 */
function createSelectField(id, label, placeholder, options, required) {
  // Prepare labels
  const _placeholder = getTranslation(placeholder);
  const _label = getTranslation(label);

  // Prepare default option
  let optionsHtml = `<option value="null" disabled selected>${_placeholder}</option>`;

  // Prepare options
  optionsHtml += options.map(option => {
    const _option = getTranslation(option.label);
    return `<option value="${option.value}">${_option}</option>`;
  }).join('');

  return `
    <div class="flex col w-full h-start m-half">
      <label for="${id}">${required ? '* ' : ''}${_label}</label>
      <select id="${id}" class="form-control validate" ${required ? 'required' : ''}>
        ${optionsHtml}
      </select>
      ${getDefaultMessageErrorFields(id)}
    </div>`;
}

/**
 * Create a file uploader field.
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {string} label The label to show in the field.
 * @param {customFieldOptions} options The options to load inside the checkbox.
 * @param {boolean} required Is this field required? If true, the field will be marked as required.
 * @example createCheckboxField('id', 'pages.custom.fieldCheckbox', 
 * [
 * * { label: 'pages.custom.fieldCheckboxOption1', value: 'option1' }, 
 * * { label: 'pages.custom.fieldCheckboxOption2', value: 'option2' }
 * ], true)
 * @returns Returns the HTML code for the field.
 */
function createCheckboxField(id, label, options, required) {
  const _label = getTranslation(label);
  let optionsHtml = options.map(option => {
    const _option = getTranslation(option.label);
    const isChecked = option.checked ? 'checked' : '';
    const isRequired = required ? 'required' : '';
    const isRadio = options.length > 1;
    const type = isRadio ? 'type="radio"' : 'type="checkbox"';
    const nameAttribute = isRadio ? `name="${id}"` : '';
    const _id = isRadio ? `${id}_${option.value}` : `${id}`;
    return `
      <div class="flex col w-half h-start m-half">
        <label class="control ${parseClasses(option.classes)}" for="${_id}">${_option}
          <input
            id="${_id}" 
            class="form-control validate"
            ${nameAttribute}
            ${type}
            ${isChecked} 
            ${isRequired}
            onchange="${option.event}"
          >
          <div class="control_indicator"></div>
        </label>
      </div>`;
  }).join('');

  return `
    <div class="flex col w-full h-start m-half">
      ${_label ? `<label for="${id}">${required ? '* ' : ''}${_label}</label>` : ''}
      ${getDefaultMessageErrorFields(id)}
      <div class="grouped">${optionsHtml}</div>
    </div>`;
}

/**
 * Create a file uploader field.
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {string} label The label to show in the field.
 * @param {customFileFormat} fileFormat The file format can be: image, video, audio, file. If not specified, it will accept all formats.
 * @param {boolean} required Is this field required? If true, the field will be marked as required.
 * @example createUploaderField('file', 'pages.custom.fieldFile', 'image/*', true)
 * @returns Returns the HTML code for the field.
 */
function createUploaderField(id, label, fileFormat, required) {
  const _label = getTranslation(label);
  const _fileFormat = fileFormat || '*';
  return `
    <div class="flex col w-full h-start m-half">
      <label for="${id}">${required ? '* ' : ''}${_label}</label>
      <input type="file" id="${id}" class="form-control validate" accept="${_fileFormat}" ${required ? 'required' : ''}>
      ${getDefaultMessageErrorFields(id)}
    </div>`;
}

/**
 * Create a group of fields.
 * @param {customFieldGroupedFields} groupedFields This is an object with the following properties:
 * 
 * 'groupedFields' {
 * * - title (string): The title of the group of fields. It will be used as the label for the group.
 * * - description (string): The description of the group of fields. It will be used as the description for the group.
 * * - required (boolean): Is this group of fields required? If true, the group will be marked as required.
 * * - fields (array of objects): The fields to show in the group. It is an array of objects.
 * 
 * 'fields': [{
 * * id: The identifier for this field. It will be used to identify the field in the form.
 * * type: The type of the field. It can be: text, email, password, number, date, etc.
 * * label: The label to show in the field.
 * * placeholder: The placeholder to show in the field.
 * * required: Is this field required? If true, the field will be marked as required.
 * }, ...]
 * }
 * @example createGroupedFields({
 * * title: 'pages.custom.fieldCustomMethod',
 * * description: 'pages.custom.fieldCustomMethodDescription',
 * * required: true,
 * * fields: [
 * * * {
 * * * id: 'email',
 * * * type: 'email',
 * * * label: 'pages.custom.fieldEmail',
 * * * placeholder: 'pages.custom.fieldEmailPlaceholder',
 * * * required: true
 * * * },
 * * * {
 * * * id: 'phone',
 * * * type: 'text',
 * * * label: 'pages.custom.fieldPhone',
 * * * placeholder: 'pages.custom.fieldPhonePlaceholder',
 * * * required: false
 * * * },
 * * ]
 * @returns Returns the HTML code for the group of fields.
 */
function createGroupedFields(groupedFields) {
  // Check if fields is an array and has at least one element
  if (!groupedFields || groupedFields.fields.length === 0) return '';
  const id = groupedFields.id || 'customMethod';
  const idFirstChild = groupedFields.fields[0].id || id;

  const _title = getTranslation(groupedFields.title);
  const _description = getTranslation(groupedFields.description);
  const _required = groupedFields.required || false;

  // Create the grouped fields container
  // <input id="${id}" name="${id}" type="text" class="hidden" ${_required ? 'required' : ''}>
  let groupedFieldsHtml = `
    <div id="${id}" class="flex col w-full h-start m-half b left w-bold">
      ${_title ? `<label for="${idFirstChild}">${_required ? '* ' : ''}${_title}</label>` : ''}
      ${_description ? `<small class="t-center"><span>${_description}</span></small>` : ''}
      ${_required ? getDefaultMessageErrorFields(id) : ''}
    <div class="grouped ${parseClasses(groupedFields.classes)}">`;

  // Iterate through each field in the grouped fields and create the corresponding input elements
  groupedFields.fields.forEach(field => {
    groupedFieldsHtml += fieldTypeSelector(field);
  });
  groupedFieldsHtml += `</div>`;
  return groupedFieldsHtml;
}

/**
 * This message will be shown as a small text with an 'exclamation' (FontAwesome) icon.
 * @param {string} message The message tos show.
 * @param {string} icon [Optional] The FontAwesome icon to show in the message.
 * @example createSpecialMessage('pages.custom.msgDataSharing', 'fa-solid fa-circle-exclamation')
 * @returns The HTML code for the special message.
 */
function createSpecialMessage(message, icon, classes) {
  const _label = getTranslation(message);
  const _icon = icon || 'fa-solid fa-circle-exclamation';
  if (!_label) return '';
  return `
    <small class="${parseClasses(classes)}">
      <i class="${_icon}"></i>
      <span>${_label}</span>
    </small>`;
}

/**
 * 
 * @param {string} id The identifier for this field. It will be used to identify the field in the form.
 * @param {customButtonType} type The type of the button. It can be: submit, button, reset.
 * @param {string} label The text to show in the button.
 * @param {() => {}} clickEvent The click event that will fire when the button is clicked. It has to be a function.
 * @param {string} icon [Optiona] The FontAwesome icon to show in the button.
 * @example createButton('btn-submit', 'submit', 'pages.custom.btnSend', 'onFormSubmit_Telegram()', 'fa fa-message')
 * @returns The HTML code for the button.
 */
function createButton(id, type, label, clickEvent, icon) {
  const _label = getTranslation(label);
  if (!id) id = 'btn-submit';
  const _type = type || 'button';
  const event = { event: clickEvent, params: [] };
  return generateButton(id, _type, _label, event, null, icon);
}

function getDefaultMessageErrorFields(id) {
  // return `<small class="error msg absolute top right hidden" id="error-${id}">${msgErrorFields}</small>`;
  return `<small class="error msg right hidden" id="error-${id}">${msgErrorFields}</small>`;
}

function parseClasses(classes) {
  return classes ? classes.map(c => c).join(' ') : '';
}