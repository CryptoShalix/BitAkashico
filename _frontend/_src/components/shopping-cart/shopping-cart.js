/**
 * Version: 1.0
 * Type: Component
 * Name: Shopping cart
 * Description: A component that shows a fixed modal with the shopping cart
 */

// VARIABLES

const LOCAL_STORAGE_KEY = 'cart';
let MINIMIZE_SHOPPING_CART = true;

// ON INIT

$(document).ready(async function () {
  // Initialize the shopping cart
  updateShoppingCart();
  toggleShoppingCart(MINIMIZE_SHOPPING_CART);

  // Initialize the checkout container
  loadComponent('payments', 'checkout-container');

  // Load translations
  onTranslate();
});

// SHOPPING CART METHODS

function updateShoppingCart() {
  const cartContainer = $('#shopping-cart-items');
  cartContainer.empty();

  const msgEmptyCart = getTranslation('store.msgEmptyCart');

  // Update the cart items
  const cart = getShoppingCart();
  if (cart.length === 0) {
    cartContainer.append(`<p class="empty-cart">${msgEmptyCart}</p>`);
  } else {
    cartContainer.append(`
    <ul>
    ${cart.map(item => {
      const _quantity = item.quantity || 0;
      return `<li>
        <div class="item-header">
          ${item.cover ? `<img src="${item.cover}" alt="${item.title}">` : ''}
          <span>${item.title}</span>
        </div>
        <div class="item-body">
          <span>x${_quantity}</span>
          <span>${getPriceAndCurrencyTag(item.price * _quantity, item.currency)}</span>
          <i class="btnRemoveItem fa-solid fa-trash" onclick="removeFromCart(${item.id})"></i>
        </div>
      </li>`;
    }).join('')}
    </ul>
    `);
  }

  // Get the total price and currency
  const currency = cart.length > 0 ? cart[0].currency : CURRENCY;
  const tagPriceAndCurrency = `<span>${getTranslation('store.msgTotal')}: ${getPriceAndCurrencyTag(getTotalPrice(), currency)}</span>`;

  // Update the total price container
  const cartTotal = $('#shopping-cart-total');
  cartTotal.empty();

  const btnEvent = { event: () => toggleCheckout, params: [] };
  const btn = `${generateButton(`btnCheckCart`, null, 'store.btnCheckCart', btnEvent, null, 'fa-solid fa-shopping-cart')}`;
  cartTotal.append(`${tagPriceAndCurrency}${btn}`);

  // Update the title container
  const cartTitle = $('#shopping-cart-title');
  cartTitle.empty();
  cartTitle.append(cart.length === 0 ? msgEmptyCart : tagPriceAndCurrency);
}

function getShoppingCart() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function addToCart(item) {
  const cart = getShoppingCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Default quantity to 1 if not already in the cart
    cart.push({ ...item, quantity: 1 });
  }

  saveAndUpdateCart(cart);
  toggleShoppingCart(false);
}

function removeFromCart(itemId) {
  // Get the cart from local storage
  let cart = getShoppingCart();
  if (cart.length === 0) return;

  // Get the item from the cart by id
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  if (existingItem && existingItem.quantity > 1) {
    // Reduce the quantity by 1
    existingItem.quantity -= 1;
  } else {
    // Remove the item from the cart
    cart = cart.filter(cartItem => cartItem.id !== itemId);
  }

  saveAndUpdateCart(cart);
}

function emptyCart() {
  saveAndUpdateCart([]);
}

function saveAndUpdateCart(cart) {
  // Update the cart in local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  updateShoppingCart();
}

function toggleShoppingCart(minimize = false) {
  const shoppingCart = $('#shopping-cart');
  if (getShoppingCart().length === 0) {
    shoppingCart.addClass('hide');
  } else {
    shoppingCart.removeClass('hide');
    // Toggle the shopping cart visibility (height)
    const btnToggleShoppingCart = $('#btnToggleShoppingCart');
    MINIMIZE_SHOPPING_CART = minimize;
    if (MINIMIZE_SHOPPING_CART) {
      shoppingCart.addClass('minimize');
      btnToggleShoppingCart.removeClass('fa-arrow-down').addClass('fa-arrow-up');
    } else {
      shoppingCart.removeClass('minimize');
      btnToggleShoppingCart.removeClass('fa-arrow-up').addClass('fa-arrow-down');
    }
  }
}