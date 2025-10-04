"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    {
      title: "Təcrübə İmkanları",
      href: "/tecrube",
      subItems: [
        { title: "Bakalavr", href: "/tecrube/bakalavr" },
        { title: "Magistr", href: "/tecrube/magistr" },
        { title: "Müəssisə", href: "/tecrube/muessise" },
      ],
    },
    {
      title: "Karyera İmkanları",
      href: "/karyera",
      subItems: [
        { title: "Karyera Xidmətləri", href: "/karyera/xidmetler" },
        { title: "Karyera Məsləhəti", href: "/karyera/meslehet" },
        { title: "Karyera Günləri", href: "/karyera/gunler" },
        { title: "Məzunlarımız və Uğur Hekayələri", href: "/karyera/mezunlar" },
        {
          title: "Karyeraya Dair Onlayn Resurslar",
          href: "/karyera/resurslar",
        },
        { title: "Vakansiyalar", href: "/karyera/vakansiyalar" },
      ],
    },
    {
      title: "Elanlar",
      href: "/elanlar",
      subItems: [],
    },
    {
      title: "Əsasnamə",
      href: "/esasname",
      subItems: [],
    },
    {
      title: "Əməkdaşlar",
      href: "/emekdaslar",
      subItems: [],
    },
    {
      title: "Bizimlə Əlaqə",
      href: "/elaqe",
      subItems: [],
    },
    {
      title: "Müraciət Et",
      href: "/muraciet",
      subItems: [],
    },
  ];

  return (
    <nav className="bg-white shadow-md hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-6 xl:space-x-8">
          {navigationItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                href={item.href}
                className="flex items-center px-2 xl:px-3 py-4 text-sm font-medium text-gray-700 hover:text-sdu-blue hover:bg-gray-50 transition-colors whitespace-nowrap"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.title}
                {item.subItems.length > 0 && (
                  <svg
                    className="ml-1 h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {item.subItems.length > 0 && activeDropdown === item.title && (
                <div
                  className="absolute left-0 mt-0 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-50"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sdu-blue transition-colors"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
