import React from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
} from 'lucide-react';

export default function StudioServices({ studio }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Offer
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Services
            </h2>
          </div>

          <div className="hidden rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 sm:block">
            {studio.services.length}{' '}
            {studio.services.length === 1 ? 'Service' : 'Services'}
          </div>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          Explore the professional services available from {studio.name}.
          Contact the studio directly for pricing, availability, and
          project requirements.
        </p>
      </div>

      {/* Services */}
      <div className="grid gap-4 sm:grid-cols-2">

        {studio.services.map((service, index) => (
          <div
            key={service}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >

            {/* Top */}
            <div className="flex items-start justify-between gap-4">

              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <BriefcaseBusiness
                  size={22}
                  strokeWidth={2}
                />
              </div>

              {/* Number */}
              <span className="text-xs font-semibold text-gray-300">
                {String(index + 1).padStart(2, '0')}
              </span>

            </div>

            {/* Content */}
            <div className="mt-5">

              <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                {service}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Professional {service.toLowerCase()} services tailored
                to your project and creative needs.
              </p>

            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <CheckCircle2
                  size={15}
                  className="text-green-500"
                />
                Available
              </div>


            </div>

          </div>
        ))}

      </div>

      {/* Contact CTA */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">

        <div>
          <h3 className="font-semibold text-gray-900">
            Interested in a service?
          </h3>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            Contact {studio.name} to discuss your project, pricing,
            and availability.
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <a
            href={`tel:${studio.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Studio
          </a>
        </div>

      </div>

    </section>
  );
}