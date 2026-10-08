import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();

  const pathParts = location.pathname
    .split('/')
    .filter(Boolean);

  const formatLabel = (text) => {
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium sm:text-sm">

        {/* Home */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-1.5 text-gray-500 transition hover:text-blue-600"
        >
          <Home size={15} className="sm:h-4 sm:w-4" />
          <span>Home</span>
        </Link>

        {/* Current Route */}
        {pathParts.map((part, index) => {
          const isLast = index === pathParts.length - 1;

          const path = `/${pathParts
            .slice(0, index + 1)
            .join('/')}`;

          return (
            <React.Fragment key={path}>
              <ChevronRight
                size={14}
                className="shrink-0 text-gray-400 sm:h-4 sm:w-4"
              />

              {isLast ? (
                <span className="max-w-[180px] truncate text-gray-900 sm:max-w-none">
                  {formatLabel(part)}
                </span>
              ) : (
                <Link
                  to={path}
                  className="shrink-0 text-gray-500 transition hover:text-blue-600"
                >
                  {formatLabel(part)}
                </Link>
              )}
            </React.Fragment>
          );
        })}

      </nav>
    </div>
  );
}