/**
 * Version: 1.0
 * Type: Component
 * Name: Table items
 * Description: A component that shows a table with items and prices
 */

// Listen to the event 'listener_table-items'
document.addEventListener('listener_table-items', function (event) {
  const { componentId, data } = event.detail;
  setData_TableItems(componentId, data);
});

function setData_TableItems(id, data) {
  // Select the element by #id and clean it
  const tableItems = $(`#${id}`);
  tableItems.empty();

  // Fill the info
  if (data && data.length > 0) {
    const category = data[0].category.toLowerCase();
    tableItems.append(`
      <h1>${getTranslation(`category.${category}`)}</h1>
      <div class="table-items">
        ${data.map(item => `
          <div class="item-box" id="itemBox${item.id}">
            <div class="item-header">
              ${item.cover ? `<img src="${item.cover}" alt="${item.title}">` : ''}
              <h1>${item.title}</h1>
            </div>
            ${getPricesContainer(item.prices)}
            <div class="item-body">
              <p class="description">${item.description}</p>
            </div>
            ${item ? `<div class="item-footer">${getStoreButton(category, item)}</div>` : ''}
          </div>
        `).join('')}
      </div>
      `
    );
  }
}

function getPricesContainer(prices) {
  // Get original price
  const priceOriginal = parseFloat(prices.priceOriginal.replace(',', '.'));

  // If a discount is applied, calculate the final price
  const applyDiscount = prices.applyDiscount;
  // If the discount is not applied, the final price is the original price
  const priceFinal = applyDiscount
    ? calculateDiscount(priceOriginal, prices.discountPercentage)
    : priceOriginal;

  // Prepare the periodicity and price tags
  const tagCostPeriodicity = prices.costPeriodicity ?
    `${getTranslation('global.costType.paid')} ${getTranslation(`global.costPeriodicity.${prices.costPeriodicity}`)}` : '';
  const tagPrice = getTranslation('store.price');

  // Prepare the prices HTML
  const pricesHTML = `<span class="price-periodicity">${tagCostPeriodicity}</span>
    <div class="price-box">
      ${tagPrice}
      ${applyDiscount ? `<div class="price-original crossedOut">${getPriceAndCurrencyTag(prices.priceOriginal, prices.currency)}</div>` : ''}
      <div class="price-final">${getPriceAndCurrencyTag(priceFinal, prices.currency)}</div>
    </div>
  `;
  return `<div class="prices">${pricesHTML}</div>`;
}

function calculateDiscount(price, discountPercentage) {
  return price - (price * (discountPercentage / 100));
}

function getStoreButton(category, item) {
  switch (category) {
    case 'service':
      btn = `${generateButton(`btnBook${item.id}`, null, 'store.btnBook', `${_RESERVATIONS_URL}`, '_blank', 'fa-solid fa-calendar-check')}`;
      break;
    case 'formation':
    case 'product':
    default:
      const btnEvent = { event: () => onBuyItem, params: [item] };
      btn = `${generateButton(`btnBuy${item.id}`, null, 'store.btnAddToCart', btnEvent, null, 'fa-solid fa-cart-plus')}`;
      break;
  }
  return btn;
}

function onBuyItem(item) {
  // Get required data
  const itemId = item.id;
  const itemTitle = item.title;
  const itemPrice = calculateDiscount(item.prices.priceOriginal, item.prices.discountPercentage);
  const itemPriceOldStudent = item.applyDiscountOldStudent ? calculateDiscount(itemPrice, item.prices.discountOldStudent) : itemPrice;
  const itemCurrency = item.prices.currency;

  // Create the item object to add to the cart
  const itemToAdd = {
    id: itemId,
    title: itemTitle,
    price: itemPrice,
    priceOldStudent: itemPriceOldStudent,
    currency: itemCurrency,
    cover: item.cover || null,
    description: item.description || null,
  };

  // Add to cart
  addToCart(itemToAdd);
}