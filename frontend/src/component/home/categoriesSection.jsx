import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import categories from '../../data/categories';

export default function CategorySection() {
  const featuredCategories = categories
    .filter((category) => category.featured)
    .slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore Categories
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Find the right service
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore different categories and discover studios that can
              help bring your ideas and projects to life.
            </p>
          </div>

          <Link
            to="/categories"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all categories
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Category Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Category Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-5">

                <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                {/* Services */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-medium text-gray-500">
                    {category.studiosCount} studios
                  </span>

                  <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2">
                    Explore
                    <ArrowRight size={16} />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}