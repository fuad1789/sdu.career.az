import Link from "next/link";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaTrophy,
} from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      title: "Təcrübə İmkanları",
      description: "Müxtəlif sahələrdə praktiki təcrübə imkanları",
      href: "/tecrube",
      icon: FaGraduationCap,
    },
    {
      title: "Karyera Xidmətləri",
      description: "CV hazırlama, müsahibə hazırlığı və karyera məsləhəti",
      href: "/karyera",
      icon: FaBriefcase,
    },
    {
      title: "Karyera Günləri",
      description: "Müəssisələrlə görüş və şəbəkə qurma imkanları",
      href: "/karyera/gunler",
      icon: FaCalendarAlt,
    },
    {
      title: "Uğur Hekayələri",
      description: "Məzunlarımızın karyera uğurları və təcrübələri",
      href: "/karyera/mezunlar",
      icon: FaTrophy,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Xidmətlərimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tələbələrin karyera inkişafına dəstək göstərmək üçün geniş xidmət
            spektri
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 text-center"
              >
                <div className="w-12 h-12 bg-sdu-blue rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="inline-flex items-center text-sdu-blue hover:text-blue-700 font-medium text-sm"
                >
                  Ətraflı məlumat
                  <svg
                    className="w-4 h-4 ml-1"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
