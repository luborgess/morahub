import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function Navbar() {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="h-14 flex items-center gap-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>DDD 31 - Belo Horizonte e região</span>
          </div>

          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
