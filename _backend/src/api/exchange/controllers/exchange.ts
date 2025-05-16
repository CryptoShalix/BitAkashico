/**
 * A set of functions called "actions" for `exchange`
 * 
 * Reference guide: https://strapi.io/blog/how-to-create-a-custom-api-endpoint-in-strapi
 */
import { factories } from '@strapi/strapi';
import Stripe from 'stripe';

export default factories.createCoreController('api::exchange.exchange', ({ strapi }) => ({
  stripePayment: async (ctx, next) => {
    try {
      // Get Stripe NPM given a Secret API KEY
      const _STRIPE = require('stripe')(process.env.STRIPE_SECRET_KEY);

      // Get data from the body of the POST request
      const { data: { exchangeData, currentURL } } = ctx.request.body;

      // Generate the array in Stripe format
      const line_items = exchangeData.map(p => ({
        price_data: {
          currency: p.currency,
          product_data: {
            name: p.title,
          },
          // The price must be displayed in cents. That is, if the original price is €19.99, multiply by 100 to get 1999.
          unit_amount: (p.price * 100),
        },
        quantity: p.quantity,
      }));

      // Create the Stripe session
      const session = await _STRIPE.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${currentURL}?status=success`,
        cancel_url: `${currentURL}?status=cancelled`,
      });

      // Return the session data (id and url) to the frontend
      ctx.send({ id: session.id, url: session.url });
    } catch (err) {
      console.error('Error (Stripe):', err);
      ctx.throw(500, 'The session could not be created');
    }
  },
  stripeWebhook: async (ctx, next) => {
    // Get Stripe NPM given a Secret API KEY
    // const _STRIPE = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const _STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = ctx.request.headers['stripe-signature'];

    // OLD VERSION
    // let event;
    // try {
    //   event = _STRIPE.webhooks.constructEvent(
    //     ctx.request.body,
    //     sig,
    //     endpointSecret
    //   );
    // } catch (err) {
    //   ctx.throw(400, `Webhook Error: ${err.message}`);
    // }
    // switch (event.type) {
    //   case 'checkout.session.completed':
    //     const session = event.data.object;
    //     // logica: actualizar orden, enviar correo, etc.
    //     break;
    //   default:
    //   // evento no manejado
    // }
    // ctx.send({ received: true });


    // TYPESCRIPT VERSION
    if (!sig || !endpointSecret) {
      ctx.throw(400, 'Missing Stripe signature or webhook secret');
      return;
    }

    let event: Stripe.Event;
    try {
      // ⚠️ ctx.request.body has a .raw property because of includeRawBody: true
      const rawBody = (ctx.request as any).body.raw;
      event = _STRIPE.webhooks.constructEvent(
        rawBody,
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.error('⚠️ Error verifying Stripe webhook:', err.message);
      ctx.throw(400, `Webhook Error: ${err.message}`);
      return;
    }

    // 🔍 Aquí procesas según el tipo de evento
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Pago completado - Session ID:', session.id);
        // Aquí podrías buscar el pedido y marcarlo como pagado, enviar mail, etc.
        break;

      case 'payment_intent.payment_failed':
        const intent = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Pago fallido - Intent ID:', intent.id);
        break;

      default:
        console.log(`ℹ️ Evento recibido: ${event.type}`);
    }

    ctx.send({ received: true });
  },
  createExchange: async (ctx, next) => {
    try {
      // Get data from the body of the POST request
      const { data: { exchangeData } } = ctx.request.body;

      // Get data from the 'exchange' single type
      const exchange = await strapi.entityService.findMany('api::exchange.exchange', { populate: '*', });

      // Setup required values
      const APIKEY = exchange.APIKEY;
      const amount = exchangeData.amount;
      const paymentMethod = exchangeData.paymentMethod || 'CARD';
      const fromCurrency = exchangeData.fromCurrency || 'EUR';

      console.log(exchange, exchangeData);

      // Make the call to the external API
      const URL = `https://stealthex.io/exchange/new/?amount=${amount}&from=eur&to=btc`;
      //https://stealthex.io/exchange/new/?amount=100&from=eur&to=btc
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${APIKEY}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      // Return the request body response
      ctx.body = {
        params: {
          APIKEY,
          amount,
          paymentMethod,
          fromCurrency,
        },
        result: response
      };
    } catch (error) {
      ctx.internalServerError(`Error al procesar la solicitud ${error}`);
      // ctx.body = JSON.stringify(error);
    }
  }
}));

/*
const response = await fetch('https://api.stealthex.io/v2/transaction', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${APIKEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCurrency: fromCurrency,
          toCurrency: 'BTC',
          amount: amount,
          paymentMethod: paymentMethod,
        }),
      });
      console.log(response);
      // Return the request body response
      ctx.body = {
        params: {
          APIKEY,
          amount,
          paymentMethod,
          fromCurrency,
        },
        result: response
      };

      // TODO: Revisar consola terminal
      if (response.ok) {
        // Success
        const data = await response.json();
        console.log(data);
        ctx.send({ data });
      } else {
        // Error in external API
        const data = await response.json();
        ctx.badRequest(`Error creating exchange ${data}`);
      }
*/

/*
const response = await fetch("https://api.changelly.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "TU_API_KEY", // Cambia esto por tu clave real
        "sign": "FIRMA_HMAC_SHA512" // Si se requiere
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "createTransaction",
        params: {
          from: "usd",
          to: "btc",
          amount: amount,
          address: fixedWallet,
          extraId: null
        }
      })
    });
*/