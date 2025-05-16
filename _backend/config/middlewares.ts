export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      includeRawBody: true, // 👈 Required to validate the Stripe webhook
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
