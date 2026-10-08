const studios = [
  {
    id: 'bonheur-studio',
    name: 'Bonheur Studio',
    slug: 'bonheur-studio',

    abbreviation: 'BS',

    coverImage:
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=800&fit=crop',

    description:
      'A creative studio offering professional photography, videography, graphic design, and digital creative services.',

    location: {
      city: 'Kigali',
      district: 'Gasabo',
      country: 'Rwanda',
    },

    categories: [
      'Photography',
      'Videography',
      'Graphic Design',
    ],

    services: [
      'Wedding Photography',
      'Event Photography',
      'Video Production',
      'Graphic Design',
      'Brand Design',
    ],

    rating: 4.9,
    reviews: 32,

    phone: '+250 783185142',
    email: 'hello@bonheurstudio.rw',

    verified: true,
    featured: true,

    createdAt: '2026-01-15',
  },

  {
    id: 'dev-studio',
    name: 'Dev Studio',
    slug: 'dev-studio',

    abbreviation: 'DS',

    coverImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',

    description:
      'A technology-focused studio specializing in web development, mobile applications, UI/UX design, and digital solutions.',

    location: {
      city: 'Kigali',
      district: 'Kicukiro',
      country: 'Rwanda',
    },

    categories: [
      'Web Development',
      'Mobile Development',
      'UI/UX Design',
    ],

    services: [
      'Website Development',
      'Web Applications',
      'Mobile Applications',
      'UI/UX Design',
      'Software Development',
    ],

    rating: 4.8,
    reviews: 27,

    phone: '+250 799308939',
    email: 'hello@devstudio.rw',

    verified: true,
    featured: true,

    createdAt: '2026-02-10',
  },

  {
    id: 'i-studio',
    name: 'I Studio',
    slug: 'i-studio',

    abbreviation: 'IS',

    coverImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=800&fit=crop',

    description:
      'A modern creative studio providing photography, fashion, branding, and content creation services.',

    location: {
      city: 'Kigali',
      district: 'Nyarugenge',
      country: 'Rwanda',
    },

    categories: [
      'Photography',
      'Fashion',
      'Branding',
    ],

    services: [
      'Portrait Photography',
      'Fashion Photography',
      'Product Photography',
      'Branding',
      'Content Creation',
    ],

    rating: 4.7,
    reviews: 19,

    phone: '+250 794739944',
    email: 'hello@istudio.rw',

    verified: true,
    featured: true,

    createdAt: '2026-03-05',
  },

  {
    id: 'abc-studio',
    name: 'ABC Studio',
    slug: 'abc-studio',

    abbreviation: 'AS',

    coverImage:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop',

    description:
      'A professional multimedia studio offering photography, video production, audio recording, and creative services.',

    location: {
      city: 'Kigali',
      district: 'Gasabo',
      country: 'Rwanda',
    },

    categories: [
      'Photography',
      'Videography',
      'Music & Audio',
    ],

    services: [
      'Photography',
      'Video Production',
      'Music Recording',
      'Podcast Production',
      'Event Coverage',
    ],

    rating: 4.6,
    reviews: 15,

    phone: '+250 795926508',
    email: 'hello@abcstudio.rw',

    verified: false,
    featured: false,

    createdAt: '2026-04-12',
  },
];

export default studios;