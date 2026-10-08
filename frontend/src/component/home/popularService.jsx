import React from 'react';
import {
  Camera,
  Video,
  Palette,
  Music,
  Monitor,
  Megaphone,
  Image,
  Shirt,
} from 'lucide-react';

const services = [
  {
    id: 'photography',
    name: 'Photography',
    description:
      'Professional photography services for portraits, weddings, events, products, fashion, and commercial projects.',
    icon: Camera,
  },
  {
    id: 'videography',
    name: 'Video Production',
    description:
      'Professional video production for events, businesses, advertisements, social media, music videos, and creative projects.',
    icon: Video,
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    description:
      'Creative graphic design services including logos, posters, flyers, business cards, social media graphics, and marketing materials.',
    icon: Palette,
  },
  {
    id: 'music-production',
    name: 'Music & Audio',
    description:
      'Music recording, production, podcast recording, voice-over, audio mixing, and other professional audio services.',
    icon: Music,
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description:
      'Professional website and web application development for businesses, organizations, personal brands, and creative projects.',
    icon: Monitor,
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    description:
      'Digital marketing, social media management, advertising, content creation, and online brand promotion services.',
    icon: Megaphone,
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description:
      'Creative content production for social media, brands, businesses, campaigns, and digital platforms.',
    icon: Image,
  },
  {
    id: 'fashion',
    name: 'Fashion & Styling',
    description:
      'Fashion photography, styling, fashion design, modeling content, and creative fashion production services.',
    icon: Shirt,
  },
];

export default function PopularService() {
  const popularServices = services.slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Services
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Popular services
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Discover professional services from studios and creative
            professionals on StudioHub.
          </p>
        </div>

        {/* Services */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                    {service.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}