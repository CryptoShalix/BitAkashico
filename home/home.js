/**
 * Version: 1.0
 * Type: Page
 * Name: Home
 * Description: Home page with grid cards, stack cards and horizontal scroll
 */

$(document).ready(async function () {
  // Set max testimonials to show
  _MAX_TESTIMONIALS = 4;

  // Prepare testimonials
  await loadComponent('testimonials');

  // Prepare store items
  await loadComponent('store-component');

  // Prepare events
  await loadComponent('horizontal-scroll', 'events', await getData_Events());

  // Translate the page
  onTranslate();
});

async function getData_Events() {
  // Define the URL and properties
  const properties = [
    { id: 'title', type: Type.TEXT },
    { id: 'description', type: Type.TEXT },
    { id: 'events', type: Type.COMPONENT },
  ];

  // Get data from Strapi
  return await generateUrl('event-container', properties);
}