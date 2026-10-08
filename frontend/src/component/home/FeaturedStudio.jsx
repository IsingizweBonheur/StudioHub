import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

import studios from '../../data/studio';

export default function FeaturedStudios() {
  const featuredStudios = studios
    .filter((studio) => studio.featured)
    .slice(0, 3);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Featured Studios
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Discover featured studios
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Discover trusted studios and creative professionals for your
              next project.
            </p>
          </div>

          <Link
            to="/studios"
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
          >
            View all studios
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Studio Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudios.map((studio) => (
            <Link
              key={studio.id}
              to={`/studios/${studio.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">

                {/* Abbreviation */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                  {studio.abbreviation}
                </div>

                {/* Studio Name */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                      {studio.name}
                    </h3>

                    {studio.verified && (
                      <CheckCircle
                        size={17}
                        className="shrink-0 fill-blue-600 text-white"
                      />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Professional Studio
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600">
                {studio.description}
              </p>

              {/* Click Indicator */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-gray-500">
                  View studio
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 sm:hidden">
          <Link
            to="/studios"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            View all studios
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
}