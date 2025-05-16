/**
 * @version 1.0.0
 * @file language.js
 * @description This file handles the language translation.
 * @author CryptoShalix <https://github.com/CryptoShalix>
 * @see https://cryptoshalix.github.io/site
 * 
 * How to use:
 * 1. Include this file in your HTML file.
 *    <script type="text/javascript" src="js/language.js"></script>
 * 2. Add a 'data-trn-key' attribute to the element you want to translate.
 * 3. Add the specified 'trn_class' class to the element you want to translate.
 * 4. Create the JSON files with the translations. Make sure the 'trn_path' is correct.
 * 
 * Example:
 *  <h1 class="trn" data-trn-key="global.title"></h1>
 */

/***************************************************************/
// MAIN VARIABLES
/***************************************************************/

// Set if your localization translations are loaded locally (true) or from a server (false)
const LOCALIZATION_LOCAL = false;

const TRN_CLASS = '.trn';
const TRN_PATH = '/_frontend/localization/';

const languages = ['es', 'en'];
const translations = {};
let currentLanguage = 'es';

/***************************************************************/
// MAIN METHOD
/***************************************************************/

async function prepareLanguages() {
  // Fetch all json languages from localization folder
  await fillLanguages();
}

/***************************************************************/
// PUBLIC METHODS
/***************************************************************/

/**
 * LOCALIZATION CHANGER
 * 
 * This function will change the current language, store it in session and force the reload of the page if required.
 */
function toggleLanguage() {
  // Update current language with the next on the list
  getNextLanguage();
  getLanguage();

  if (LOCALIZATION_LOCAL) {
    // Translate the elements from JSON files inside this app.
    onTranslate();

    // Update the API data (manually)
    prepareAPI();
  } else {
    // Reload the page so that all required API methods are called in order to load the localization from the server.
    window.location.reload();
  }
};

/***************************************************************/
// PRIVATE METHODS
/***************************************************************/

async function fillLanguages() {
  for (const language of languages) {
    const url = `${TRN_PATH}${language}.json`;
    let res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      continue;
    }
    let json = await res.json();
    translations[language] = json;
  }
}

function getTranslation(trn_key) {
  if (isNullOrEmpty(trn_key)) return '';
  const result = parseTRN(translations[currentLanguage][0], trn_key);
  return isNullOrEmpty(result) ? trn_key : result;
}

/**
 * Translate the elements with the 'data-trn-key' attribute.
 */
function onTranslate() {
  $(TRN_CLASS).each(function () {
    var trn_key = $(this).attr("data-trn-key");
    if (!isNullOrEmpty(trn_key)) {
      var htmlText = getTranslation(trn_key);
      if (!isNullOrEmpty(htmlText)) {
        if ($(this).hasClass('placeholder')) {
          $(this).attr('placeholder', htmlText);
        } else {
          $(this).html(htmlText);
        }
      }
    }
  });
};

function parseTRN(dict, trn) {
  if (trn.includes('.')) {
    const valueLevels = trn.split('.');
    let base = dict;
    for (const level of valueLevels) {
      if (isNullOrEmpty(base[level])) { return dict[trn]; }
      base = base[level];
    }
    result = base;
  } else {
    result = dict[trn];
  }
  return isNullOrEmpty(result) ? dict[trn] : result;
}

function getLanguage() {
  // Get the language from localStorage or default
  currentLanguage = localStorage.getItem('currentLanguage') || currentLanguage;

  // Update the language text in the header
  $('#header-language').html(currentLanguage.toUpperCase());
}

function getNextLanguage() {
  // Update current language
  const currentIndex = languages.indexOf(currentLanguage);
  currentLanguage = languages[(currentIndex + 1) % languages.length];

  // Store language in localStorage
  localStorage.setItem('currentLanguage', currentLanguage);
}