'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎫</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              EventConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Events
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/my-bookings"
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  My Bookings
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 text-sm">
                    Hi, {user?.name?.split(' ')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all font-medium backdrop-blur-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-white/90 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-rose-600 hover:bg-rose-50 px-5 py-2 rounded-lg transition-all font-semibold shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white/90 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/my-bookings"
                    className="text-white/90 hover:text-white transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-white/90 hover:text-white transition-colors font-medium py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white/90 hover:text-white transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-white/90 hover:text-white transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
