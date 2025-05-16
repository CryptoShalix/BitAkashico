class PaymentProcessor {
  constructor() {
    // Container IDs
    this.containerIdPaymentSelector = '#checkout-payment-selector';
    this.containerIdPaymentBox = '#checkout-payment-box';
    this.containerIdPaymentData = '#checkout-payment-data';

    this.containerPaymentMethod = '';
    this.paymentMethods = null;
    this.state = {
      selectedMethodID: null,
      selectedMethod: null,
      totalPriceEUR: 0,
      totalPriceBTC: 0,
      qrIDs: [],
      loading: false,
      error: null
    };
    this.initializeEventListeners();
  }

  async initializeEventListeners() {
    this.paymentMethods = await getPaymentMethods();
    await this.renderPaymentMethods();
  }

  // RENDERS: Preparation methods to set HTML

  async renderPaymentMethods() {
    // Empty the payment selector and body containers
    const containerCheckoutSelector = $(this.containerIdPaymentSelector);
    containerCheckoutSelector.empty();
    const containerCheckoutData = $(this.containerIdPaymentData);
    containerCheckoutData.empty();

    if (this.paymentMethods && this.paymentMethods.length > 0) {
      this.paymentMethods.forEach(async pm => {
        // Get Payment Method attributes
        const isActive = pm.isActive;
        const pmID = pm.paymentMethodId;
        const pmDiscountPercent = pm.discountPercentage || 0;
        const discountTag = pmDiscountPercent > 0 ? `[-${pmDiscountPercent}%]` : '';

        // Render payment method button
        containerCheckoutSelector.append(`
          <span
            id="btnCurrency-${pmID}"
            class="btn ${pm.currency} ${isActive ? '' : 'disabled'}"
            ${isActive ? `onclick="paymentProcessor.selectPaymentMethod('${pmID}','${pm.currency}')"` : ''}
          ><i class="${pm.iconClass}"></i>${pm.name}&nbsp;${discountTag}</span>
        `);

        // Render payment method body
        await this.renderPaymentForm(pm, pmDiscountPercent);
      });

      // Generate the QR codes dynamically
      this.generateQRs();

      // Set default payment selector (none)
      this.selectPaymentMethod();
    } else {
      // If there are no active payment methods: show message
      containerCheckoutSelector.append(`
        <div class="description">${getTranslation('msg.noActivePaymentMethods')}</div>
      `);
    }
  }

  async renderPaymentForm(pm, pmDiscountPercent) {
    this.state.selectedMethod = pm;
    this.state.selectedMethodID = pm.paymentMethodId;

    this.totalPriceEUR = getTotalPrice(pmDiscountPercent);
    this.totalPriceBTC = await convertToBTC(this.totalPriceEUR);

    const pmID = pm.paymentMethodId;
    switch (pmID) {
      case 'btc':
        await this.renderBitcoinForm(pm);
        break;
      case 'bizum':
        await this.renderBizumForm(pm);
        break;
      case 'card':
        await this.renderCardForm(pm);
        break;
      case 'paypal':
        await this.renderPayPalForm(pm);
        break;
      case 'bankTransfer':
        await this.renderBankTransferForm();
        break;
    }

    // Payment data container
    $(this.containerIdPaymentData).append(`
      <div id="checkout-${pmID}" class="checkout-wallet hide">
        ${!isNullOrEmpty(pm.description) ? `<span class="description">${pm.description}</span>` : ''}
        ${this.containerPaymentMethod}
        ${this.renderPriceAndCurrency()}
      </div>
    `);
  }

  async renderCardForm(pm) {
    // Generate the HTML payment container for card payment (Button)
    const btnEvent = { event: () => paymentProcessor.onCheckoutWithCard, params: [] };
    this.containerPaymentMethod = `
      ${generateButton(`btnCheckout`, null, 'store.btnCheckout', btnEvent, null, pm.iconClass)}
    `;
    // this.state.containerPaymentMethod= `
    //   <form id="creditCardForm" onsubmit="return false;">
    //       <div class="form-group">
    //           <label for="cardNumber">Card Number</label>
    //           <input type="text" id="cardNumber" pattern="[0-9]{16}" required>
    //       </div>
    //       <div class="form-group">
    //           <label for="expiryDate">Expiry Date (MM/YYYY)</label>
    //           <input type="text" id="expiryDate" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" required>
    //       </div>
    //       <div class="form-group">
    //           <label for="cvv">CVV</label>
    //           <input type="text" id="cvv" pattern="[0-9]{3,4}" required>
    //       </div>
    //       <button onclick="paymentProcessor.onCheckoutWithCard()" class="method-btn">
    //           Pay ${this.state.totalPriceEUR}
    //       </button>
    //   </form>
    // `;
  }

  async renderBitcoinForm(pm) {
    // Get the wallet data
    const walletQR = pm.QR;
    const walletTAGURL = pm.TAGURL;
    const walletQRURL = isNullOrEmpty(pm.QRURL) ? walletTAGURL : pm.QRURL;

    // Generate the QR code for Bitcoin payment
    const bitcoinQRUrl = generateBitcoinPath(walletQRURL, this.totalPriceBTC);

    // Add the QR Id and URL to the list
    const qrId = `qr-${pm.paymentMethodId}`;
    this.state.qrIDs.push({ id: qrId, url: bitcoinQRUrl });

    // Generate the HTML payment container
    this.containerPaymentMethod = `
      ${walletTAGURL ? `
        <span class="description">${getTranslation('msg.copyToClipboard')}</span>
        <span onclick="copyToClipboard('${walletTAGURL}')">${pm.TAG}</span>
        ` : ''}
      ${walletQR ? `
        <span class="description">${getTranslation('msg.scanToPay')}</span>
        <a id="${qrId}" href="${bitcoinQRUrl}" target="_blank">
          <img src="${walletQR}" alt="QR Code" class="qr-code">
        </a>
      ` : ''}
    `;
  }

  async renderBizumForm(pm) {
    this.containerPaymentMethod = `
      <span class="description">${getTranslation('msg.copyToClipboard')}</span>
      <span onclick="copyToClipboard('${pm.TAG}')">${pm.TAG}</span>
      ${this.renderTagAmountConcept()}
    `;
  }

  async renderPayPalForm(pm) {
    // Get the wallet data
    const walletQR = pm.QR;
    const walletTAGURL = pm.TAGURL;
    const walletQRURL = isNullOrEmpty(pm.QRURL) ? walletTAGURL : pm.QRURL;

    // Add the QR Id and URL to the list
    const qrId = `qr-${pm.paymentMethodId}`;
    this.state.qrIDs.push({ id: qrId, url: walletQRURL });

    // Generate the HTML payment container
    this.containerPaymentMethod = `
      ${walletTAGURL ? `
        <span class="description">${getTranslation('msg.copyToClipboard')}</span>
        <span onclick="copyToClipboard('${walletTAGURL}')">${pm.TAG}</span>
        ` : ''}
      ${walletQR ? `
        <span class="description">${getTranslation('msg.scanToPay')}</span>
        <a id="${qrId}" href="${walletQRURL}" target="_blank">
          <img src="${walletQR}" alt="QR Code" class="qr-code">
        </a>
      ` : ''}
      ${this.renderTagAmountConcept()}
    `;
  }

  // EVENTS: Main event functions for payment methods

  async onCheckoutWithCard() {
    try {
      this.showLoading();
      const exchangeData = getShoppingCart();
      const currentURL = window.location.href;
      // const response = await postQuery('exchange/createExchange', { exchangeData }, false);
      const response = await postQuery('exchange/stripePayment', { exchangeData, currentURL }, false);
      console.log(response);
      if (!isNullOrEmpty(response)) {
        // Open the response URL (contains the Stripe checkout form)
        const checkoutWindow = window.open(response.url);

        // every five seconds we check if it is closed
        const timer = setInterval(() => {
          if (checkoutWindow.closed) {
            clearInterval(timer);
            // Close loading screen, update shopping cart, toggle checkout modal, etc
            this.updateCheckoutState();
          }
        }, 5000);
      }
    } catch (error) {
      this.handleError(error);
      this.updateCheckoutState();
    }
  }

  async selectPaymentMethod(pmID, currency) {
    // Get containers
    const containerSelector = $(this.containerIdPaymentSelector);
    const containerBox = $(this.containerIdPaymentBox);
    const containerData = $(this.containerIdPaymentData);

    // Get the button for the selected currency and update class
    containerSelector.children('span').each(function () {
      if ($(this).attr('id') === `btnCurrency-${pmID}`) {
        $(this).addClass('selected');
      } else if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      }
    });

    if (isNullOrEmpty(pmID)) {
      // If there is no pmID, hide the payment box and show the selector
      containerBox.addClass('hide');
      containerSelector.removeClass('hide');
    } else {
      // If there is a pmID, hide the selector and show the payment box
      containerBox.removeClass('hide');
      containerSelector.addClass('hide');

      // Set the 'Fiat' or 'BTC' class for the payment box
      containerBox.removeClass('btc').removeClass('fiat').addClass(currency);

      // For each div inside the 'containerCheckoutData', hide all and show the selected one (pmID)
      containerData.children('div').each(function () {
        if ($(this).attr('id') === `checkout-${pmID}`) {
          $(this).removeClass('hide');
        } else if (!$(this).hasClass('hide')) {
          $(this).addClass('hide');
        }
      });
    }
  }

  generateQRs() {
    // Generate the QR codes dynamically
    this.state.qrIDs.forEach(qr => {
      new QRCode(document.getElementById(qr.id), {
        text: qr.url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
    });
  }

  renderTagAmountConcept() {
    return `<div class="description">${getTranslation('store.tagAmountConcept')}</div>`;
  }

  renderPriceAndCurrency() {
    const tagPriceAndCurrencyEUR = getPriceAndCurrencyTag(this.totalPriceEUR, CURRENCIES.EUR);
    const tagPriceAndCurrencyBTC = getPriceAndCurrencyTag(this.totalPriceBTC, CURRENCIES.BTC);
    return `
      <span class="totalPayment">
        ${getTranslation('store.msgTotal')}: ${tagPriceAndCurrencyEUR} [${tagPriceAndCurrencyBTC}]
      </span>
    `;
  }

  updateCheckoutState() {
    this.hideLoading();
    toggleCheckout();
  }

  // LOADING SPINNER

  showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');
  }

  hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('hidden');
  }

  // ERROR & SUCCESS MANAGERS

  handleError(error) {
    manageError(error, error.message);
  }

  handleSuccess(response) {
    console.log('Stripe payment SUCCESS. ID: ', response);
    showMessage(TYPE_MESSAGE.SUCCESS, response.msg);
    this.hideLoading();
  }
}

const paymentProcessor = new PaymentProcessor();

async function toggleCheckout() {
  const checkout = $('#checkout-container');
  if (checkout.hasClass('show')) {
    checkout.removeClass('show');
  } else {
    checkout.addClass('show');
  }
  // Set default payment selector (none)
  await paymentProcessor.selectPaymentMethod();
}