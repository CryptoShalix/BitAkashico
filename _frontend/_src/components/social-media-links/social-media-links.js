/**
 * Version: 1.0
 * Type: Component
 * Name: Social media links
 * Description: Social media links component
 */

const MAX_SOCIAL_MEDIA = 5;

// Listen to the event 'listener_social-media-links'
document.addEventListener('listener_social-media-links', function (event) {
  const { componentId, data } = event.detail;
  setData_SocialMediaLinks(data);
});

async function setData_SocialMediaLinks(DATA_GLOBAL) {
  // Check if social media links exist
  if (!DATA_GLOBAL || !DATA_GLOBAL.socialMedia) {
    return;
  }

  // Update the social media links
  const $socialMedia = $('.social-media-links');
  $socialMedia.empty();

  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const socialMediaItems = DATA_GLOBAL.socialMedia
    .filter(socialMedia => socialMedia.isActive)
    .slice(0, isMobile ? MAX_SOCIAL_MEDIA : DATA_GLOBAL.socialMedia.length);

  socialMediaItems.forEach(socialMedia => {
    // Prepare data when icon is not found
    if (!socialMedia.icon) {
      socialMedia.icon = 'other';
    }

    let isDefaultIcon = false;
    let icon = `fab fa-${socialMedia.icon.toLowerCase().replace(' ', '-')}`;
    if (socialMedia.icon.toLowerCase().includes('other')) {
      icon = 'fa fa-link';
      isDefaultIcon = isMobile ? false : true;
    }

    const $socialMediaItem = $(`
      <a class="icon" href="${socialMedia.link}" target="_blank" title="${socialMedia.title}">
        ${isDefaultIcon ? `<span>${socialMedia.title}</span>` : ''}
        <i class="${icon}"></i>
      </a>
      `);
    $socialMedia.append($socialMediaItem);
  });
}