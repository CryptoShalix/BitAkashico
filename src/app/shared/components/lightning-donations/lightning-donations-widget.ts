// import JSConfetti from 'js-confetti'
// import { contrastingColor, fetchInvoice, fetchParams, luma } from './lightning-donations-utils';
// export default {
//   name: 'LightningWidget',
//   props: {
//     name: { type: String, required: true },
//     to: { type: String, required: true, default: 'reneaaron@getalby.com' },

//     // Style
//     image: { type: String, required: true },
//     accent: { type: String, default: '#20C997' },
//     buttonText: { type: String, default: 'Donate sats' },
//     backgroundImage: { type: String, default: null },
//     // Deprecated --> use `to`
//     address: { type: String, required: false, default: 'reneaaron@getalby.com' },
//     // Debugging purposes only
//     debug: { type: Boolean, default: false },
//     initialStep: { type: String, default: 'start' },
//   },
//   data() {
//     return {
//       currentAmount: this.amount,
//       params: {},
//       loading: false,
//       paymentRequest: null,
//       step: this.initialStep,
//       comment: '',
//       qrTimeoutElapsed: false,
//       paymentType: 'Invoice',
//       errorTitle: '',
//       errorMessage: '',
//     };
//   },
//   computed: {
//     cssProps() {
//       return {
//         '--accent': this.accent,
//         '--color': this.color,
//         '--button-color': luma(this.accent.substring(1)) < 200 ? this.accent : '#000',
//       };
//     },
//     color() {
//       return contrastingColor(this.accent.substring(1));
//     },
//     backgroundImageStyle() {
//       return this.backgroundImage ? { 'background-image': `url('${this.backgroundImage}')` } : {};
//     }
//   },
//   async mounted() {
//     // Install fonts (do need to be included outside of the shadow dom)
//     const fontImport = document.createElement('link');
//     fontImport.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
//     fontImport.setAttribute('rel', 'stylesheet');
//     fontImport.setAttribute('type', 'text/css');

//     document.head.appendChild(fontImport);
//     // Keysend payments
//     if (this.to.match(/^[0-9a-fA-F]{66}$/i)) {
//       this.paymentType = 'Keysend';
//     } else if (this.debug) {
//       try {
//         this.params = await fetchParams(this.to);
//         console.log(this.params, this.to);
//         if (this.params.min > 10 || this.params.max < 1000) {
//           this.error('Configuration error', `Please make sure the LNURL you provided allows payments between 10 and 1000 sats. (min: ${this.params.min}, max: ${this.params.max})`);
//         } else if (!this.params.commentAllowed || this.params.commentAllowed < 100) {
//           this.error('Configuration error', 'Please make sure the LNURL you provided allows comments of at least 100 characters in length.');
//         }
//       } catch (e) {
//         this.error('Configuration error', 'Are you sure this is a valid lightning address or LNURL?');
//       }
//     }
//   },
//   methods: {
//     error (title, message) {
//       this.errorTitle = title;
//       this.errorMessage = message;
//       this.step = 'error';
//     },
//     async pay() {
//       await this['pay' + this.paymentType]();
//     },
//     async payKeysend() {
//       let error = false;
//       try {
//         this.loading = true;

//         if (window.webln) {
//           await window.webln.enable();
//           await window.webln.keysend({
//             destination: this.to,
//             amount: this.currentAmount,
//             customRecords: {
//               // https://docs.lightning.engineering/lightning-network-tools/lnd/send-messages-with-keysend
//               34349334: this.comment
//             }
//           });
//           this.step = 'thankyou';
//           this.celebrate();
//         } else {
//           error = true;
//         }
//       } catch (e) {
//         error = true;
//       } finally {
//         this.loading = false;
//       }
//       if (error) {
//         this.error('No wallet available', `You first need to install a browser extension.<br><br><a class="text-link" href="https://www.getalby.com" target="_blank" rel="noopener noreferrer">Learn more</a>`);
//       }
//     },
//     async payInvoice() {
//       let webln;
//       let error = false;
//       try {
//         this.loading = true;
//         let invoice;

//         // Fetch invoice
//         try {
//           invoice = await fetchInvoice(this.to || this.address, this.currentAmount, this.comment);
//           this.paymentRequest = invoice.payment_request;
//         } catch (e) {
//           this.error('Sorry', 'An error happend during the payment. Try again?');
//           this.loading = false;
//           return;
//         }
//         webln = window.webln;
//         if (webln) {
//           await webln.enable();
//           await webln.sendPayment(invoice.payment_request);
//           this.step = 'thankyou';
//           this.celebrate();
//         } else {
//           error = true;
//         }
//       } catch (e) {
//         error = true;
//       } finally {
//         this.loading = false;
//       }
//       if (error) {
//         this.showQR();
//       }
//     },
//     showQR () {
//       this.qrTimeoutElapsed = false;
//       this.step = 'qr';
//       setTimeout(() => { this.qrTimeoutElapsed = true; }, 3000);
//     },
//     back () {
//       const steps = [
//         'start',
//         'amount',
//         'note',
//         'pay',
//         'qr',
//       ];
//       this.step = steps[steps.indexOf(this.step) - 1];
//     },
//     celebrate () {
//       const canvas = this.$refs['confetti'];
//       const jsConfetti = new JSConfetti({ canvas });
//       jsConfetti.addConfetti({
//         confettiColors: [
//           this.color
//         ],
//       });
//     },
//     reset () {
//       this.comment = '';
//       this.currentAmount = null;
//       this.paymentRequest = null;
//     }
//   },
// };
