import React from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import Breadcrumb from '../layout/breadcrumb';
import Hero from './hero';
import CategoriesSection from "./categoriesSection";
import FeaturedStudios from "./FeaturedStudio";
import PopularService from "./popularService";
import WhyStudioHub from "./WhyStudioHub";
import Model from '../../model/model';
export default function Home() {
  return (
    <div>

      {/* Fixed Navbar */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Fixed Breadcrumb */}
      <div className="fixed left-0 right-0 top-20 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <Breadcrumb />
      </div>

      {/* Page Content */}
      <main className="pt-[132px]">
        <Hero />

        <CategoriesSection /> 
        <FeaturedStudios />
        <PopularService />
        <WhyStudioHub />
        <Footer />
      </main>
      {/* Floating WhatsApp Button */}
      <Model />
     
    </div>
  );
}