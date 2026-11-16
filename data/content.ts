import { ProductItem, ServiceItem, TestimonialItem,FaqItem,GiftCardAmount,CollectionItem } from '@/app/types';

export const HERO_DATA = {
  brandName: 'BACKUM HILLS',

  // Badge under the headline (replace with "SINCE 20XX" once you confirm the founding year)
  badge: 'HANDCRAFTED GENUINE LEATHER',

  headline: {
    line1: 'Timeless leather.',
    line2: 'Crafted for everyday life.',
  },

  subTagline: {
    line1: 'Belts, bags and travel essentials',
    line2: 'made in premium full-grain leather.',
  },

  cta: 'Shop the Collection',

  imageAlt: 'Handcrafted genuine leather belts and bags by Backum Hills',

  stats: [
    {
      value: '100%',
      label: 'Genuine premium leather',
    },
    {
      value: '4',
      label: 'Collections: Belts, Bags, Travel & Western',
    },
    {
      value: 'Pan-India',
      label: 'Free shipping on orders above ₹550',
    },
  ],
};
// Paste this into your ../data/content.ts file (next to HERO_DATA)

export const ABOUT_DATA = {
  kicker: 'ABOUT BACKUM HILLS',

  title: {
    line1: 'Real leather.',
    line2: 'Made to last for years.',
  },

  description:
    'Backum Hills makes belts, bags and travel essentials from genuine leather, including veg-tanned buffalo leather. Every piece is chosen for its hide, cut with care and finished by hand, so it looks good on day one and even better after years of use. Our leather will develop its own marks and character over time. That is how you know it is the real thing.',

  pillars: [
    {
      id: 'genuine-leather',
      title: 'Genuine Leather',
      description: 'Real hides, no shortcuts. Strong, comfortable and built to last.',
    },
    {
      id: 'handcrafted',
      title: 'Handcrafted Detail',
      description: 'Careful stitching and finishing on every belt, bag and buckle.',
    },
    {
      id: 'delivered',
      title: 'Delivered Across India',
      description: 'Free shipping on orders above ₹550, with support when you need it.',
    },
  ],

  badge: {
    label: '100%',
    title: 'Genuine Leather',
    subtitle: 'Built to last.\nMade to be carried.',
  },

  cta: 'More About Us',
  imageAlt: 'Handcrafted genuine leather belts and bags by Backum Hills',
};

// Paste into ../data/content.ts (replace the old SERVICES_DATA)
// Also add `href?: string;` to ServiceItem in ../types

export const SERVICES_SECTION = {
  kicker: 'OUR COLLECTIONS',
  title: {
    line1: 'Leather essentials',
    line2: 'for every day and every journey.',
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'leather-belts',
    title: 'Leather Belts',
    description:
      'Casual and formal belts in genuine leather, available in six classic colours.',
    iconName: 'Belt',
    href: '/collections/leather-belts',
  },
  {
    id: 'leather-bags',
    title: 'Leather Bags',
    description:
      'Handcrafted bags with solid stitching and room for everything you carry.',
    iconName: 'ShoppingBag',
    href: '/collections/leather-bags',
  },
  {
    id: 'travel-utility',
    title: 'Travel & Utility',
    description:
      'Durable leather pieces for trips, work and daily use.',
    iconName: 'Briefcase',
    href: '/collections/travel-utility',
  },
  {
    id: 'western-collection',
    title: 'Western Collection',
    description:
      'Tooled and engraved belts in veg-tanned buffalo leather with statement buckles.',
    iconName: 'Star',
    href: '/collections/western-collection',
  },
  {
    id: 'gift-cards',
    title: 'Gift Cards',
    description:
      'Not sure what to pick? Let them choose their own leather piece.',
    iconName: 'Gift',
    href: '/pages/gift-cards',
  },
  {
    id: 'size-and-care',
    title: 'Size Guide & Care',
    description:
      'Measure your belt size and learn how to keep your leather looking good.',
    iconName: 'Ruler',
    href: '/pages/size-guide',
  },
];



export const FEATURED_SECTION = {
  kicker: 'BEST SELLERS',
  title: {
    line1: 'Pieces our customers',
    line2: 'wear every single day.',
  },
  cta: 'Shop All Belts',
};

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'casual-plain-belt-rich-brown',
    title: 'Casual Plain Leather Belt',
    category: 'Casual Belts',
    price: 1999,
    originalPrice: 3599,
    reviews: 0,
    colors: ['Rich Brown', 'Black', 'Coffee Brown', 'Elegant Tan', 'Royal Blue', 'Royal Green'],
    description:
      'A clean, everyday genuine leather belt that goes with jeans, chinos and formals.',
    imageUrl: '/3.jpg',
    href: '/products/backum-hills-casual-leather-belt-rich-brown',
  },
  {
    id: 'western-tooled-black',
    title: 'Western Tooled Belt, Black',
    category: 'Western Collection',
    price: 2499,
    reviews: 11,
    description:
      'Veg-tanned buffalo leather with tooled detailing and an engraved silver buckle.',
    imageUrl: '/3.jpg',
    href: '/products/products-western-tooled-black-leather-belt-men',
  },
  {
    id: 'vintage-western-brown',
    title: 'Vintage Western Belt, Brown',
    category: 'Western Collection',
    price: 2499,
    reviews: 12,
    description:
      'Veg-tanned buffalo leather in rich brown with an antique engraved buckle.',
    imageUrl: '/4.jpg',
    href: '/products/vintage-western-leather-belt-for-men-in-veg-tanned-buffalo-leather-brown-antique-engraved-buckle',
  },
  {
    id: 'western-engraved-black',
    title: 'Western Engraved Belt, Black',
    category: 'Western Collection',
    price: 2499,
    reviews: 14,
    description:
      'Premium veg-tanned buffalo leather with an antique silver engraved buckle.',
    imageUrl: '/4.jpg',
    href: '/products/western-engraved-leather-belt-for-men-in-premium-veg-tanned-buffalo-leather-black-antique-silver-buckle',
  },
];




// Paste into ../data/content.ts (replace the old CONTACT_INFO)
//
// TODO: replace every placeholder below with the real details of the firm.

export const CONTACT_INFO = {
  phone: '+91 00000 00000', // shown on the page
  whatsapp: '910000000000', // country code + number, digits only, no + or spaces
  email: 'hello@backumhills.com', // TODO: real email
  address: 'TODO: full business address, city, state, PIN', // optional, leave '' to hide
  instagram: 'https://instagram.com/backumhills',
  whatsappMessage: 'Hi Backum Hills, I would like help with an order.',
};

export const CONTACT_SECTION = {
  title: {
    line1: 'Questions about an order?',
    line2: "We're here to help.",
  },
  text: "Message us on WhatsApp or give us a call, and we'll help you pick the right belt or bag.",
  cta: 'Chat on WhatsApp',
  ctaNote: 'Opens WhatsApp with a ready message',
  imageAlt: 'Handcrafted genuine leather belt by Backum Hills',
};
// Paste into ../data/content.ts (replace the old PROCESS data)
// Edit the descriptions so they match how your workshop really works.

export const PROCESS_SECTION = {
  kicker: 'OUR PROCESS',
  title: {
    line1: 'From hide to heirloom.',
    line2: 'Every piece, made with care.',
  },
  intro:
    'Good leather is not rushed. Each belt and bag goes through four careful stages before it reaches you.',
  cta: 'Shop the Collection',
};

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  iconName: 'Search' | 'Scissors' | 'Sparkles' | 'PackageCheck';
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'hide-selection',
    title: 'Hide Selection',
    description:
      'We choose genuine hides by hand, checking grain, thickness and feel, so only the best leather moves forward.',
    iconName: 'Search',
  },
  {
    id: 'cutting-shaping',
    title: 'Cutting & Shaping',
    description:
      'Each strap and panel is cut to size and shaped with precision, so every piece sits right and lasts long.',
    iconName: 'Scissors',
  },
  {
    id: 'stitching-finishing',
    title: 'Stitching & Finishing',
    description:
      'Strong stitching, smooth edges and a careful finish bring out the natural colour and character of the leather.',
    iconName: 'Sparkles',
  },
  {
    id: 'quality-delivery',
    title: 'Quality Check & Delivery',
    description:
      'Every piece is inspected before packing, then sent to your door anywhere in India.',
    iconName: 'PackageCheck',
  },
];
// Paste into ../data/content.ts (replace the old TESTIMONIALS_DATA)
//
// IMPORTANT: replace every entry below with REAL reviews from your customers
// (Google reviews, product page reviews, WhatsApp messages with permission).
// Do not publish made-up reviews.

export const TESTIMONIALS_SECTION = {
  kicker: 'CUSTOMER REVIEWS',
  title: {
    line1: 'Loved by people who',
    line2: 'wear it every day.',
  },
};



export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'review-1',
    quote: 'TODO: paste a real customer review here.',
    rating: 5,
    clientName: 'Customer Name',
    location: 'City',
    product: 'Western Tooled Belt, Black',
    source: 'Verified Buyer',
  },
  {
    id: 'review-2',
    quote: 'TODO: paste a real customer review here.',
    rating: 5,
    clientName: 'Customer Name',
    location: 'City',
    product: 'Vintage Western Belt, Brown',
    source: 'Google Review',
  },
  {
    id: 'review-3',
    quote: 'TODO: paste a real customer review here.',
    rating: 5,
    clientName: 'Customer Name',
    location: 'City',
    product: 'Casual Plain Leather Belt',
    source: 'Verified Buyer',
  },
];



export const FOOTER_DATA = {
  brandName: 'Backum Hills',
  about:
    'Genuine leather belts, bags and travel essentials, made to last for years.',

  newsletter: {
    title: {
      line1: 'Get 10% off',
      line2: 'your first order.',
    },
    text: 'Join our list for new arrivals, care tips and private offers. No spam, unsubscribe any time.',
    placeholder: 'Enter your email',
    button: 'Subscribe',
    success: 'Thank you for subscribing! Check your inbox for your welcome offer.',
    error: 'Something went wrong. Please try again.',
    invalid: 'Please enter a valid email address.',
  },

  // Matches the links on the main Backum Hills website.
  // TODO: right-click each link on backumhills.com, copy the address, and paste it here.
  shopLinks: [
    { label: 'Catalogue', href: '/collections' },
    { label: 'Store', href: '/store' },
   
    { label: 'Gift Cards', href: '/gift-cards' },
  ],

  helpLinks: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Size Guide', href: 'size-guide' },
    { label: 'Track Order', href: '/pages/track-order' },
    { label: 'Leather Care', href: '/pages/product-care' },
    { label: 'Contact Us', href: '/contact-us' },
  ],

  socials: [
    { name: 'Instagram', href: 'https://instagram.com/backumhills' },
    { name: 'Facebook', href: '' }, // TODO: real page
    { name: 'YouTube', href: '' }, // TODO: real channel
  ],

  legal: [
    { label: 'Privacy Policy', href: 'privacy-policy' },
    { label: 'Terms & Conditions', href: '/term-and-conditions' },
  
  ],
};

export const FAQ_SECTION = {
  kicker: 'FAQ',
  title: {
    line1: 'Questions?',
    line2: 'We have answers.',
  },
  text: 'Everything you need to know about our leather, sizing, shipping and care.',
  helpTitle: 'Still have a question?',
  helpText: 'Message us on WhatsApp or send an email and we will help you out.',
  helpCta: 'Contact Us',
  helpHref: '#contact',
};





export const FAQ_DATA: FaqItem[] = [
  {
    id: 'genuine-leather',
    question: 'Is your leather genuine?',
    answer:
      'Yes. Our belts and bags are made from genuine leather, including veg-tanned buffalo leather in our Western collection. We do not use synthetic or PU material.',
  },
  {
    id: 'looks-different',
    question: 'Will my product look exactly like the photos?',
    answer:
      'Very close, but not identical. Real leather is a natural material, so grain, small marks and shade can vary slightly from piece to piece. This is a sign of genuine leather, and it also means your piece is a little bit unique. Colours can also look slightly different on different screens.',
  },
  {
    id: 'belt-size',
    question: 'How do I choose the right belt size?',
    answer:
      'Take a belt that already fits you well and measure it from the end where the buckle fold begins to the hole you use most. Then pick the size that matches. Our Size Guide has a full chart and clear steps. If you are between sizes, choose the larger one.',
  },
  {
    id: 'shipping',
    question: 'What are the shipping charges and delivery time?',
    answer:
      'Shipping is free on orders above ₹550 anywhere in India. TODO: add delivery time (for example, "Orders are delivered in 4 to 7 working days") and the charge for orders below ₹550.',
  },
  {
    id: 'track-order',
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will get tracking details. You can also use the Track Order page on our website to check the status at any time.',
  },
  {
    id: 'returns',
    question: 'What is your return and refund policy?',
    answer:
      'Please read our Return & Refund Policy for the exact conditions and timelines. TODO: add a short summary here (for example, number of days, condition of the product, and how refunds are paid).',
  },
  {
    id: 'leather-care',
    question: 'How do I take care of my leather?',
    answer:
      'Keep it dry and away from direct heat and strong sunlight. Wipe it gently with a soft dry cloth, and use a good leather conditioner now and then. If it gets wet, let it dry naturally and never use a hair dryer. Store belts hanging or flat, and bags with some soft paper inside to keep their shape.',
  },
  {
    id: 'gift-cards',
    question: 'Do you offer gift cards?',
    answer:
      'Yes. If you are not sure which belt or bag to pick, a gift card lets them choose their own piece. You can find it on our Gift Cards page.',
  },
];

// Paste into app/data/content.ts


export const COLLECTIONS_PAGE = {
  kicker: 'THE CATALOGUE',
  title: 'All Collections',
  text: 'Genuine leather belts, bags and travel essentials, handcrafted to last for years. Pick a collection to start.',
};

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'leather-belts',
    slug: 'leather-belts',
    title: 'Leather Belts',
    description: 'Genuine leather belts by Backum Hills',
    imageUrl: '/3.jpg',
    productCount: 10,
  },
  {
    id: 'leather-bags',
    slug: 'leather-bags',
    title: 'Leather Bags',
    description: 'Handcrafted genuine leather bags by Backum Hills',
    imageUrl: '/4.jpg',
    productCount: 0,
  },
  {
    id: 'travel-utility',
    slug: 'travel-utility',
    title: 'Travel & Utility',
    description: 'Durable leather travel and utility pieces by Backum Hills',
    imageUrl: '/2.jpg',
    productCount: 0,
  },
  {
    id: 'western-collection',
    slug: 'western-collection',
    title: 'Western Collection',
    description: 'Tooled and engraved western leather belts by Backum Hills',
    imageUrl: '/5.jpg',
    productCount: 0,
  },
];

// Paste into src/data/content.ts
//
// TODO: change the amounts and links so they match the gift cards on the real store.
// Each amount can have its own `href` (the store link for that value).
// If an amount has no `href`, `storePath` is used.

export const GIFT_CARD_PAGE = {
  kicker: 'GIFT CARDS',
  title: {
    line1: 'The gift of',
    line2: 'real leather.',
  },
  text: 'Not sure which belt or bag to pick? Let them choose their own piece from the Backum Hills collection.',
  amountLabel: 'Choose an amount',
  cta: 'Buy Gift Card',
  ctaNote: 'You will complete the purchase securely on our store.',
  storePath: '/pages/gift-cards', // path on the main store

  steps: [
    {
      id: 'choose',
      title: 'Choose an amount',
      description: 'Pick the value that suits the occasion.',
    },
    {
      id: 'checkout',
      title: 'Check out securely',
      description: 'Complete your purchase on our store.',
    },
    {
      id: 'gift',
      title: 'Share the gift',
      description: 'They pick their own belt or bag and use the card at checkout.',
    },
  ],

  goodToKnow: [
    {
      id: 'where',
      question: 'Where can the gift card be used?',
      answer: 'On any product in the Backum Hills store.',
    },
    {
      id: 'validity',
      question: 'How long is it valid?',
      answer: 'TODO: add the validity period of your gift cards.',
    },
    {
      id: 'delivery',
      question: 'How is the gift card delivered?',
      answer: 'TODO: explain how it is delivered (for example, by email) and how long it takes.',
    },
  ],
};


// TODO: use the real amounts sold on the store
export const GIFT_CARD_AMOUNTS: GiftCardAmount[] = [
  { id: 'a500', value: 500 },
  { id: 'a1000', value: 1000 },
  { id: 'a2000', value: 2000 },
  { id: 'a5000', value: 5000 },
];