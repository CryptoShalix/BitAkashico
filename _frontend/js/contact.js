/**
 * Version: 1.0
 * Type: API methods
 * Name: Contact
 * Description: Contact API methods to send a message to a Telegram channel.
 */

const sCharBR = '%0A';
const apiToken = '5807116207:AAHAUD7P10-InYaWn_X4O3-Pdo6MsY5crq4';
const chatId = '@BitAkashicoContact';

// TELEGRAM CALLS

function sendTelegram(nickname, email, phone, telegramId, message) {
  // Prepare params
  message = message.replace(/<[^>]*>/g, '').replace(/(\\r\\n)|([\r\n])/gmi, sCharBR);
  const text = `¡NUEVO MENSAJE desde BitAkashico! ${sCharBR}${sCharBR}
    - Nickname: ${nickname} ${sCharBR}
    - Email: ${email} ${sCharBR}
    - Phone: ${phone} ${sCharBR}
    - TelegramId: ${telegramId} ${sCharBR}
    - Message:${sCharBR} ${message} ${sCharBR}`;

  return doCall(text);
}

function sendTestimonial(_testimonial) {
  // Prepare params
  _testimonial.testimonial = _testimonial.testimonial.replace(/<[^>]*>/g, '').replace(/(\\r\\n)|([\r\n])/gmi, sCharBR);
  const text = `¡NUEVO TESTIMONIO desde BitAkashico! ${sCharBR}${sCharBR}
    - Category: ${_testimonial.category} ${sCharBR}
    - Anonymous: ${_testimonial.anon ? 'true' : 'false'} ${sCharBR}
    - Name: ${_testimonial.name} ${sCharBR}
    - Link: ${_testimonial.link} ${sCharBR}
    - Testimony:${sCharBR} ${_testimonial.testimonial} ${sCharBR}`;

  return doCall(text);
}

/**
 * ¡¡IMPORTANT!!
 * 
 * DO NOT USE 'ASYNC' ON THIS FUNCTION.
 * The API Telegram does not work well with async function for some reason.
 * 
 * @param {string} text The message to send. Format it with '%0A' characters an customize with your preference.
 * @returns The response data
 */
function doCall(text) {
  const path = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;

  return fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      showMessage(TYPE_MESSAGE.error, 'pages.contact.msgError');
      throw error;
    });
}

// CLEARING

function clearMessage(inputMessage) {
  setTimeout(() => {
    inputMessage.innerHTML = '';
  }, timer * 1000);
}

function clearForm(formFields) {
  formFields.map(field => $(field).val(''));
}