/**
 * Version: 1.0
 * Type: Component
 * Name: Navigation menu
 * Description: Navigation menu component
 */

/**
   * Set the menu options in the order you desire with the following structure:
   * @name The translated name of the menu option
   * @url The URL of the menu option. This should match the page name inside your 'Pages' folder
   * @icon The icon of the menu option, based on 'Font Awesome icons' (https://fontawesome.com)
   * @isActive Set to 'true' to display the menu option, 'false' to hide it
*/
const menuOptions = [
  { name: getTranslation('nav.home'), url: 'home', icon: 'home', isActive: true },
  { name: getTranslation('nav.about'), url: 'about', icon: 'info-circle', isActive: true },
  { name: getTranslation('nav.store'), url: 'store', icon: 'cart-shopping', isActive: true },
  { name: getTranslation('nav.testimonials'), url: 'testimonials', icon: 'comments', isActive: true },
  { name: getTranslation('nav.contact'), url: 'contact', icon: 'envelope', isActive: true },
  { name: getTranslation('nav.favorites'), url: 'favorites', icon: 'star', isActive: false },
];

let navShow = false;

$(document).ready(async function () {
  // Load menu options
  loadMenuOptions(menuOptions);

  function loadMenuOptions(menuOptions) {
    // Load menu options and clear existing menu
    const navMenu = $('#nav-menu');
    navMenu.empty();

    // Add menu options
    menuOptions.forEach((option) => {
      if (!option.isActive) return;
      const menuItem = $(`
        <a class="router-link active" href="/${option.url}" data-href="${option.url}">
        <i class="icon fa fa-${option.icon}"></i>
        ${option.name}
        </a>`
      );
      navMenu.append(menuItem);
    });

    // Add responsive icon
    navMenu.append(`<a href="javascript:void(0);" class="btn-toggle-icon" onclick="toggleNav()"><i class="fa fa-bars"></i></a>`);

    // Get current URL and validate hash
    loadPage(getCurrentPage());
  }

  // ON WINDOW CHANGED

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('/')) {
      event.preventDefault(); // Prevent the default link behavior
      const page = target.getAttribute('href');
      history.pushState(null, '', `${page}`); // Update the URL without reloading
      loadPage(page.substring(1)); // Dynamically load the content
      // Scroll to top
      scrollToTop(700);
    }
  });
});

// NAVIGATION

function getCurrentPage() {
  // Get current page location
  const path = window.location.pathname;
  const page = path === '/' ? 'home' : path.replaceAll('/', '');
  // Validate if the current page exists in the menuOptions
  const isValidPage = menuOptions.some(option => option.url === page && option.isActive);
  if (!isValidPage) {
    return 'home'; // Default to 'home' if the page is not valid
  }
  return page;
}

function setActiveRouterLink() {
  // For each link (a) with class .router-link do...
  $("a.router-link").each((event, routerLink) => {
    // Get current page location
    const currentPage = getCurrentPage();
    // Remove class 'active'
    $(routerLink).removeClass("active");
    // If the current link is the same as the currentPage
    const href = $(routerLink).data('href');
    if (currentPage === href) {
      // Add class 'active'
      $(routerLink).addClass("active");
    }
  });
}

function toggleNav() {
  // Toggle nav menu
  navShow = !navShow;
  const nav = $('#nav-menu');
  if (navShow) {
    nav.addClass('responsive');
  } else {
    nav.removeClass('responsive');
  }

  // Toggle icon
  const btn_toggle_icon = $('.btn-toggle-icon');
  btn_toggle_icon.html(navShow ? '<i class="fa fa-x"></i>' : '<i class="fa fa-bars"></i>');
}