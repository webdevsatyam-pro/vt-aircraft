import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 max-w-7xl mx-auto w-full">
      <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors py-1"
          >
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
              {isLast ? (
                <span className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-gray-900 transition-colors py-1 truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
