import React from 'react';
import {
  Search,
  UserCheck,
  BriefcaseBusiness,
  TrendingUp,
  ShieldCheck,
  Globe,
} from 'lucide-react';

const benefits = [
  {
    icon: Search,
    title: 'Be Discovered',
    description:
      'Help customers find your studio when they are searching for professional services on StudioHub.',
  },
  {
    icon: UserCheck,
    title: 'Professional Profile',
    description:
      'Create a professional studio profile that presents your business, services, portfolio, and contact information.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Showcase Your Work',
    description:
      'Present your services and projects in an organized way so potential customers can understand what you offer.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description:
      'Increase your online visibility and create more opportunities to connect with potential customers.',
  },
  {
    icon: ShieldCheck,
    title: 'Build Trust',
    description:
      'Give customers a clear and professional way to learn about your studio before choosing your services.',
  },
  {
    icon: Globe,
    title: 'Grow Your Digital Presence',
    description:
      'Give your studio a dedicated presence on a platform built to connect businesses with customers online.',
  },
];

export default function WhyStudioHub() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Why StudioHub
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to grow your studio
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            StudioHub helps studios build their online presence, showcase
            their work, and connect with customers looking for professional
            services.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {benefit.description}
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