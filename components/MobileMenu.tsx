"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

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
      ],
    },
    {
      title: "Xəbərlər",
      href: "/xeberler",
      subItems: [],
    },
    {
      title: "Resurslar",
      href: "#",
      subItems: [
        {
          title: "Əsasnamə",
          href: "/Əsasnamə_k_m.pdf",
        },
        {
          title: "Tələbənin Karyera Yol Xəritəsi",
          href: "/SDU_KARYERA_XERITESI_CORRECT.pdf",
        },
      ],
    },
    {
      title: "Əməkdaşlar",
      href: "/emekdaslar",
      subItems: [],
    },
    {
      title: "Şəhid Məzunlar",
      href: "/sehid-mezunlar",
      subItems: [],
    },
    {
      title: "Bizimlə Əlaqə",
      href: "/elaqe",
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
            {/* Qeydiyat Button */}
            <div className="mb-6">
              <Link
                href="/mezun-qeydiyyati"
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-medium text-center transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                onClick={onClose}
              >
                Məzun Qeydiyatı
              </Link>
            </div>

            {/* Vakansiyalar və Təcrübə Proqramları Linkləri */}
            <div className="mb-4 space-y-1">
              <Link
                href="/karyera/vakansiyalar"
                className="block py-2 text-gray-700 hover:text-sdu-blue font-medium"
                onClick={onClose}
              >
                Vakansiyalar
              </Link>
              <Link
                href="/karyera/tecrube-proqramlari"
                className="block py-2 text-gray-700 hover:text-sdu-blue font-medium"
                onClick={onClose}
              >
                Təcrübə Proqramları
              </Link>
            </div>

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

            {/* Sosial Medya */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Sosial Medya
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/sdu-karyera-v%C9%99-m%C9%99zunlarla-i%CC%87%C5%9F-m%C9%99rk%C9%99zi/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61578289313321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/sdu.karyera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/+994705663888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-500 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
