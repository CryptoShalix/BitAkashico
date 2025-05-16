/**
 * Enum for input field types.
 * @readonly
 * @enum {string}
 */
const customFieldType = Object.freeze({
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  UPLOADER: 'uploader',
  BUTTON: 'button',
  MESSAGE: 'message',
  GROUPED_FIELDS: 'groupedFields',
});

/**
 * Enum for input types.
 * @readonly
 * @enum {string}
 */
const customInputType = Object.freeze({
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  PHONE: 'tel',
  URL: 'url',
  COLOR: 'color',
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
});

/**
 * Enum for button types.
 * @readonly
 * @enum {string}
 */
const customButtonType = Object.freeze({
  SUBMIT: 'submit',
  RESET: 'reset',
  BUTTON: 'button',
});

/**
 * Enum for input file format.
 * @readonly
 * @enum {string}
 */
const customFileFormat = Object.freeze({
  ALL: '*/*',
  AUDIO: 'audio/*',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  GIF: 'image/gif',
  IMAGE: 'image/*',
  JPEG: 'image/jpeg',
  JPG: 'image/jpeg',
  PDF: 'application/pdf',
  PNG: 'image/png',
  VIDEO: 'video/*',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

/**
 * Interface for custom field options.
 * @typedef {Object} customFieldOption
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 * @property {boolean} checked - The checked state of the option (for checkboxes).
 * @property {() => {}} event - The event function to execute when the option is clicked.
 */

/**
 * Array of custom field options.
 * @type {Array<customFieldOption>}
 */
const customFieldOptions = [];

/**
 * Interface for grouped fields.
 * @typedef {Object} customFieldGroupedFields
 * @property {string} title - The title of the grouped fields.
 * @property {string} description - The description of the grouped fields.
 * @property {boolean} required - Whether the grouped fields are required.
 * @property {Array<customFieldModel>} fields - The array of custom field models within the grouped fields.
 */

/**
 * Interface for custom field model.
 * @typedef {Object} customFieldModel
 * @property {customFieldType} customFieldType - The custom type of the field.
 * @property {customInputType} type - The real type of the field (for Input and Button).
 * @property {string} id - The identifier for the field.
 * @property {string} [label] - The label to display for the field.
 * @property {string} [placeholder] - The placeholder text for the field (if applicable).
 * @property {boolean} [required] - Whether the field is required.
 * @property {customFieldOptions} [options] - Options for select or checkbox fields.
 * @property {string} [fileFormat] - Accepted file format for uploader fields.
 * @property {string} [message] - Message text for message fields.
 * @property {string} [icon] - Icon class for buttons or messages.
 * @property {string} [clickEvent] - Click event function for buttons.
 * @property {customFieldGroupedFields} [groupedFields] - Configuration for grouped fields.
 */