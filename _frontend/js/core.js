// GLOBAL VARIABLES

const SITE_TITLE = 'BitAkashico';
const _RESERVATIONS_URL = 'https://calendar.app.google/S38ZzKbKibDATz3E8';

// Currency to use in the site
const CURRENCIES = {
  'EUR': '€',
  'USD': '$',
  'BTC': '₿',
};
const CURRENCY = CURRENCIES.EUR;

// The platforms that will be replaced with '@platform'
const platformsToShort = ['instagram.com', 'youtube.com', 'facebook.com', 'linktr.ee'];

// Timer to remove message (in seconds)
const timer = 15;

const TYPE_MESSAGE = Object.freeze({
  ERROR: 'error',
  ALERT: 'alert',
  INFO: 'info',
  SUCCESS: 'success'
});

// Updatable variables
let _MAX_TESTIMONIALS = 0; // Max testimonials to show in the carousel
let msgErrorFields = '';
let _storeItems = [];

// ON INIT

$(document).ready(async function () {
  // Load languages
  await prepareLanguages();
  // Load header
  loadComponent('header');
  // Load footer
  loadComponent('footer');
  // Load shopping cart
  loadComponent('shopping-cart');

  // Get the services from Strapi
  _storeItems = await getStoreItems();

  // Toggle messages
  toggleAppMessages();
});

// LOADERS

function generateRootPath(id, isComponent) {
  return `..${isComponent ? `/_frontend/components` : ''}/${id}/${id}`;
}

function checkFileExists(url, callback) {
  fetch(url, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch(() => {
      callback(false);
    });
}

/**
 * Load the component of the components folder with or without data.
 * @param {string} componentIdToLoad The id of the component to load. Check your components folder to ensure the name is the same.
 * @param {string} componentIdToAppend [Optional] The id of the component in which to append the data. If not provided, it will be the same as 'componentIdToLoad'.
 * @param {customFieldModel[]} data [Optional] A JSON of data created with the 'customFieldModel' structure.
 * @example loadComponentWithData('custom-form', 'my_contact_form', [
 * {
 * * * type: customFieldType.TEXTAREA,
 * * * id: 'message',
 * * * label: 'pages.contact.fieldMessage',
 * * * placeholder: 'pages.contact.fieldMessagePlaceholder',
 * * * required: true,
 * * },
 * * {
 * * * type: customFieldType.MESSAGE,
 * * * label: 'pages.contact.msgDataSharing',
 * * },
 * * {
 * * * type: customFieldType.BUTTON,
 * * * id: 'submit-button',
 * * * type: customButtonType.SUBMIT,
 * * * label: 'pages.contact.btnSend',
 * * * clickEvent: () => onFormSubmit_Telegram(),
 * * * icon: 'fa fa-message'
 * * },
 * ]);
 */
async function loadComponent(componentIdToLoad, componentIdToAppend, data) {
  // Check if the componentIdToAppend is valid or equal to the componentIdToLoad
  const _componentIdToAppend = isNullOrEmpty(componentIdToAppend) || componentIdToAppend === componentIdToLoad ? componentIdToLoad : componentIdToAppend;

  // Generate the root path for the component
  const rootPath = generateRootPath(componentIdToLoad, true);

  // Prepare the callback function to dispatch data (if provided)
  const callback = () => {
    dispatchData(componentIdToLoad, componentIdToAppend, data);
  }

  // Check if the component file exists
  checkFileExists(`${rootPath}.html`, (exists) => {
    if (exists) {
      // Load component
      $(`#${_componentIdToAppend}`).load(`${rootPath}.html`, () => {
        appendLinks(rootPath, callback);
      });
    } else {
      // Load an empty component if the file doesn't exist
      $(`#${_componentIdToAppend}`).html('');
      appendLinks(rootPath, callback);
    }
  });
}

function dispatchData(componentIdToLoad, componentIdToAppend, data) {
  if (data) {
    // Dispatch the data to the component
    document.dispatchEvent(new CustomEvent(`listener_${componentIdToLoad}`, { detail: { componentId: componentIdToAppend, data } }));
  }
}

function loadPage(id) {
  const rootPath = generateRootPath(id, false);

  // Load page
  $(`#main-container`).load(`${rootPath}.html`, () => {
    // ... and append JS and CSS files
    appendLinks(rootPath);
    // Set the active nav menu option
    setActiveRouterLink();
    // Load languages
    onTranslate();
  });

  // Update title
  const subtitle = getTranslation(`nav.${id}`);
  document.title = `${SITE_TITLE} - ${subtitle}`;
}

function appendLinks(rootPath, callback) {
  // Check if JS file exists
  checkFileExists(`${rootPath}.js`, (exists) => {
    if (exists) {
      // Load JS
      checkScriptExists(rootPath);

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${rootPath}.js`;
      script.onload = callback; // Call the callback function after loading
      script.onerror = () => {
        console.error(`Error loading script: ${rootPath}.js`);
      }
      document.head.appendChild(script);
    }
  });

  // Check if CSS file exists
  checkFileExists(`${rootPath}.css`, (exists) => {
    if (exists) {
      // Load CSS
      checkCSSExists(rootPath);
      $('<link>')
        .appendTo('head')
        .attr({ type: 'text/css', rel: 'stylesheet' })
        .attr('href', `${rootPath}.css`);
    }
  });
}

function checkScriptExists(rootPath) {
  const script = document.head.querySelector(`script[src="${rootPath}.js"]`);
  if (script) { script.remove(); }
}

function checkCSSExists(rootPath) {
  const estilo = document.head.querySelector(`link[href="${rootPath}.css"]`);
  if (estilo) { estilo.remove(); }
}

// NAVIGATION

/**
 * When this function is called: scroll to the top of the document
 */
function scrollToTop(top = 0) {
  $("html, body").animate({ scrollTop: top }, "slow");
  document.documentElement.scrollTop = top;
}

function getURLParam(paramName) {
  const url = new URL(window.location.href);
  return url.searchParams.get(paramName);
}

// MESSAGE HANDLING

/**
 * Show a message in the screen.
 * The message will be shown for a few seconds and then hide.
 * @param {*} type The 'TYPE_MESSAGE' of message to show. It must be 'error', 'success', 'info' or 'alert'
 * @param {*} message The message to show. It must be the id of the localization as string.
*/
function showMessage(type, message) {
  const msg_manager = document.getElementById("msg_manager");
  if (msg_manager && !isNullOrEmpty(message) && type) {
    // Set the message
    const _translation = getTranslation(message);
    msg_manager.innerHTML = _translation;
    // Set the type of message and show it
    const classBackground = `back-${type}`;
    $(msg_manager).addClass(classBackground);
    $(msg_manager).removeClass('hidden');
    // Set the timer to hide the message
    setTimeout(() => {
      $(msg_manager).addClass('hidden');
      $(msg_manager).removeClass(classBackground);
    }, timer * 1000);
  }
}

function hideMessage(type) {
  let inputMessage = document.getElementById("msg_" + type);
  if (inputMessage) {
    $(inputMessage).addClass('hidden');
  }
}

function toggleAppMessages() {
  // MANAGE MESSAGES: CHECKOUT
  const pCheckout = getURLParam('status');
  let _messageType = '';
  let _messageText = '';
  if (!isNullOrEmpty(pCheckout)) {
    console.log(pCheckout);
    // If status = success or cancelled
    switch (pCheckout.toLowerCase()) {
      case 'success':
        _messageType = TYPE_MESSAGE.SUCCESS;
        _messageText = getTranslation('store.checkoutSuccess');
        emptyCart();
        break;
      case 'cancelled':
      default:
        _messageType = TYPE_MESSAGE.ERROR;
        _messageText = getTranslation('store.checkoutCancelled');
        break;
    }
  }

  if (!isNullOrEmpty(_messageType) && !isNullOrEmpty(_messageText)) {
    showMessage(_messageType, _messageText);
  }
}

// OTHER FUNCTIONS

function isNullOrEmpty(val) {
  return val === null || val === undefined || val === '' || val === 'null';
}

/**
 * Send a url to format it as a link without the protocol and www.
 * The url must be a valid url, as string.
 * If the url contains 'instagram.com', 'youtube.com' or 'facebook.com', it will return the @username.
 * @param {*The url to format} link 
 * @returns The formatted url as a string. The original url if it is not valid.
 * @example formatLink('https://www.example.com') => 'example.com'
 */
function formatLink(link) {
  try {
    const url = new URL(link);
    if (platformsToShort.some(platform => url.hostname.includes(platform))) {
      return '@' + url.pathname.slice(1);
    }
    return url.hostname.replace(/^www\./, '');
  } catch (e) {
    console.error('Invalid URL:', link);
    return link;
  }
}

function removeHTMLTags(text) {
  // Replace Break-Lines (<br/>) with document new lines (\n)
  textToParse = text.replaceAll('<br/>', '\n');

  // Parse all HTML tags to a document format (remove them)
  const parser = new DOMParser();
  const doc = parser.parseFromString(textToParse, 'text/html');
  return doc.documentElement.textContent;
}

function manageError(error, message = 'msg.generic') {
  showMessage(TYPE_MESSAGE.ERROR, message);
  console.error(error);
}

function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    showMessage(TYPE_MESSAGE.SUCCESS, 'msg.copyToClipboardSuccess');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// VALIDATION

function validateFields(fieldIds) {
  let result = true;
  for (const field of fieldIds) {
    if (field) {
      hideMessage(field);
      if (!validate(field)) { result = false; }
    }
  }
  return result;
}

function validate(fieldId) {
  // Get field by ID
  const _field = document.getElementById(fieldId);
  if (_field) {
    // Get the required attribute
    const isRequired = _field.required;
    // If NOT required: return true
    if (!isRequired) { return true; }

    // If it IS required: Get the type
    const type = _field.type;
    let result = true;
    switch (type) {
      case 'file':
        // Check if the field is required and has any file selected
        result = isRequired && _field.files.length > 0;
      default:
        // Check if the field is required and has any value (not null)
        result = isRequired && !isNullOrEmpty(_field.value);
    }
    // If the result is FALSE: show error message
    if (!result) {
      showValidationMessage(fieldId);
    }
    // Return the result
    return result;
  }
  return false;
}

function showValidationMessage(inputId) {
  const msgId = '#error-' + inputId;
  $(msgId).removeClass('hidden');
  setTimeout(() => {
    $(msgId).addClass('hidden');
  }, timer * 1000);
}

// COMPONENT AND TAG CREATION

/**
 * Creates a custom button and returns the HTML code.
 * @param {string} id The id of the button. If not provided, it will be 'btn-submit'.
 * @param {string} type Type can be 'submit' or 'button'. If not provided, it will be 'button'.
 * @param {string} label The label of the button. It can be the id of the localization as a string.
 * @param {string|{event:()=>{},params:[]}} clickEvent The event or URL to call when the button is clicked. It can be a function or a string.
 * @param {string} target The target determines which window to open. It can be '_blank' or '_self'. If not provided, it will be the event itself.
 * @param {string} icon (Optional) The icon of the button. It can be a FontAwesome icon or any other icon. If not provided, it will be empty.
 * @example generateButton('btn-submit', 'submit', 'pages.contact.btnSend', onFormSubmit_Telegram(), null, 'fa fa-message')
 * @returns {string} The HTML string for the button.
 */
function generateButton(id, type, label, clickEvent, target, icon) {
  const _label = getTranslation(label);
  if (!id) id = 'btn-submit';
  const _type = type || 'button';
  const _class = type === 'submit' ? 'submit' : 'seeMore';

  let tooltip = '';
  let onClickEvent = '';
  if (target === null) {
    const _event = clickEvent.event.toString().replace('() => ', '');
    const _params = clickEvent.params.map(p =>
      JSON.stringify(p).replaceAll('\'', '\\\'').replaceAll('"', '\''))
      .join(',');
    onClickEvent = `${_event}(${_params});return false;`;
  } else if (target === '_blank' && typeof clickEvent === 'string') {
    onClickEvent = `window.open('${clickEvent}', '_blank');return false;`;
    tooltip = `title="${getTranslation('msg.openNewTab')}"`;
  } else {
    onClickEvent = `window.location.href='${clickEvent}';return false;`;
  }

  return `
    <button type="${_type}" id="${id}" class="btn ${_class}" onclick="${onClickEvent}" ${tooltip}>
      ${icon ? `<i class="icon ${icon}"></i>` : ''}
      <span>${_label}</span>
    </button>`;
}

function getTotalPrice(discountPercentage = 0) {
  const cart = getShoppingCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return discountPercentage > 0 ? total * (1 - (discountPercentage / 100)) : total;
}

/**
 * 
 * @param {float|string} _price The price to format. It can be a float or a string.
 * @param {string} _currency The currency to use. It can be 'EUR', 'USD' or 'BTC'. If not provided, it will be the default currency.
 * @returns Returns the formatted price with the currency as a string. The default currency is the one stored at 'CURRENCY'.
 * @example getPriceAndCurrencyTag(10.5, CURRENCIES.USD) => '<span class="currency">$</span><span class="price">10.50</span>'
 */
function getPriceAndCurrencyTag(_price, _currency = CURRENCY) {
  const price = typeof _price === 'string' ? parseFloat(_price.replace(',', '.')) : _price;
  const currency = _currency.length > 1 ? CURRENCIES[_currency] : _currency;
  switch (_currency) {
    case CURRENCIES.USD:
      return `<span class="currency">${currency}</span><span class="price">${price.toFixed(2)}</span>`;
    case CURRENCIES.BTC:
      return `<span class="price">${price.toFixed(8)}</span><span class="currency">${currency}</span>`;
    case CURRENCIES.EUR:
    default:
      return `<span class="price">${price.toFixed(2)}</span><span class="currency">${currency}</span>`;
  }
}

// BITCOIN FUNCTIONS

const MIN_WAIT_TIME = 5; // In minutes
let cachedPrice = null;
let lastFetchedTime = 0;

async function getBitcoinPriceEUR() {
  const now = Date.now();

  // If less than 5 minutes have passed since the last call, we return the cached value
  if ((now - lastFetchedTime) < MIN_WAIT_TIME * 60 * 1000) {
    return cachedPrice || 0;
  }

  // Otherwise, we make the call and update the cached value
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur');
  const data = await response.json();

  cachedPrice = data.bitcoin.eur;
  lastFetchedTime = now;

  return cachedPrice;
}

async function convertToBTC(amount) {
  const priceEUR = await getBitcoinPriceEUR();
  const priceBTC = Math.ceil((amount / priceEUR) * 100000) / 100000;
  return priceBTC.toFixed(8);
}

function generateBitcoinPath(walletAddress, amount) {
  return `bitcoin:${walletAddress}${!isNullOrEmpty(amount) ? `?amount=${amount}` : ''}`;
}