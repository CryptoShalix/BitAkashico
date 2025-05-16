/**
 * Version: 1.0
 * Type: Component
 * Name: Footer
 * Description: Footer component
 */
$(document).ready(async function () {

  getFooter();

  function getFooter() {
    const sCopyright = getTranslation('global.sCopyright');
    const sCredits = getTranslation('global.sCredits');
    $('#footer-copyright').html(`${new Date().getFullYear()} - ${sCopyright}`);
    $('#footer-credits').html(`${sCredits}`);
  }
});