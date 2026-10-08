import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Main Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-gray-900"
          >
            Studio<span className="text-blue-600">Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/studios"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Studios
            </Link>

            <Link
              to="/categories"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/studio/signin"
              className="text-sm font-semibold text-gray-700 transition hover:text-blue-600"
            >
              Sign In
            </Link>

            <Link
              to="/studio/register"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Register Studio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-gray-100 py-5 md:hidden">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/studios"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Studios
              </Link>

              <Link
                to="/categories"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Categories
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Contact
              </Link>

              {/* Mobile Actions */}
              <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">

                <Link
                  to="/studio/signin"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
                >
                  Sign In
                </Link>

                <Link
                  to="/studio/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Register Studio
                </Link>

              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}