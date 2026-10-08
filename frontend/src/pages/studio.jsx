import React from 'react';

import Navbar from '../component/layout/navbar';
import Breadcrumb from '../component/layout/breadcrumb';
import Footer from '../component/layout/footer';

import StudioCard from '../component/studio/StudioCard';

import studios from '../data/studio';

export default function Studios() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="fixed left-0 right-0 top-20 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <Breadcrumb />
      </div>

      {/* Main */}
      <main className="px-4 pb-16 pt-[150px] sm:px-6 sm:pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Page Header */}
          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Studio Directory
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Discover Studios
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore professional studios and creative businesses on
              StudioHub. Find the right studio for your next project.
            </p>

          </div>

          {/* Studios */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {studios.map((studio) => (
              <StudioCard
                key={studio.id}
                studio={studio}
              />
            ))}

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}