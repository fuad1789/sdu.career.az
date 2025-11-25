"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export default function TecrubeProqramlariPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Nümunə məlumatlar - API hazır olduqda silinəcək
  const [tecrubeProgramlari, setTecrubeProgramlari] = useState<
    TecrubeProgrami[]
  >([
    {
      id: "1",
      title: "(Education Technology and Consulting) təşkilatçılığı",
      company: "EduHek",
      location: "Bakı, Azərbaycan",
      duration: "3-6 ay",
      description:
        "EduHek-in (Education Technology and Consulting) təşkilatçılığı, Hədəf Kursları və Sumqayıt Dövlət Universitetinin birgə əməkdaşlığı çərçivəsində xüsusi təcrübə proqramı başlanır!   Təcrübə proqramı iyun ayına qədər davam edəcək.  Proqramı uğurla tamamlayan hər bir tələbə sertifikatla təltif olunacaq.",
      requirements: ["III və IV kurs tələbələri"],
      benefits: [
        "Təcrübə proqramı iyun ayına qədər davam edəcək.",
        "Proqramı uğurla tamamlayan hər bir tələbə sertifikatla təltif olunacaq.",
      ],
      postedDate: "20 noyabr 2025",
      deadline: "30 noyabr 2025",
      status: "Aktiv",
      applicationLink: "https://wa.me/+994775550121",
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
      title: "Proqram Seçimi",
      description:
        "Maraqlı olduğunuz təcrübə proqramlarını seçin və tələbləri diqqətlə oxuyun",
    },
    {
      step: "2",
      title: "CV Hazırlama",
      description:
        "Peşəkar CV hazırlayın və təhsilinizlə yanaşı bacarıq və maraqlarınızı vurğulayın",
    },
    {
      step: "3",
      title: "Müraciət",
      description:
        "Onlayn müraciət formunu doldurun və tələb olunan sənədləri yükləyin",
    },
    {
      step: "4",
      title: "Müsahibə",
      description:
        "Seçildiyiniz halda, təcrübə proqramına qəbul üçün müsahibə mərhələsinə qatılın",
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
            <h1 className="text-4xl font-bold mb-4">Təcrübə Proqramları</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Müxtəlif sahələrdə yerli və beynəlxalq şirkətlərdə təcrübə
              proqramları. Real iş mühitində bacarıqlarınızı inkişaf etdirin və
              gələcək karyeranıza güclü start verin.
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

      {/* Müraciət Prosesi */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Müraciət Prosesi
            </h2>
            <p className="text-xl text-gray-600">
              Təcrübə proqramına müraciət üçün addım-addım təlimat
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
              Təcrübə Proqramlarımızdan İstifadə Edin
            </h2>
            <p className="text-xl mb-8">
              Karyera uğurunuz üçün ən yaxşı təcrübə və inkişaf imkanlarını
              tapın
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
