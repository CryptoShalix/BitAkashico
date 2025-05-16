/**
 * Version: 1.0
 * Type: Page
 * Name: About
 * Description: About page with different sections for about me, about this project, and other projects
 */

// ON INIT

$(document).ready(async function () {
  await getData_About();
});

// ABOUT PAGE DATA

async function getData_About() {
  try {
    // Define the URL and properties
    const properties = [
      { id: 'TDI', type: Type.COMPONENT },
    ];

    // Get data from Strapi
    const _data = await generateUrl('about', properties);

    // Set data to the contact form
    setData_About(_data);
  } catch (error) {
    console.error(error);
  } finally {
    // Load languages
    onTranslate();
  }
}

function setData_About(data) {
  if (data && data.TDI.length > 0) {
    const $aboutMeData = $("#aboutMeData");
    if (!$aboutMeData.length) return; // Exit if the element doesn't exist
    $aboutMeData.empty(); // Safely clear the content if it exists

    // Set each 'Title', 'Description', 'Icon' item
    data.TDI.forEach((item) => {
      const aboutBox = `
      <section class="about-section">
        ${item.image && item.image.url ? `<img class="about-section-image" src="${STRAPI_HOST}${item.image.url}">` : ''}
        <div class="about-section-tdi">
          <h3 class="about-section-title">
            <i class="icon fas fa-${item.icon}"></i>
            ${item.title}
          </h3>
          <p class="description">${item.description}</p>
        </div>
      </section>`;
      $aboutMeData.append(aboutBox);
    });
  }
}