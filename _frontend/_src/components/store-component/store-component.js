/**
 * Version: 1.0
 * Type: Component
 * Name: Store component
 * Description: Store component with all my items: services, formations, products, etc.
 */
$(document).ready(async function () {
  await loadComponent('table-items', 'formations', filterStoreItems('formation'));
  await loadComponent('table-items', 'products', filterStoreItems('product'));
  await loadComponent('table-items', 'services', filterStoreItems('service'));

  function filterStoreItems(category) {
    return _storeItems.filter(item => item.category.toLowerCase() === category);
  }

  onTranslate();
});