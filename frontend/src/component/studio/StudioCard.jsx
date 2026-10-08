import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export default function StudioCard({ studio }) {
  return (
    <Link
      to={`/studios/${studio.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={studio.coverImage}
          alt={studio.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Verified */}
        {studio.verified && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-md">
            <CheckCircle
              size={14}
              className="fill-blue-600 text-white"
            />
            Verified
          </div>
        )}

        {/* Abbreviation */}
        <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-blue-600 text-sm font-bold text-white shadow-lg">
          {studio.abbreviation}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
              {studio.name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin size={15} />
              <span>
                {studio.location.city}, {studio.location.district}
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowRight size={17} />
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {studio.description}
        </p>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap gap-2">
          {studio.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
            View studio
            <ArrowRight size={16} />
          </span>
        </div>

      </div>
    </Link>
  );
}