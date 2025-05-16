import type { Struct, Schema } from '@strapi/strapi';

export interface SharedSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_medias';
  info: {
    displayName: 'Social Media';
    description: '';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    icon: Schema.Attribute.Enumeration<
      [
        'Discord',
        'Facebook',
        'Github',
        'Instagram',
        'Other',
        'Stack Overflow',
        'Telegram',
        'TikTok',
        'Twitter',
        'WhatsApp',
        'YouTube',
      ]
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'TDI';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedPrices extends Struct.ComponentSchema {
  collectionName: 'components_shared_prices';
  info: {
    displayName: 'Prices';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    priceOriginal: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'100'>;
    applyDiscount: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    discountPercentage: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
          max: 90;
        },
        number
      > &
      Schema.Attribute.DefaultTo<75>;
    discountOldStudent: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
          max: 75;
        },
        number
      > &
      Schema.Attribute.DefaultTo<25>;
    applyDiscountOldStudent: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    currency: Schema.Attribute.Enumeration<['EUR', 'USD', 'BTC']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'EUR'>;
    costPeriodicity: Schema.Attribute.Enumeration<
      [
        'hourly',
        'daily',
        'weekly',
        'biweekly',
        'monthly',
        'bimonthly',
        'quarterly',
        'semiannually',
        'yearly',
        'oneTime',
        'session',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'monthly'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
    description: '';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    description: Schema.Attribute.String;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 200;
      }>;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface SharedBtcAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_btc_addresses';
  info: {
    displayName: 'Wallet';
    icon: 'bold';
    description: '';
  };
  attributes: {
    TAG: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'cryptoshalix@zbd.gg'>;
    TAGURL: Schema.Attribute.String & Schema.Attribute.Required;
    QR: Schema.Attribute.Media<'images'>;
    QRURL: Schema.Attribute.String;
    currency: Schema.Attribute.Enumeration<['btc', 'fiat']> &
      Schema.Attribute.Required;
    walletId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.social-media': SharedSocialMedia;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.prices': SharedPrices;
      'shared.media': SharedMedia;
      'shared.card': SharedCard;
      'shared.btc-address': SharedBtcAddress;
    }
  }
}
