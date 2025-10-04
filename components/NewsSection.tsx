import Link from "next/link";
import Image from "next/image";
import { FaNewspaper, FaCalendarAlt, FaHandshake } from "react-icons/fa";

export default function NewsSection() {
  const news = [
    {
      title: "SDU Karyera Mərkəzi yeni təlim proqramları təklif edir",
      date: "2024-12-20",
      category: "Təlimlər",
      description:
        "Peşəkar inkişaf üçün yeni təlim proqramları və kurslar təklif edirik.",
      icon: FaNewspaper,
      image:
        "https://www.sdu.edu.az/career_center/assets/images/banner_k_m_s.jpg",
    },
    {
      title: "Beynəlxalq şirkətlərlə əməkdaşlıq genişlənir",
      date: "2024-12-18",
      category: "Əməkdaşlıq",
      description:
        "Yeni beynəlxalq şirkətlərlə əməkdaşlıq sazişləri imzalanıb.",
      icon: FaHandshake,
      image: "https://www.sdu.edu.az/userfiles/image/news/div_a_slide3.jpg",
    },
    {
      title: "Karyera günləri təşkil ediləcək",
      date: "2024-12-15",
      category: "Tədbirlər",
      description: "Yaxın günlərdə karyera günləri təşkil ediləcək.",
      icon: FaCalendarAlt,
      image: "https://www.sdu.edu.az/userfiles/image/news/news_2429.jpg",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {news.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
              >
                <div className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center rounded-t-lg">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-sdu-blue" />
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="bg-sdu-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString("az-AZ")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <Link
                    href="/elanlar"
                    className="text-sdu-blue hover:text-blue-700 font-medium text-xs sm:text-sm"
                  >
                    Ətraflı oxu →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/elanlar"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-sdu-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sdu-blue text-sm sm:text-base"
          >
            Bütün Xəbərlərə Bax
          </Link>
        </div>
      </div>
    </section>
  );
}
