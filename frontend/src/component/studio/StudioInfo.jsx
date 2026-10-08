import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from 'lucide-react';

export default function StudioInfo({ studio }) {
  return (
    <div className="space-y-6">

      {/* About */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            About Studio
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            About {studio.name}
          </h2>
        </div>

        <p className="text-sm leading-7 text-gray-600 sm:text-base">
          {studio.description}
        </p>
      </section>

      {/* Studio Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold text-gray-900">
          Studio Information
        </h2>

        <div className="mt-6 space-y-5">

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Location
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                {studio.location.district}, {studio.location.city},{' '}
                {studio.location.country}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Phone
              </p>

              <a
                href={`tel:${studio.phone.replace(/\s/g, '')}`}
                className="mt-1 block text-sm text-gray-600 transition hover:text-blue-600"
              >
                {studio.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                Email
              </p>

              <a
                href={`mailto:${studio.email}`}
                className="mt-1 block break-all text-sm text-gray-600 transition hover:text-blue-600"
              >
                {studio.email}
              </a>
            </div>
          </div>

          {/* Verification */}
          {studio.verified && (
            <div className="flex items-start gap-4 border-t border-gray-100 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Verified Studio
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This studio has been verified on StudioHub.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Categories */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold text-gray-900">
          Categories
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          {studio.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}