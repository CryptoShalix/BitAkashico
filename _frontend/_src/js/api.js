/**
 * @version 1.0.0
 * @file api.js
 * @description This file handles the API connection with Strapi.
 * @author CryptoShalix <https://github.com/CryptoShalix>
 * @see https://cryptoshalix.github.io/site
 * 
 * Strapi Docs: https://docs.strapi.io/dev-docs/api/rest
 *
 * How to use:
 * 1. Update the STRAPI_TOKEN variable with your Strapi token.
 * 2. If you are working in local, update the STRAPI_HOST variable with your Strapi host.
 *    Once you upload your backend, update your STRAPI_HOST variable with your Strapi host.
 */

/***************************************************************/
// MAIN VARIABLES
/***************************************************************/

const ENVIRONMENTS = {
  local: 'http://localhost:1337',
  production: 'https://bitakashico-backend.onrender.com'
};

const STRAPI_HOST = ENVIRONMENTS.production;
const SHOW_LOG = STRAPI_HOST === ENVIRONMENTS.local ? true : false;
const STRAPI_TOKEN = "046044b3e618b298f9106c85e771160ddd611329be2978cf933d6eeaf0130657c2b8cd2a528fee2bdb8d7eac30e4c62f70f133db41e18382ab8f2b40332f6ef2a340c27822a3250702c10ca3af2adae131b36424795b43361034d64b54115667d40fc346dea0de269314a70ab69671ff89d1915a4633560225e882490134a74e";

const Type = {
  TEXT: 'text',
  MEDIAFILE: 'mediafile',
  COMPONENT: 'component',
  DYNAMIC: 'dynamic',
};

/***************************************************************/
// PRIVATE STRAPI METHODS
/***************************************************************/

/**
 * Generate the URL for a given 'url' and 'properties'
 * @param {The name of the 'Single' or 'Collection' Type of the Strapi CRM} url
 * @param {An array with the properties of that 'Single' or 'Collection' Type with the name as id and the type of that property.} properties
 * @returns 
 */
async function generateUrl(url, properties) {
  // Generate the filters by matching the properties with the Strapi fields types
  const filters = properties
    .map(property => {
      if (property.type === Type.MEDIAFILE) {
        // If it is a media file, we need to populate the URL
        return `populate[${property.id}][fields][${properties.indexOf(property)}]=url`;
      } else if (property.type === Type.COMPONENT) {
        // If it is a component, we need to populate all the fields
        return `populate[${property.id}][populate]=*`;
      } else if (property.type === Type.DYNAMIC) {
        // If it is a dynamic, we need to populate the URL
        return `populate[${property.id}][on][${property.dynamicName}][populate]=*`;
      } else if (property.type === Type.TEXT) {
        // If it is a text, we need to get the field for that property and set it to the index
        return `fields[${properties.indexOf(property)}]=${property.id}`;
      } else {
        // If it is has no Type, just populaatete all the fields
        return `populate=*`;
      }
    })
    .join('&');

  // Generate the URL with the filters
  const final_url = `${url}?locale=${currentLanguage}&${filters}`;

  // Return the data from the URL
  return await callQuery(final_url, properties);
}

async function callQuery(url, properties) {
  const data = (await query(url)).data;
  if (SHOW_LOG) { console.log('api.js - getData - data: ', data); }
  return Array.isArray(data) ? data.map(item => mapProperties(properties, item)) : mapProperties(properties, data);
}

function mapProperties(properties, data) {
  const result = {};
  properties.forEach(property => {
    if (property.type === Type.MEDIAFILE && data[property.id] && data[property.id].url) {
      result[property.id] = `${STRAPI_HOST}${data[property.id].url}`;
    } else {
      result[property.id] = data[property.id];
    }
  });
  return result;
}

async function query(url) {
  const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`
    }
  });
  return await res.json();
}

async function postQuery(url, data, authToken = true) {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    throw new Error('Invalid "data" payload: The request body must be a non-empty object.');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const errorDetails = await res.json();
    throw new Error(`Error ${res.status}: ${errorDetails}`);
  }

  return await res.json();
}

/**
 * TODO: Check if it is worth it or remove this method
 * @param {*} mediaFile 
 */
async function uploadMedia2(mediaFile) {
  const formData = new FormData();
  // 'mediaFile' is your video or image file object
  formData.append('files', mediaFile);

  await fetch(`${STRAPI_HOST}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: formData
  }).then(response => {
    console.log(response);
    return response.json();
  }).then(data => {
    // Return the ID of the uploaded file
    return data[0].id;
  });
}

/**
 * TODO: Check if it is worth it or remove this method
 * @param {*} mediaFile 
 */
async function uploadMedia(mediaFile) {
  const formData = new FormData();
  formData.append('files', mediaFile);
  try {
    const response = await fetch(`${STRAPI_HOST}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Upload response:', data);
    return data[0].id; // Return the ID of the uploaded file
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
}

/*****************************************************************/
// SERVICES
/*****************************************************************/

async function getStoreItems() {
  try {
    const properties = [
      { id: 'id', type: Type.TEXT },
      { id: 'title', type: Type.TEXT },
      { id: 'description', type: Type.TEXT },
      { id: 'cover', type: Type.MEDIAFILE },
      { id: 'isActive', type: Type.TEXT },
      { id: 'category', type: Type.TEXT },
      { id: 'prices', type: Type.COMPONENT },
    ];
    return await generateUrl('stores', properties);
  } catch (error) {
    console.error('Error fetching services:', error);
  }
  return [];
}

async function getPaymentMethods() {
  try {
    const properties = [
      { id: 'name', type: Type.TEXT },
      { id: 'description', type: Type.TEXT },
      { id: 'currency', type: Type.TEXT },
      { id: 'paymentMethodId', type: Type.TEXT },
      { id: 'iconClass', type: Type.TEXT },
      { id: 'isActive', type: Type.TEXT },
      { id: 'TAG', type: Type.TEXT },
      { id: 'TAGURL', type: Type.TEXT },
      { id: 'QR', type: Type.MEDIAFILE },
      { id: 'QRURL', type: Type.TEXT },
      { id: 'discountPercentage', type: Type.TEXT },
    ];
    return await generateUrl('payment-methods', properties);
  } catch (error) {
    console.error('Error fetching services:', error);
  }
  return [];
}

/****************************************************************/
// CLIENT
/****************************************************************/

/**
 * 
 * @param {*} clientData An object containing the client data. The object must contain, at least, a 'name' property.
 * * @returns The client object from Strapi or null if no client found.
 * @throws {Error} If the client data is invalid or if the client is not found.
 */
async function getClient(clientData) {
  if (!clientData || !clientData.name) {
    throw new Error('Invalid client data: The client data must contain a name.');
  }

  const response = await query(`clients?filters[name][$eq]=${encodeURIComponent(clientData.name)}`);

  if (SHOW_LOG) { console.log('api.js - getClient - response: ', response); }

  return response.data.length > 0 ? response.data[0] : null;
}

/**
 * 
 * @param {*} clientData An object containing the client data. The object must contain, at least, a 'name' property.
 * The object can contain the following properties: name, link, isAnonymous, picture, email.
 * @returns The client object from Strapi.
 */
async function createClient(clientData) {
  if (!clientData || !clientData.name) {
    throw new Error('Invalid client data: The client data must contain a name.');
  }

  const response = await postQuery('clients', clientData);

  if (SHOW_LOG) { console.log('api.js - createClient - response: ', response); }

  return response.data;
}
