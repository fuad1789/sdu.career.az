"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: string;
  applicationLink?: string;
}

interface TecrubeProgrami {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: string;
  applicationLink?: string;
}

export default function VakansiyalarPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Nümunə məlumatlar - API hazır olduqda silinəcək
  const [tecrubeProgramlari, setTecrubeProgramlari] = useState<
    TecrubeProgrami[]
  >([
    {
      id: "1",
      title: "Data analitik - təcrübəçi",
      company: "PASHA Life",
      location: "Bakı, Azərbaycan",
      duration: "3-6 ay",
      description:
        "PASA Life-da data analitik sahəsində təcrübə proqramı. Real layihələr üzərində işləmə imkanı, mentorluq dəstəyi və beynəlxalq təcrübə.",
      requirements: [
        "Bakalavr və ya Magistr tələbəsi",
        "Data analitik bacarıqları (Python, R, SQL)",
        "İngilis dili bilikləri (B2+ səviyyə)",
        "Komanda işi bacarıqları",
      ],
      benefits: [
        "Rəqəmsal mükafat",
        "Mentorluq dəstəyi",
        "Karyera inkişaf imkanları",
        "Şəbəkə qurma tədbirləri",
      ],
      postedDate: "4 noyabr 2025",
      deadline: "13 noyabr 2025",
      status: "Aktiv",
      applicationLink:
        "https://www.tecrube.az/vacancies/data-analitik-tecrubeci",
    },
    {
      id: "2",
      title: "Rəqəmsal Körpü Təcrübə və Təqaüd Proqramı - AZCON Holding",
      company: "AZCON Holding",
      location: "Bakı, Azərbaycan",
      duration: "3-6 ay",
      description:
        "AZCON Holding-da rəqəmsal körpü bacarıqlarının inkişafı üçün təcrübə proqramı. Real layihələr üzərində işləmə imkanı, mentorluq dəstəyi və beynəlxalq təcrübə.",
      requirements: [
        "Bakalavr və ya Magistr tələbəsi",
        "Rəqəmsal körpü bacarıqları (Python, JavaScript, SQL)",
        "İngilis dili bilikləri (B2+ səviyyə)",
        "Komanda işi bacarıqları",
      ],
      benefits: [
        "Akademik biliklərinizi real iş mühitində tətbiq etmək",
        "Təcrübəli mütəxəssislərlə birgə çalışma imkanı",
        "Peşəkar iş mühiti ilə tanışlıq",
        "Öyrənmə və inkişaf tədbirlərində iştirak",
      ],
      postedDate: "17 noyabr 2025",
      deadline: "30 noyabr 2025",
      status: "Aktiv",
      applicationLink: "https://azcon.gov.az/az/internship",
    },
    {
      id: "3",
      title: "Satış Layihəsi üzrə Təcrübəçi",
      company: "PashaPay - Pasha Life",
      location: "Bakı, Azərbaycan",
      duration: "6 ay",
      description:
        "PashaPay-da satış layihəsi sahəsində təcrübə proqramı. Real layihələr üzərində işləmə imkanı, mentorluq dəstəyi və beynəlxalq təcrübə.",
      requirements: [
        "Bakalavr tələbəsi (Business, Marketing, və ya əlaqəli sahə)",
        "Analitik düşüncə bacarıqları",
        "İngilis dili bilikləri (B2+ səviyyə)",
        "Kommunikasiya bacarıqları",
      ],
      benefits: [
        "Rəqəmsal mükafat",
        "Amazon sertifikatı",
        "Karyera məsləhəti",
        "Şəbəkə qurma imkanları",
      ],
      postedDate: "12 Noyabr 2025",
      deadline: "12 Dekabr 2025",
      status: "Aktiv",
      applicationLink:
        "https://www.tecrube.az/vacancies/satis-layihesi-uzre-tecrubeci",
    },
  ]);
  const [tecrubeLoading, setTecrubeLoading] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/vakansiyalar");

        if (!response.ok) {
          throw new Error("Failed to fetch vacancies");
        }

        const data = await response.json();
        setVacancies(data.vacancies || []);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
        setError("Vakansiyalar yüklənərkən xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();

    // TODO: Təcrübə proqramlarını API-dən gətir
    // const fetchTecrubeProgramlari = async () => {
    //   try {
    //     setTecrubeLoading(true);
    //     const response = await fetch("/api/tecrube-proqramlari");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch tecrube programlari");
    //     }
    //     const data = await response.json();
    //     setTecrubeProgramlari(data.programs || []);
    //   } catch (err) {
    //     console.error("Error fetching tecrube programlari:", err);
    //   } finally {
    //     setTecrubeLoading(false);
    //   }
    // };
    // fetchTecrubeProgramlari();
  }, []);

  const applicationProcess = [
    {
      step: "1",
      title: "Vakansiya Seçimi",
      description: "Maraqlı olduğunuz vakansiyaları seçin və tələbləri oxuyun",
    },
    {
      step: "2",
      title: "CV Hazırlama",
      description: "Peşəkar CV hazırlayın və təcrübənizi vurğulayın",
    },
    {
      step: "3",
      title: "Müraciət",
      description: "Onlayn müraciət formunu doldurun və sənədləri yükləyin",
    },
    {
      step: "4",
      title: "Müsahibə",
      description: "Seçilərsəniz, müsahibə mərhələsinə keçin",
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleApply = (vacancy: Vacancy) => {
    if (vacancy.applicationLink) {
      window.open(vacancy.applicationLink, "_blank");
    } else {
      // Fallback to contact page if no application link
      window.location.href = "/elaqe";
    }
  };

  const handleApplyTecrube = (program: TecrubeProgrami) => {
    if (program.applicationLink) {
      window.open(program.applicationLink, "_blank");
    } else {
      // Fallback to contact page if no application link
      window.location.href = "/elaqe";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Vakansiyalar</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Müxtəlif sahələrdə iş imkanları və vakansiyalar. Yerli və
              beynəlxalq şirkətlərdə karyera imkanlarını kəşf edin. Gələcək
              karyeranızı burada başlayın.
            </p>
          </div>
        </div>
      </section>

      {/* Xarici Müəssisələrdən Təcrübə Proqramları */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Xarici Müəssisələrdən Təcrübə Proqramları
            </h2>
            <p className="text-gray-600 text-sm">
              Beynəlxalq şirkətlərdə təcrübə qazanma imkanları
            </p>
          </div>

          {tecrubeLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-3 text-sm text-gray-600">
                Təcrübə proqramları yüklənir...
              </p>
            </div>
          ) : tecrubeProgramlari.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-sm">
                Hazırda aktiv təcrübə proqramı yoxdur.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tecrubeProgramlari.map((program, index) => (
                <div
                  key={program.id || index}
                  className="group bg-white rounded-xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 relative overflow-hidden flex flex-col h-full"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Company Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {program.company}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {program.status === "Aktiv" ? "Aktiv" : "Bağlı"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {program.title}
                    </h3>

                    {/* Location & Duration */}
                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-600">
                      <span className="flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {program.location.split(",")[0]}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {program.duration}
                      </span>
                    </div>

                    {/* Description - truncated */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    {/* Key Requirements - show only first 2 */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {program.requirements && program.requirements.length > 0
                          ? program.requirements
                              .slice(0, 2)
                              .map((req, reqIndex) => (
                                <span
                                  key={reqIndex}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                                >
                                  {req.length > 30
                                    ? req.substring(0, 30) + "..."
                                    : req}
                                </span>
                              ))
                          : null}
                        {program.requirements &&
                          program.requirements.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                              +{program.requirements.length - 2} daha
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Footer - always at bottom */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <span className="text-xs text-gray-500">
                        Son: {program.deadline}
                      </span>
                      <button
                        onClick={() => handleApplyTecrube(program)}
                        className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md"
                      >
                        Müraciət
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seçilmiş Vakansiyalar */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seçilmiş Vakansiyalar
            </h2>
            <p className="text-xl text-gray-600">
              Ən məşhur və tələb olunan iş imkanları
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">Vakansiyalar yüklənir...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Yenidən yoxla
              </button>
            </div>
          ) : vacancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Hazırda aktiv vakansiya yoxdur.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {vacancies.map((job, index) => (
                <div
                  key={job.id || index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-2">
                        <span>🏢 {job.company}</span>
                        <span>📍 {job.location}</span>
                        <span>⏰ {job.type}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                        <span>💰 {job.salary}</span>
                        <span>👨‍💼 {job.experience}</span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium self-start md:self-auto">
                      {job.status === "Aktiv" ? "Aktiv" : "Bağlı"}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Tələblər:
                      </h4>
                      <ul className="space-y-1">
                        {job.requirements && job.requirements.length > 0 ? (
                          job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
                              <span className="text-sm text-gray-700">
                                {req}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500">
                            Tələb yoxdur
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Üstünlüklər:
                      </h4>
                      <ul className="space-y-1">
                        {job.benefits && job.benefits.length > 0 ? (
                          job.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start">
                              <span className="text-teal-500 mr-2">✓</span>
                              <span className="text-sm text-gray-700">
                                {benefit}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-500">
                            Üstünlük göstərilməyib
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-600 space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                      <span>
                        📅 Yerləşdirilib: {formatDate(job.postedDate)}
                      </span>
                      <span>⏰ Son tarix: {formatDate(job.deadline)}</span>
                    </div>
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors w-full sm:w-auto"
                    >
                      Müraciət Et
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Müraciət Prosesi */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Müraciət Prosesi
            </h2>
            <p className="text-xl text-gray-600">
              İş müraciəti üçün addım-addım təlimat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Əlaqə */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Vakansiyalarımızdan İstifadə Edin
            </h2>
            <p className="text-xl mb-8">
              Karyera uğurunuz üçün ən yaxşı iş imkanlarını tapın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/elaqe"
                className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Dəstək Al
              </a>
              <a
                href="/karyera"
                className="bg-teal-700 text-white border border-white px-8 py-3 rounded-lg hover:bg-teal-800 transition-colors"
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
