"use client";

import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaHandshake } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Announcement {
  title: string;
  date: string;
  category: string;
  description: string;
  link_url?: string;
}

interface LatestAnnouncementsProps {
  announcements: Announcement[];
}

export default function LatestAnnouncements({
  announcements,
}: LatestAnnouncementsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sertifikat":
        return FaGraduationCap;
      case "Təcrübə":
        return FaBriefcase;
      case "Əməkdaşlıq":
        return FaHandshake;
      default:
        return FaGraduationCap;
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ən Son Xəbərlər
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Təcrübə imkanları, karyera tədbirləri və əməkdaşlıq xəbərləri
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={announcements.length >= 3}
          className="mySwiper"
        >
          {announcements.map((announcement, index) => {
            const IconComponent = getCategoryIcon(announcement.category);
            return (
              <SwiperSlide key={index} className="h-auto">
                <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 border border-gray-100 relative overflow-hidden flex flex-col h-full hover:border-sdu-blue">
                  {/* Gradient overlay */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sdu-blue to-blue-600"></div>

                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    {/* Icon and date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sdu-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(announcement.date).toLocaleDateString(
                            "az-AZ"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Title with line clamp - never changes */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-sdu-blue transition-colors duration-300 line-clamp-2">
                      {announcement.title}
                    </h3>

                    {/* Description with more lines - auto height */}
                    <p className="text-gray-600 text-base leading-relaxed line-clamp-6">
                      {announcement.description}
                    </p>
                  </div>
                  {announcement.link_url && (
                    <a
                      href={announcement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm sm:text-base leading-relaxed mt-2 block hover:underline hover:text-blue-700 text-right"
                    >
                      Ətraflı oxu →
                    </a>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <Link
            href="/elanlar"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sdu-blue to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sdu-blue shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Bütün Xəbərlərə Bax
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
