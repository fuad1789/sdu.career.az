"use client";

import Link from "next/link";
import { FaCalendarAlt, FaArrowRight, FaNewspaper } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority?: string;
  link_url?: string;
}

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export default function AnnouncementsSection({
  announcements,
}: AnnouncementsSectionProps) {
  if (announcements.length === 0) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Təcrübə":
        return "from-purple-500 to-indigo-600";
      case "Sertifikat":
        return "from-green-500 to-emerald-600";
      case "Əməkdaşlıq":
        return "from-blue-500 to-cyan-600";
      default:
        return "from-sdu-blue to-blue-600";
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 relative overflow-hidden animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-slide-down">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ən Son Elanlar
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Təcrübə imkanları, karyera tədbirləri və digər vacib elanlar
          </p>
        </div>

        {/* Announcements Swiper Slider */}
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
          {announcements.map((announcement, index) => (
            <SwiperSlide key={announcement.id || index} className="h-auto">
              <div className="group relative h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300">
                {/* Gradient header */}
                <div
                  className={`h-2 bg-gradient-to-r ${getCategoryColor(
                    announcement.category
                  )}`}
                ></div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                        announcement.category
                      )} shadow-md`}
                    >
                      {announcement.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="w-3 h-3 mr-2" />
                      {new Date(announcement.date).toLocaleDateString("az-AZ")}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-sdu-blue transition-colors line-clamp-2">
                    {announcement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                    {announcement.description}
                  </p>

                  {/* Link */}
                  {announcement.link_url ? (
                    <a
                      href={announcement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-sdu-blue hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                    >
                      Ətraflı oxu
                      <FaArrowRight className="w-3 h-3 ml-2" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center text-sm font-semibold text-gray-400">
                      <FaNewspaper className="w-3 h-3 mr-2" />
                      Elan məlumatı
                    </div>
                  )}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div
          className="text-center mt-12 sm:mt-16 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/elanlar"
            className="inline-flex items-center px-8 py-4 bg-white text-sdu-blue rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
          >
            Bütün Elanlara Bax
            <FaArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
