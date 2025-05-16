/**
 * Version: 1.0
 * Type: Component
 * Name: Stack cards
 * Description: Stack cards component
 */

// Listen to the event 'listener_stack-cards'
document.addEventListener('listener_stack-cards', function (event) {
  const { componentId, data } = event.detail;
  setData_StackCards(componentId, data);
});

function setData_StackCards(id, data) {
  // Select the element by #id and clean it
  const $stackCards = $(`#${id}`);
  $stackCards.empty();

  // Fill the '$stackCards' element
  if (data && data.Card.length > 0) {
    $stackCards.append(`
      <div class="stack-cards">
      ${data.Card.filter(c => c.isActive).map(card => `
          <div class="card">
            <div class="container">
              <span>${card.description}</span>
              <h1>${card.title}</h1>
            </div>
          </div>
        `).join('')}
      </div>
      `
    );
  }
}