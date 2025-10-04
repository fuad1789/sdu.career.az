"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo_b.png"
                  alt="SDU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Sumqayıt Dövlət Universiteti
                </h1>
                <p className="text-sm text-gray-600">Karyera Portalı</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-sdu-blue transition-colors"
            >
              Ana Səhifə
            </Link>
            <Link
              href="/tecrube"
              className="text-gray-700 hover:text-sdu-blue transition-colors"
            >
              Təcrübə İmkanları
            </Link>
            <Link
              href="/karyera"
              className="text-gray-700 hover:text-sdu-blue transition-colors"
            >
              Karyera İmkanları
            </Link>
            <Link
              href="/elanlar"
              className="text-gray-700 hover:text-sdu-blue transition-colors"
            >
              Elanlar
            </Link>
            <Link
              href="/elaqe"
              className="text-gray-700 hover:text-sdu-blue transition-colors"
            >
              Əlaqə
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sdu-blue focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
