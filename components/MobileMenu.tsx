"use client";

import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        { title: "Peşəkar İnkişaf", href: "/karyera/pesekar-inkisaf" },
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Menyu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <nav className="p-4">
            {navigationItems.map((item) => (
              <div key={item.title} className="mb-4">
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-sdu-blue font-medium"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
                {item.subItems.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block py-1 text-sm text-gray-600 hover:text-sdu-blue"
                        onClick={onClose}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
