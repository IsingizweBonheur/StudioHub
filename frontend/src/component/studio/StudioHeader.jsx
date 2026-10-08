import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
} from 'lucide-react';

export default function StudioHeader({ studio }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden sm:h-72 lg:h-80">
        <img
          src={studio.coverImage}
          alt={studio.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <Link
          to="/studios"
          className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60"
        >
          <ArrowLeft size={17} />
          <span>All Studios</span>
        </Link>

        {/* Verified */}
        {studio.verified && (
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-md">
            <CheckCircle size={15} className="fill-blue-600 text-white" />
            Verified Studio
          </div>
        )}

        {/* Studio Identity */}
        <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-7 sm:right-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

            {/* Logo / Abbreviation */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-2xl font-bold text-white shadow-lg">
              {studio.abbreviation}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {studio.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-200">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {studio.location.city}, {studio.location.district}
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                <span>
                  {studio.location.country}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-100 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-5">

            <a
              href={`tel:${studio.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition hover:text-blue-600"
            >
              <Phone size={17} className="text-blue-600" />
              {studio.phone}
            </a>

            <a
              href={`mailto:${studio.email}`}
              className="flex items-center gap-2 break-all transition hover:text-blue-600"
            >
              <Mail size={17} className="shrink-0 text-blue-600" />
              {studio.email}
            </a>

          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${studio.phone.replace(/\s/g, '')}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
            >
              <Phone size={17} />
              Call
            </a>

            <a
              href={`mailto:${studio.email}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 sm:flex-none"
            >
              <Mail size={17} />
              Email
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}