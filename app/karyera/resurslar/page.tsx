"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: string;
  topics: string[];
  level: string;
  duration: string;
  registrationLink: string;
}

export default function OnlaynResurslarPage() {
  const [onlineCourses, setOnlineCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/kurslar");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setOnlineCourses(data.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Kurslar yüklənərkən xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Helper function to get icon based on course title
  const getCourseIcon = (title: string): string => {
    if (
      title.toLowerCase().includes("karyera") ||
      title.toLowerCase().includes("planlaş")
    ) {
      return "🎯";
    } else if (
      title.toLowerCase().includes("cv") ||
      title.toLowerCase().includes("müsahibə")
    ) {
      return "📝";
    } else if (
      title.toLowerCase().includes("şəbəkə") ||
      title.toLowerCase().includes("linkedin")
    ) {
      return "🌐";
    } else if (
      title.toLowerCase().includes("soft") ||
      title.toLowerCase().includes("kommunikasiya")
    ) {
      return "🤝";
    }
    return "📚";
  };

  const resources = [
    {
      title: "Karyera Məqalələri",
      description: "Karyera inkişafı haqqında müxtəlif məqalələr",
      count: "50+",
      icon: "📚",
      categories: [
        "Karyera planlaşdırması",
        "İş axtarışı",
        "Müsahibə texnikaları",
        "Peşəkar inkişaf",
      ],
    },
    {
      title: "Video Təlimlər",
      description: "Karyera inkişafı üzrə video təlimlər",
      count: "30+",
      icon: "🎥",
      categories: [
        "CV hazırlama",
        "Müsahibə hazırlığı",
        "Şəbəkə qurma",
        "Soft skills",
      ],
    },
    {
      title: "Şablonlar və Nümunələr",
      description: "CV, məktub və digər sənədlər üçün şablonlar",
      count: "25+",
      icon: "📄",
      categories: [
        "CV şablonları",
        "İş məktubu nümunələri",
        "Portfolio şablonları",
        "Email şablonları",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Karyeraya Dair Onlayn Resurslar
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Karyera inkişafınız üçün lazım olan bütün resursları bir yerdə
              tapın. Onlayn kurslar, vebinarlar, məqalələr və interaktiv
              alətlərlə karyera uğurunuzu təmin edin.
            </p>
          </div>
        </div>
      </section>

      {/* Onlayn Kurslar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Onlayn Kurslar
            </h2>
            <p className="text-xl text-gray-600">
              Karyera inkişafı üzrə pulsuz onlayn kurslar
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Yenidən Yoxla
              </button>
            </div>
          ) : onlineCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Hal-hazırda mövcud kurs yoxdur
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {onlineCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">
                      {getCourseIcon(course.title)}
                    </div>
                    <div className="text-right">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{course.description}</p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Müəllim:</strong> {course.instructor}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Qiymət:</strong>{" "}
                      <span className="text-green-600 font-medium">
                        {course.price}
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {course.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-sm text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={course.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors inline-block text-center"
                  >
                    Kursa Qoşul
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resurslar */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resurslar və Materiallar
            </h2>
            <p className="text-xl text-gray-600">
              Karyera inkişafı üçün zəngin resurs bazası
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  {resource.count}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {resource.categories.map((category, categoryIndex) => (
                    <li key={categoryIndex}>• {category}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlaqə */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Resurslardan İstifadə Edin
            </h2>
            <p className="text-xl mb-8">
              Karyera inkişafınız üçün bütün resurslarımızdan pulsuz istifadə
              edin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Dəstək Al
              </a>
              <a
                href="/karyera"
                className="bg-indigo-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                Digər Xidmətlər
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
