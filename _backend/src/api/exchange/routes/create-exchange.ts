/*
  The route file for creating an exchange in the Strapi application.
*/

export default {
  routes: [
    {
      method: 'POST',
      path: '/exchange/stripePayment',
      handler: 'exchange.stripePayment',
    },
    {
      method: 'POST',
      path: '/exchange/stripeWebhook',
      handler: 'exchange.stripeWebhook',
      onfig: {
        auth: false,
        policies: [],
        middlewares: [],
      }
    },
    {
      method: 'POST',
      path: '/exchange/createExchange',
      handler: 'exchange.createExchange',
    },
  ],
}