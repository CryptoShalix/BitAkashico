/**
 * Version: 1.0
 * Type: Component
 * Name: Horizontal Scroll
 * Description: Horizontal Scroll component
 */

// Listen to the event 'listener_horizontal-scroll'
document.addEventListener('listener_horizontal-scroll', function (event) {
  const { componentId, data } = event.detail;
  setData_HorizontalScroll(componentId, data);
});

function setData_HorizontalScroll(id, data) {
  // Select the element by #id and clean it
  const $horizontalScroll = $(`#${id}`);
  $horizontalScroll.empty();

  // Fill the events
  $horizontalScroll.append(`
    <div class="horizontal-scroll-container">
      <h1>${data.title}</h1>
      <span class="description">${data.description}</span>
      ${data.events.filter(ev => ev.isActive).length > 0 ? `
      <div class="horizontal-scroll">
      ${data.events.filter(e => e.isActive).map(event => `
        <div class="container" ${event.cover && event.cover.url ? `style="background-image: url('${STRAPI_HOST}/${event.cover.url}')"` : ''}>
          <article >
            <h1 class="hscontainer-title">${event.title}</h1>
            <p class="hscontainer-description">${event.description}</p>
            <span class="hscontainer-price">${event.price !== null && event.price > 0 ? `${event.price} €` : '¡GRATIS!'}</span>
          </article>
        </div>
      `).join('')}
      </div>`: `<span>${getTranslation('global.noEvents')}</span>`}
    </div>
    `
  );

  // Update the --events variable for the 'horizontal-scroll' class
  const horizontalScrollElement = $('.horizontal-scroll');
  if (horizontalScrollElement.length > 0) {
    horizontalScrollElement[0].style.setProperty('--events', data.events.length);
  }
}