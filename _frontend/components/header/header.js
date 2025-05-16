/**
 * Version: 1.0
 * Type: Component
 * Name: Header
 * Description: Header component
 */
$(document).ready(async function () {
  let DATA_GLOBAL = null;

  try {
    await getData_Global();
  } catch (error) {
    console.error(error);
  } finally {
    loadComponent('nav-menu');
    loadComponent('social-media-links', null, DATA_GLOBAL);
    getLanguage();
  }

  async function getData_Global() {
    // Define the URL and properties
    const properties = [
      { id: 'title', type: Type.TEXT },
      { id: 'logo', type: Type.MEDIAFILE },
      { id: 'socialMedia', type: Type.COMPONENT },
    ];

    // Get data from Strapi
    DATA_GLOBAL = await generateUrl('global', properties);

    // Set data to the header
    setData_Header();
  }

  function setData_Header() {
    // Update the title
    const $globalTitle = $('#global-title');
    $globalTitle.text(DATA_GLOBAL.title);

    // Update the logo
    const $logo = $('#global-logo');
    if (DATA_GLOBAL.logo && DATA_GLOBAL.logo.url && DATA_GLOBAL.title) {
      $logo.attr('src', `${STRAPI_HOST}${DATA_GLOBAL.logo.url}`);
      $logo.attr('alt', DATA_GLOBAL.title);
    }
  }
});