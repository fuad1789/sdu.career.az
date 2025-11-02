"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  priority?: string;
  link_url?: string;
  photo_uri?: string;
}

interface NewsResponse {
  news: NewsItem[];
  total: number;
  lastUpdated: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000");

        const response = await fetch(`${baseUrl}/api/xeberler?status=Aktiv`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data: NewsResponse = await response.json();
        setNews(data.news || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Xəbərlər yüklənir...</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Karyera Xəbərləri
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Universitet və karyera sahəsindəki ən son inkişaflar
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
          loop={news.length >= 3}
          className="mySwiper"
        >
          {news.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 h-full flex flex-col">
                <div className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                  {item.photo_uri ? (
                    <Image
                      src={item.photo_uri}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <FaCalendarAlt className="w-12 h-12 sm:w-16 sm:h-16 text-sdu-blue" />
                  )}
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="bg-sdu-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {item.category}
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <FaCalendarAlt className="w-3 h-3 mr-1" />
                      {new Date(item.date).toLocaleDateString("az-AZ")}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-4 flex-grow">
                    {item.description}
                  </p>

                  {item.link_url ? (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sdu-blue hover:text-blue-700 font-medium text-xs sm:text-sm"
                    >
                      Ətraflı oxu →
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Ətraflı oxu →
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/xeberler"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-sdu-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sdu-blue text-sm sm:text-base"
          >
            Bütün Xəbərlərə Bax
          </Link>
        </div>
      </div>
    </section>
  );
}
