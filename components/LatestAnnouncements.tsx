import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaHandshake } from "react-icons/fa";

interface Announcement {
  title: string;
  date: string;
  category: string;
  description: string;
  href?: string;
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Son Elanlar və Xəbərlər
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Karyera Mərkəzimizin ən son fəaliyyətləri və imkanları
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {announcements.map((announcement, index) => {
            const IconComponent = getCategoryIcon(announcement.category);
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 relative overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sdu-blue to-blue-600"></div>

                {/* Icon and date */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-sdu-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 font-medium">
                      {new Date(announcement.date).toLocaleDateString("az-AZ")}
                    </span>
                  </div>
                </div>

                {/* Title with better typography */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-sdu-blue transition-colors duration-300">
                  {announcement.title}
                </h3>

                {/* Description with improved spacing */}
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {announcement.description}
                </p>

                {/* Enhanced CTA button */}
                {announcement.href && (
                  <Link
                    href={announcement.href}
                    className="inline-flex items-center text-sdu-blue hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300"
                  >
                    Ətraflı oxu
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/elanlar"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sdu-blue to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sdu-blue shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Bütün Elanlara Bax
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
