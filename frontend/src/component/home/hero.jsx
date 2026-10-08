import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    console.log({
      keyword,
      location,
      category,
    });
  };

  return (
    <section className="relative min-h-[650px] overflow-hidden">

      {/* Background Image */}
      <img
        src="https://www.spark.do/images/services/creative-studio/hero.webp"
        alt="Creative studio"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">

        <div className="w-full">

          {/* Small Label */}
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-blue-400 sm:text-base">
            Discover • Connect • Create
          </p>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find the right studio for your next project
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-gray-200 sm:text-lg">
            Discover creative studios, professional services, and talented
            teams near you.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white p-3 shadow-2xl sm:p-4"
          >

            <div className="grid gap-2 md:grid-cols-[1.3fr_1fr_1fr_auto]">

              {/* What are you looking for? */}
              <div className="flex min-h-[64px] items-center gap-3 rounded-xl px-4 transition focus-within:bg-gray-50">

                <Search
                  size={21}
                  className="shrink-0 text-gray-400"
                />

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="keyword"
                    className="block text-xs font-semibold text-gray-500"
                  >
                    What are you looking for?
                  </label>

                  <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Studio, service..."
                    className="mt-1 w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>

              </div>

              {/* Location */}
              <div className="flex min-h-[64px] items-center gap-3 border-t border-gray-700 px-4 md:border-l md:border-t-0">

                <MapPin
                  size={21}
                  className="shrink-0 text-gray-400"
                />

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="location"
                    className="block text-xs font-semibold text-gray-500"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kigali"
                    className="mt-1 w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>

              </div>

              {/* Category */}
              <div className="flex min-h-[64px] items-center gap-3 border-t border-gray-700 px-4 md:border-l md:border-t-0">

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="category"
                    className="block text-xs font-semibold text-gray-500"
                  >
                    Category
                  </label>

                  <div className="relative mt-1">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none bg-transparent pr-6 text-sm font-medium text-gray-900 outline-none"
                    >
                      <option value="">All Categories</option>
                      <option value="photography">
                        Photography
                      </option>
                      <option value="videography">
                        Videography
                      </option>
                      <option value="graphic-design">
                        Graphic Design
                      </option>
                      <option value="web-development">
                        Web Development
                      </option>
                      <option value="music">
                        Music & Audio
                      </option>
                      <option value="fashion">
                        Fashion
                      </option>
                      <option value="marketing">
                        Marketing
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="min-h-[64px] rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <span className="flex items-center justify-center gap-2">
                  <Search size={19} />
                  Search
                </span>
              </button>

            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-white">

            <span className="mr-1 font-medium text-gray-300">
              Popular:
            </span>

            <button
              type="button"
              onClick={() => setCategory('photography')}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm transition hover:bg-white/20"
            >
              Photography
            </button>

            <button
              type="button"
              onClick={() => setCategory('videography')}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm transition hover:bg-white/20"
            >
              Videography
            </button>

            <button
              type="button"
              onClick={() => setCategory('web-development')}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm transition hover:bg-white/20"
            >
              Web Development
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}