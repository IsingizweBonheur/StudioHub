import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Studio<span className="text-blue-500">Hub</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Discover professional studios, creative services, and talented
              professionals for your next project.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                className="flex h-10 items-center justify-center rounded-lg bg-white/5 px-4 text-sm font-medium text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#"
                className="flex h-10 items-center justify-center rounded-lg bg-white/5 px-4 text-sm font-medium text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                Instagram
              </a>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/studios"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Find Studios
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Categories
                </Link>
              </li>


              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  About StudioHub
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* For Studios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Studios
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/studio/register"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Register Your Studio
                </Link>
              </li>

              <li>
                <Link
                  to="/studio/signin"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Studio Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/studio/register"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  List Your Services
                </Link>
              </li>

              <li>
                <Link
                  to="/studio/register"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  Showcase Your Portfolio
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <ul className="mt-5 space-y-4">

              {/* Location */}
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span className="text-sm leading-6 text-gray-400">
                  Kigali, Rwanda
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="tel:0795926508"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  0795 926 508
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="mailto:studiohub@gmail.com"
                  className="text-sm text-gray-400 transition hover:text-white"
                >
                  studiohub@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">

          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} StudioHub. All rights reserved.
          </p>

        </div>
      </div>

    </footer>
  );
}