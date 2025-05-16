/**
 * Version: 1.0
 * Type: Component
 * Name: Grid cards
 * Description: Grid cards component
 */

// Listen to the event 'listener_grid-cards'
document.addEventListener('listener_grid-cards', function (event) {
  const { componentId, data } = event.detail;
  setData_GridCards(componentId, data);
});

function setData_GridCards(id, data) {
  console.log(id, data);
  // Select the element by #id and clean it
  const gridCards = $(`#${id}`);
  gridCards.empty();

  // Fill the info
  if (data && data.Card.length > 0) {
    gridCards.append(`
      <div class="grid-cards">
      ${data.Card.filter(c => c.isActive).map(card => `
          <div class="card">
            <span>${card.description}</span>
            <h1>${card.title}</h1>
          </div>
        `).join('')}
      </div>
      `
    );
  }
}