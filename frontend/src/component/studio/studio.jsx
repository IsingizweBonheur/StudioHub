import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../layout/navbar';
import Breadcrumb from '../layout/breadcrumb';
import Footer from '../layout/footer';

import StudioHeader from './StudioHeader';
import StudioInfo from './StudioInfo';
import StudioService from './StudioService';

import studios from '../../data/studio';

export default function Studio() {
  const { studioId } = useParams();

  const studio = studios.find(
    (item) => item.slug === studioId || item.id === studioId
  );

  if (!studio) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="fixed left-0 right-0 top-0 z-50">
          <Navbar />
        </div>

        <div className="fixed left-0 right-0 top-20 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
          <Breadcrumb />
        </div>

        <main className="px-4 pb-20 pt-[150px]">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

              <h1 className="text-2xl font-bold text-gray-900">
                Studio Not Found
              </h1>

              <p className="mt-3 text-sm text-gray-600">
                The studio you are looking for does not exist or may have
                been removed.
              </p>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      <div className="fixed left-0 right-0 top-20 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <Breadcrumb />
      </div>

      <main className="px-4 pb-16 pt-[150px] sm:px-6 sm:pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <StudioHeader studio={studio} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">

            <div>
              <StudioService studio={studio} />
            </div>

            <div>
              <StudioInfo studio={studio} />
            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}