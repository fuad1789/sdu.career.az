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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Son Xəbərlər
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Karyera Mərkəzimizin ən son fəaliyyətləri və xəbərləri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <IconComponent className="w-16 h-16 text-sdu-blue" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-sdu-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString("az-AZ")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    {item.description}
                  </p>

                  <Link
                    href="/elanlar"
                    className="text-sdu-blue hover:text-blue-700 font-medium text-sm"
                  >
                    Ətraflı oxu →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/elanlar"
            className="inline-flex items-center px-6 py-3 bg-sdu-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sdu-blue"
          >
            Bütün Xəbərlərə Bax
          </Link>
        </div>
      </div>
    </section>
  );
}
